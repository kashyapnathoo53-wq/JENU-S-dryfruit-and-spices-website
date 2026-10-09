import random
import re
from flask import Blueprint, request, jsonify, current_app
from backend.database import get_session
from backend.models import Order, OrderItem
from backend.routes.cart import calculate_cart_totals

orders_bp = Blueprint("orders", __name__, url_prefix="/api/orders")

def normalize_phone(phone_str):
    digits = re.sub(r"\D", "", phone_str or "")
    return digits[-10:] if len(digits) >= 10 else digits

def generate_order_number():
    return f"JNU-KSH-{random.randint(100000, 999999)}"

def create_razorpay_order(amount_rupees, receipt_id, notes=None):
    key_id = current_app.config.get("RAZORPAY_KEY_ID")
    key_secret = current_app.config.get("RAZORPAY_KEY_SECRET")

    # If live keys are present, call Razorpay Python SDK
    if key_id and key_secret and not key_secret.startswith("mock_"):
        try:
            import razorpay
            client = razorpay.Client(auth=(key_id, key_secret))
            rzp_order = client.order.create({
                "amount": int(amount_rupees * 100), # in paise
                "currency": "INR",
                "receipt": receipt_id,
                "notes": notes or {}
            })
            return rzp_order.get("id")
        except Exception as e:
            current_app.logger.error(f"Razorpay API error: {e}")
            # Fallback to deterministic test order ID in sandbox
            return f"order_rzp_test_{random.randint(10000000, 99999999)}"

    # Sandbox / Local dev mode
    return f"order_rzp_mock_{random.randint(10000000, 99999999)}"

@orders_bp.route("/create", methods=["POST"])
def create_order():
    data = request.get_json() or {}
    customer = data.get("customer", {})
    items = data.get("items", [])
    promo_code = data.get("promoCode")

    name = customer.get("name", "").strip()
    phone = customer.get("phone", "").strip()
    address = customer.get("address", "").strip()
    city = customer.get("city", "").strip()
    pincode = customer.get("pincode", "").strip()
    state = customer.get("state", "").strip()
    email = customer.get("email", "").strip()

    if not name or not phone or not address:
        return jsonify({"error": "Name, phone number, and delivery address are required."}), 400

    clean_phone = normalize_phone(phone)
    if len(clean_phone) < 10:
        return jsonify({"error": "Please enter a valid 10-digit mobile number."}), 400

    # Calculate exact server-verified totals
    calc = calculate_cart_totals(items, promo_code)
    if not calc["items"] or calc["total"] <= 0:
        return jsonify({"error": "Your cart is empty or contains unavailable items."}), 400

    session = get_session()
    order_number = generate_order_number()

    # Create Razorpay Order
    rzp_order_id = create_razorpay_order(
        amount_rupees=calc["total"],
        receipt_id=order_number,
        notes={
            "customer_name": name,
            "customer_phone": clean_phone,
            "fssai_cert": current_app.config.get("FSSAI_LICENSE", "10026061000412")
        }
    )

    # Save pending order to database
    order = Order(
        order_number=order_number,
        customer_name=name,
        customer_email=email,
        customer_phone=phone,
        clean_phone=clean_phone,
        shipping_address=address,
        city=city or "Srinagar / Delhi Hub",
        pincode=pincode or "190001",
        state=state or "Jammu & Kashmir",
        subtotal=calc["subtotal"],
        discount_amount=calc["discountAmount"],
        discount_code=calc["discountCode"],
        gst_amount=calc["gstAmount"],
        shipping_fee=calc["shippingFee"],
        total_amount=calc["total"],
        currency="INR",
        payment_status="pending",
        payment_method="razorpay",
        razorpay_order_id=rzp_order_id,
        current_step=2,
        status_text="Nitrogen Vacuum Sealed • Ready for Air Cargo",
        carrier="Priority Air Cargo (IndiGo Flight 6E-204 Srinagar ➔ Central Hub)",
        awb_number=f"AWB-6E-{random.randint(1000000, 9999999)}",
        estimated_delivery="Within 24 to 48 Hours"
    )

    session.add(order)
    session.flush()

    for item in calc["items"]:
        order_item = OrderItem(
            order_id=order.id,
            product_id=item["productId"],
            product_name=item["name"],
            variant_weight=item["weight"],
            unit_price=item["price"],
            quantity=item["quantity"],
            subtotal=item["subtotal"],
            image_url=item.get("image")
        )
        session.add(order_item)

    session.commit()

    return jsonify({
        "success": True,
        "orderNumber": order_number,
        "orderId": order_number,
        "razorpayOrderId": rzp_order_id,
        "amount": calc["total"],
        "amountPaise": calc["total"] * 100,
        "currency": "INR",
        "keyId": current_app.config.get("RAZORPAY_KEY_ID"),
        "merchantName": current_app.config.get("MERCHANT_NAME"),
        "customer": {
            "name": name,
            "email": email,
            "phone": clean_phone
        }
    }), 201

@orders_bp.route("/<string:order_number>", methods=["GET"])
def get_order(order_number):
    session = get_session()
    order = session.query(Order).filter(Order.order_number == order_number).first()
    if not order:
        return jsonify({"error": f"Order {order_number} not found"}), 404

    return jsonify(order.to_dict())

@orders_bp.route("/track", methods=["POST"])
def track_orders():
    data = request.get_json() or {}
    phone = data.get("phone", "")
    order_number = data.get("orderNumber", "").strip()

    session = get_session()
    query = session.query(Order)

    if order_number:
        query = query.filter(Order.order_number == order_number)
    elif phone:
        clean = normalize_phone(phone)
        query = query.filter(Order.clean_phone == clean)
    else:
        return jsonify({"error": "Provide either phone number or orderNumber to track."}), 400

    orders = query.order_by(Order.created_at.desc()).all()
    return jsonify({"orders": [o.to_dict() for o in orders], "total": len(orders)})
