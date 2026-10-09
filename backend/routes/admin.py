from datetime import datetime, timezone
from flask import Blueprint, request, jsonify, current_app
from sqlalchemy import func
from backend.database import get_session, transaction
from backend.models import AdminUser, Product, ProductVariant, Order, WholesaleInquiry, Payment
from backend.auth import generate_admin_token, admin_required

admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")

@admin_bp.route("/login", methods=["POST"])
def admin_login():
    data = request.get_json() or {}
    ident = (data.get("username") or data.get("id") or "").strip().lower()
    password = (data.get("password") or "").strip()

    if not ident or not password:
        return jsonify({"error": "Admin identifier and password are required."}), 400

    session = get_session()
    user = session.query(AdminUser).filter(
        (func.lower(AdminUser.username) == ident) | 
        (func.lower(AdminUser.alt_id) == ident)
    ).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid administrative credentials."}), 401

    if not user.is_active:
        return jsonify({"error": "This administrative account has been deactivated."}), 403

    user.last_login_at = datetime.now(timezone.utc)
    session.commit()

    token = generate_admin_token(user)
    return jsonify({
        "success": True,
        "token": token,
        "user": user.to_dict()
    })

@admin_bp.route("/me", methods=["GET"])
@admin_required
def get_me():
    return jsonify({"admin": request.current_admin.to_dict()})

@admin_bp.route("/dashboard", methods=["GET"])
@admin_required
def get_dashboard_metrics():
    session = get_session()

    # Revenue & orders metrics
    paid_orders = session.query(Order).filter(Order.payment_status == "paid").all()
    total_revenue = sum(o.total_amount for o in paid_orders)
    total_orders = session.query(Order).count()
    pending_orders = session.query(Order).filter(Order.payment_status == "pending").count()

    # Low stock alerts (< 25 units)
    low_stock_products = session.query(Product).filter(Product.stock_count < 25).all()

    # Wholesale stats
    total_inquiries = session.query(WholesaleInquiry).count()
    unread_inquiries = session.query(WholesaleInquiry).filter(WholesaleInquiry.is_read == False).count()

    # Recent 6 orders
    recent_orders = session.query(Order).order_by(Order.created_at.desc()).limit(6).all()

    return jsonify({
        "totalRevenue": total_revenue,
        "totalOrders": total_orders,
        "paidOrders": len(paid_orders),
        "pendingOrders": pending_orders,
        "lowStockCount": len(low_stock_products),
        "lowStockProducts": [p.to_dict() for p in low_stock_products],
        "totalInquiries": total_inquiries,
        "unreadInquiries": unread_inquiries,
        "recentOrders": [o.to_dict() for o in recent_orders]
    })

# --- Product Management ---
@admin_bp.route("/products", methods=["GET"])
@admin_required
def get_admin_products():
    session = get_session()
    products = session.query(Product).order_by(Product.name).all()
    return jsonify({"products": [p.to_dict() for p in products]})

@admin_bp.route("/products/<string:product_id>/stock", methods=["PUT"])
@admin_required
def update_product_stock(product_id):
    data = request.get_json() or {}
    session = get_session()
    product = session.query(Product).filter(Product.id == product_id).first()
    if not product:
        return jsonify({"error": f"Product '{product_id}' not found"}), 404

    with transaction():
        if "inStock" in data:
            product.in_stock = bool(data["inStock"])
        elif "toggle" in data and data["toggle"]:
            product.in_stock = not product.in_stock

        if "stockCount" in data:
            product.stock_count = max(0, int(data["stockCount"]))
            product.in_stock = product.stock_count > 0

    return jsonify({"success": True, "product": product.to_dict()})

@admin_bp.route("/products/<string:product_id>/price", methods=["PUT"])
@admin_required
def update_product_price(product_id):
    data = request.get_json() or {}
    new_price = int(data.get("price", 0))
    if new_price <= 0:
        return jsonify({"error": "Price must be a positive integer."}), 400

    session = get_session()
    product = session.query(Product).filter(Product.id == product_id).first()
    if not product:
        return jsonify({"error": f"Product '{product_id}' not found"}), 404

    with transaction():
        if product.variants:
            default_v = next((v for v in product.variants if v.is_default), product.variants[0])
            old_base = default_v.price
            ratio = new_price / old_base if old_base > 0 else 1.0

            for v in product.variants:
                if v == default_v:
                    v.price = new_price
                    v.original_price = round(new_price * 1.25)
                else:
                    v.price = round(v.price * ratio)
                    v.original_price = round(v.price * 1.25)

    return jsonify({"success": True, "product": product.to_dict()})

@admin_bp.route("/products/<string:product_id>/bestseller", methods=["PUT"])
@admin_required
def toggle_product_bestseller(product_id):
    session = get_session()
    product = session.query(Product).filter(Product.id == product_id).first()
    if not product:
        return jsonify({"error": f"Product '{product_id}' not found"}), 404

    with transaction():
        product.is_bestseller = not product.is_bestseller
        if product.is_bestseller:
            product.badge = "Bestseller"
            product.badge_type = "bestseller"
        else:
            product.badge = "FSSAI Certified" if product.fssai_certified else "Valley Pure"
            product.badge_type = "fssai"

    return jsonify({"success": True, "isBestseller": product.is_bestseller, "product": product.to_dict()})

# --- Order Operations ---
@admin_bp.route("/orders", methods=["GET"])
@admin_required
def get_admin_orders():
    session = get_session()
    status = request.args.get("status")
    query = session.query(Order).order_by(Order.created_at.desc())
    if status:
        query = query.filter(Order.payment_status == status)

    orders = query.all()
    return jsonify({"orders": [o.to_dict() for o in orders], "total": len(orders)})

@admin_bp.route("/orders/<string:order_id>/status", methods=["PUT"])
@admin_required
def update_order_status(order_id):
    data = request.get_json() or {}
    session = get_session()

    # Lookup by order_number or numeric id
    order = session.query(Order).filter(
        (Order.order_number == order_id) | 
        (Order.id == int(order_id) if order_id.isdigit() else False)
    ).first()

    if not order:
        return jsonify({"error": f"Order '{order_id}' not found."}), 404

    step_statuses = {
        1: "Harvest Verified & Lab Tested (Pampore & Shopian)",
        2: "Nitrogen Vacuum Sealed at Srinagar Terminal",
        3: "In Transit via Express Air Cargo (IndiGo Flight 6E-204)",
        4: "Arrived at Regional Distribution Hub • Sorting for Courier",
        5: "Consignment Delivered to Doorstep ✓"
    }

    with transaction():
        if "step" in data:
            step = int(data["step"])
            order.current_step = step
            order.status_text = data.get("statusText") or step_statuses.get(step, "In Transit")
            if step == 5:
                order.estimated_delivery = "Delivered Successfully"

        if "statusText" in data:
            order.status_text = data["statusText"]
        if "awbNumber" in data:
            order.awb_number = data["awbNumber"]
        if "carrier" in data:
            order.carrier = data["carrier"]
        if "paymentStatus" in data:
            order.payment_status = data["paymentStatus"]

    return jsonify({"success": True, "order": order.to_dict()})

# --- Wholesale Management ---
@admin_bp.route("/wholesale", methods=["GET"])
@admin_required
def get_admin_wholesale():
    session = get_session()
    inquiries = session.query(WholesaleInquiry).order_by(WholesaleInquiry.created_at.desc()).all()
    return jsonify({"inquiries": [i.to_dict() for i in inquiries], "total": len(inquiries)})

@admin_bp.route("/wholesale/<string:ref_id>/status", methods=["PUT"])
@admin_required
def update_wholesale_status(ref_id):
    data = request.get_json() or {}
    session = get_session()
    inquiry = session.query(WholesaleInquiry).filter(WholesaleInquiry.ref_id == ref_id).first()
    if not inquiry:
        return jsonify({"error": f"Inquiry '{ref_id}' not found."}), 404

    with transaction():
        if "status" in data:
            inquiry.status = data["status"]
        if "isRead" in data:
            inquiry.is_read = bool(data["isRead"])
        else:
            inquiry.is_read = True

    return jsonify({"success": True, "inquiry": inquiry.to_dict()})
