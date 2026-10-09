import pytest
import hmac
import hashlib
from backend.app import create_app
from backend.config import TestConfig
from backend.database import get_session, Base, get_engine
from backend.models import AdminUser, Product, ProductVariant, Order, OrderItem, WholesaleInquiry
from backend.seed import seed_database

@pytest.fixture(scope="module")
def app():
    app = create_app(TestConfig)
    seed_database(app)
    yield app

@pytest.fixture(scope="module")
def client(app):
    return app.test_client()

@pytest.fixture(scope="module")
def admin_token(client):
    res = client.post("/api/admin/login", json={
        "username": "admin@jenus.com",
        "password": "Kashmir2026!"
    })
    assert res.status_code == 200
    data = res.get_json()
    assert "token" in data
    return data["token"]

# --- 1. HEALTH & CONFIG TESTS ---
def test_health_check(client):
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.get_json()
    assert data["status"] == "healthy"
    assert data["database"] == "ok"

def test_public_config(client):
    res = client.get("/api/config")
    assert res.status_code == 200
    data = res.get_json()
    assert "keyId" in data
    assert data["merchantName"] == "JENU'S Kashmir Gourmet"

# --- 2. PRODUCT TESTS ---
def test_get_all_products(client):
    res = client.get("/api/products")
    assert res.status_code == 200
    data = res.get_json()
    assert data["total"] == 84
    assert len(data["products"]) == 84

def test_get_product_detail(client):
    res = client.get("/api/products/jnu-mamra-01")
    assert res.status_code == 200
    prod = res.get_json()
    assert prod["id"] == "jnu-mamra-01"
    assert prod["name"] == "JENU'S Royal Kashmiri Mamra Almonds"
    assert len(prod["weights"]) >= 1

def test_product_search(client):
    res = client.get("/api/products?search=saffron")
    assert res.status_code == 200
    data = res.get_json()
    assert data["total"] >= 1
    names = [p["name"].lower() for p in data["products"]]
    assert any("saffron" in n for n in names)

def test_product_filter_category(client):
    res = client.get("/api/products?category=spices")
    assert res.status_code == 200
    data = res.get_json()
    assert data["total"] >= 1
    assert all(p["category"] == "spices" for p in data["products"])

# --- 3. CART VALIDATION & ANTI-TAMPERING ---
def test_cart_validation_and_anti_tampering(client):
    # Attempt client spoofing: client claims price is 10 rupees instead of 890
    spoofed_items = [
        {"id": "jnu-mamra-01", "weight": "250g", "price": 10, "quantity": 2}
    ]
    res = client.post("/api/cart/validate", json={"items": spoofed_items})
    assert res.status_code == 200
    data = res.get_json()
    # Server must reject 10 and compute 890 * 2 = 1780
    assert data["items"][0]["price"] == 890
    assert data["subtotal"] == 1780
    assert data["shippingFee"] == 0 # >= 999 is free shipping
    assert data["total"] == 1780

def test_cart_promo_code(client):
    items = [{"id": "jnu-mamra-01", "weight": "250g", "quantity": 1}] # 890
    res = client.post("/api/cart/validate", json={"items": items, "promoCode": "KASHMIR10"})
    assert res.status_code == 200
    data = res.get_json()
    assert data["promoApplied"] is True
    assert data["discountAmount"] == 89 # 10% of 890
    assert data["shippingFee"] == 99 # subtotal < 999

# --- 4. ORDER CREATION ---
def test_create_order(client):
    order_payload = {
        "customer": {
            "name": "Tariq Ahmad",
            "phone": "9876543210",
            "email": "tariq@kashmir.in",
            "address": "Dal Lake Boulevard, Houseboat New Shalimar",
            "city": "Srinagar",
            "pincode": "190001",
            "state": "Jammu & Kashmir"
        },
        "items": [
            {"id": "jnu-mamra-01", "weight": "250g", "quantity": 1}
        ]
    }
    res = client.post("/api/orders/create", json=order_payload)
    assert res.status_code == 201
    data = res.get_json()
    assert data["success"] is True
    assert data["orderNumber"].startswith("JNU-KSH-")
    assert "razorpayOrderId" in data
    assert data["amount"] > 0

# --- 5. PAYMENT VERIFICATION & IDEMPOTENCY ---
def test_payment_verification_and_inventory(client, app):
    # 1. Create order
    create_res = client.post("/api/orders/create", json={
        "customer": {
            "name": "Zubair Mir",
            "phone": "9906554433",
            "address": "Residency Road, Lal Chowk",
            "city": "Srinagar",
            "pincode": "190001"
        },
        "items": [
            {"id": "jnu-amchur-01", "weight": "250g", "quantity": 2}
        ]
    })
    assert create_res.status_code == 201
    order_info = create_res.get_json()
    order_num = order_info["orderNumber"]
    rzp_order_id = order_info["razorpayOrderId"]

    # Check initial stock
    with app.app_context():
        session = get_session()
        prod = session.query(Product).filter(Product.id == "jnu-amchur-01").first()
        initial_stock = prod.stock_count

    # Generate test signature
    secret = app.config["RAZORPAY_KEY_SECRET"]
    payment_id = "pay_test_amchur_12345"
    msg = f"{rzp_order_id}|{payment_id}".encode("utf-8")
    valid_signature = hmac.new(secret.encode("utf-8"), msg, hashlib.sha256).hexdigest()

    # Verify payment
    verify_res = client.post("/api/payments/verify", json={
        "orderNumber": order_num,
        "razorpay_order_id": rzp_order_id,
        "razorpay_payment_id": payment_id,
        "razorpay_signature": valid_signature,
        "method": "upi"
    })
    assert verify_res.status_code == 200
    v_data = verify_res.get_json()
    assert v_data["success"] is True
    assert v_data["order"]["paymentStatus"] == "paid"

    # Verify inventory was decremented by 2
    with app.app_context():
        session = get_session()
        prod = session.query(Product).filter(Product.id == "jnu-amchur-01").first()
        assert prod.stock_count == initial_stock - 2

    # Test idempotency: Calling again must return success without deducting inventory again
    repeat_res = client.post("/api/payments/verify", json={
        "orderNumber": order_num,
        "razorpay_order_id": rzp_order_id,
        "razorpay_payment_id": payment_id,
        "razorpay_signature": valid_signature
    })
    assert repeat_res.status_code == 200

    # Stock must remain unchanged
    with app.app_context():
        session = get_session()
        prod = session.query(Product).filter(Product.id == "jnu-amchur-01").first()
        assert prod.stock_count == initial_stock - 2

def test_invalid_signature_rejected(client):
    create_res = client.post("/api/orders/create", json={
        "customer": {
            "name": "Tamper Test",
            "phone": "9123456789",
            "address": "Test Street",
            "city": "Jammu",
            "pincode": "180001"
        },
        "items": [{"id": "jnu-hing-01", "weight": "50g", "quantity": 1}]
    })
    order_info = create_res.get_json()
    
    # Tampered signature
    tamper_res = client.post("/api/payments/verify", json={
        "orderNumber": order_info["orderNumber"],
        "razorpay_order_id": order_info["razorpayOrderId"],
        "razorpay_payment_id": "pay_fake_tampered_123",
        "razorpay_signature": "invalid_forged_hex_signature"
    })
    assert tamper_res.status_code == 400
    assert "signature verification failed" in tamper_res.get_json()["error"].lower()

# --- 6. ORDER TRACKING ---
def test_order_tracking_by_phone(client):
    res = client.post("/api/orders/track", json={"phone": "9906554433"})
    assert res.status_code == 200
    data = res.get_json()
    assert data["total"] >= 1
    assert any(o["customer"]["phone"] == "9906554433" for o in data["orders"])

# --- 7. WHOLESALE INQUIRY ---
def test_wholesale_submission(client):
    payload = {
        "name": "Gulzar Wani",
        "phone": "9419012345",
        "business": "Wani Heritage Spices",
        "city": "Srinagar",
        "product": "Pure Mongra Saffron",
        "quantity": "500 grams",
        "targetPrice": "₹210/g"
    }
    res = client.post("/api/wholesale", json=payload)
    assert res.status_code == 201
    data = res.get_json()
    assert data["success"] is True
    assert data["refId"].startswith("JNU-BLK-")

# --- 8. ADMIN PROTECTED ROUTES ---
def test_admin_routes_reject_unauthenticated(client):
    res = client.get("/api/admin/dashboard")
    assert res.status_code == 401

def test_admin_dashboard_with_token(client, admin_token):
    res = client.get("/api/admin/dashboard", headers={"Authorization": f"Bearer {admin_token}"})
    assert res.status_code == 200
    data = res.get_json()
    assert "totalRevenue" in data
    assert "totalOrders" in data

def test_admin_update_product_stock(client, admin_token):
    res = client.put(
        "/api/admin/products/jnu-mamra-01/stock",
        json={"stockCount": 85},
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    assert res.status_code == 200
    data = res.get_json()
    assert data["product"]["stockCount"] == 85
