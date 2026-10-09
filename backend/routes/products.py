from flask import Blueprint, request, jsonify
from sqlalchemy import or_
from backend.database import get_session
from backend.models import Product

products_bp = Blueprint("products", __name__, url_prefix="/api/products")

@products_bp.route("", methods=["GET"])
def get_products():
    session = get_session()
    query = session.query(Product)

    # Filter by category
    category = request.args.get("category")
    if category and category != "all":
        query = query.filter(Product.category == category)

    # Filter by subCategory
    sub_category = request.args.get("subCategory")
    if sub_category and sub_category != "all":
        query = query.filter(Product.sub_category == sub_category)

    # Filter by badge / badgeType
    badge = request.args.get("badge")
    if badge:
        query = query.filter(or_(Product.badge == badge, Product.badge_type == badge))

    # Search by text query
    search = request.args.get("search", "").strip()
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            or_(
                Product.name.ilike(search_pattern),
                Product.subname.ilike(search_pattern),
                Product.category.ilike(search_pattern),
                Product.description.ilike(search_pattern),
                Product.product_type.ilike(search_pattern)
            )
        )

    products = query.all()
    result = [p.to_dict() for p in products]

    # Sorting
    sort_by = request.args.get("sort", "recommended")
    if sort_by == "price-low":
        result.sort(key=lambda p: p["price"])
    elif sort_by == "price-high":
        result.sort(key=lambda p: p["price"], reverse=True)
    elif sort_by == "rating":
        result.sort(key=lambda p: p.get("rating", 0), reverse=True)
    elif sort_by == "bestseller":
        result.sort(key=lambda p: (not p.get("isBestseller", False), -p.get("reviewsCount", 0)))

    return jsonify({"products": result, "total": len(result)})

@products_bp.route("/<string:product_id>", methods=["GET"])
def get_product_detail(product_id):
    session = get_session()
    product = session.query(Product).filter(Product.id == product_id).first()
    if not product:
        return jsonify({"error": f"Product '{product_id}' not found"}), 404

    return jsonify(product.to_dict())

@products_bp.route("/categories/list", methods=["GET"])
def get_categories():
    session = get_session()
    products = session.query(Product).all()

    category_counts = {}
    for p in products:
        category_counts[p.category] = category_counts.get(p.category, 0) + 1

    categories = [{"id": cat, "count": count} for cat, count in category_counts.items()]
    return jsonify({"categories": categories})
