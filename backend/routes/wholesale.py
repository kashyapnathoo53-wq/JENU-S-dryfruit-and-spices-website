import random
from flask import Blueprint, request, jsonify
from backend.database import get_session, transaction
from backend.models import WholesaleInquiry

wholesale_bp = Blueprint("wholesale", __name__, url_prefix="/api/wholesale")

@wholesale_bp.route("", methods=["POST"])
def submit_wholesale_inquiry():
    data = request.get_json() or {}

    name = data.get("name", "").strip()
    phone = data.get("phone", "").strip()
    business = data.get("business", "").strip()
    city = data.get("city", "").strip()
    product = data.get("product", "").strip()
    quantity = data.get("quantity", "").strip()
    branch = data.get("branch", "").strip()
    target_price = data.get("targetPrice", "").strip()
    notes = data.get("notes", "").strip()

    if not name or not phone or not business or not product or not quantity:
        return jsonify({"error": "Name, phone, business name, product, and quantity are required."}), 400

    ref_id = f"JNU-BLK-{random.randint(10000, 99999)}"

    session = get_session()
    with transaction():
        inquiry = WholesaleInquiry(
            ref_id=ref_id,
            name=name,
            phone=phone,
            business_name=business,
            city=city or "Major Metro Hub",
            branch=branch,
            product=product,
            quantity=quantity,
            target_price=target_price,
            notes=notes,
            status="New Blink ⚡",
            is_read=False
        )
        session.add(inquiry)

    return jsonify({
        "success": True,
        "refId": ref_id,
        "message": "Wholesale inquiry received. Our Srinagar Procurement Desk will connect shortly.",
        "inquiry": inquiry.to_dict()
    }), 201
