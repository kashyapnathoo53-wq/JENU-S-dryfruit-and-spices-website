from flask import Blueprint, jsonify, current_app
from sqlalchemy import text
from backend.database import get_session

health_bp = Blueprint("health", __name__, url_prefix="/api")

@health_bp.route("/health", methods=["GET"])
def health_check():
    session = get_session()
    db_status = "ok"
    try:
        session.execute(text("SELECT 1"))
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    return jsonify({
        "status": "healthy" if db_status == "ok" else "degraded",
        "service": "JENU'S Kashmir Gourmet API",
        "database": db_status,
        "environment": current_app.config.get("ENVIRONMENT", "development")
    })

@health_bp.route("/config", methods=["GET"])
def get_public_config():
    """Returns safe, public-facing configuration for frontend initialization."""
    key_id = current_app.config.get("RAZORPAY_KEY_ID")
    return jsonify({
        "keyId": key_id,
        "razorpayKeyId": key_id,
        "merchantName": current_app.config.get("MERCHANT_NAME"),
        "fssaiLicense": current_app.config.get("FSSAI_LICENSE"),
        "currency": current_app.config.get("CURRENCY", "INR")
    })
