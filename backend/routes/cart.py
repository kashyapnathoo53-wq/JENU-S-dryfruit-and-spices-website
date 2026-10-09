from flask import Blueprint, request, jsonify
from backend.database import get_session
from backend.models import Product, ProductVariant

cart_bp = Blueprint("cart", __name__, url_prefix="/api/cart")

PROMO_CODES = {
    "KASHMIR10": {"type": "percent", "value": 10, "max_discount": 500, "min_order": 500},
    "VALLEYPURE": {"type": "fixed", "value": 150, "min_order": 1500},
    "JNUFIRST": {"type": "fixed", "value": 200, "min_order": 1200},
    "AUTUMN2026": {"type": "percent", "value": 15, "max_discount": 750, "min_order": 1000}
}

def calculate_cart_totals(items, promo_code=None):
    session = get_session()
    validated_items = []
    subtotal = 0

    for item in items:
        p_id = item.get("id") or item.get("productId")
        req_weight = str(item.get("weight", "250g")).strip()
        quantity = max(1, int(item.get("quantity", 1)))

        product = session.query(Product).filter(Product.id == p_id).first()
        if not product:
            continue

        # Find matching variant
        variant = None
        for v in product.variants:
            if v.weight.lower() == req_weight.lower():
                variant = v
                break

        unit_price = variant.price if variant else (product.variants[0].price if product.variants else 0)
        item_weight = variant.weight if variant else req_weight
        line_total = unit_price * quantity
        subtotal += line_total

        validated_items.append({
            "id": product.id,
            "productId": product.id,
            "name": product.name,
            "weight": item_weight,
            "price": unit_price,
            "quantity": quantity,
            "subtotal": line_total,
            "image": product.image,
            "inStock": product.in_stock
        })

    # Discount calculation
    discount_amount = 0
    clean_code = (promo_code or "").strip().upper()
    promo_applied = False
    promo_message = ""

    if clean_code in PROMO_CODES:
        rule = PROMO_CODES[clean_code]
        min_order = rule.get("min_order", 0)
        if subtotal >= min_order:
            if rule["type"] == "percent":
                discount_amount = round((subtotal * rule["value"]) / 100)
                max_d = rule.get("max_discount")
                if max_d:
                    discount_amount = min(discount_amount, max_d)
            elif rule["type"] == "fixed":
                discount_amount = min(subtotal, rule["value"])
            promo_applied = True
            promo_message = f"Coupon {clean_code} applied: ₹{discount_amount} off"
        else:
            promo_message = f"Coupon requires minimum order of ₹{min_order}"
    elif clean_code:
        promo_message = "Invalid or expired coupon code"

    # Shipping fee (Free shipping above ₹999)
    shipping_fee = 0 if subtotal >= 999 or subtotal == 0 else 99

    # GST Calculation (estimated 5% standard food GST included or added)
    gst_amount = round((subtotal - discount_amount) * 0.05) if subtotal > 0 else 0

    total_amount = max(0, (subtotal - discount_amount) + shipping_fee)

    return {
        "items": validated_items,
        "subtotal": subtotal,
        "discountAmount": discount_amount,
        "discountCode": clean_code if promo_applied else None,
        "promoMessage": promo_message,
        "promoApplied": promo_applied,
        "shippingFee": shipping_fee,
        "gstAmount": gst_amount,
        "total": total_amount,
        "itemCount": sum(i["quantity"] for i in validated_items)
    }

@cart_bp.route("/validate", methods=["POST"])
def validate_cart():
    data = request.get_json() or {}
    items = data.get("items", [])
    promo_code = data.get("promoCode")

    calculation = calculate_cart_totals(items, promo_code)
    return jsonify(calculation)
