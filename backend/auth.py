import jwt
from datetime import datetime, timezone, timedelta
from functools import wraps
from flask import request, jsonify, current_app
from backend.database import get_session
from backend.models import AdminUser

def generate_admin_token(user: AdminUser) -> str:
    secret = current_app.config["JWT_SECRET_KEY"]
    expiry_hours = current_app.config.get("JWT_EXPIRY_HOURS", 24)
    now = datetime.now(timezone.utc)
    
    payload = {
        "sub": str(user.id),
        "username": user.username,
        "role": user.role,
        "iat": now,
        "exp": now + timedelta(hours=expiry_hours)
    }
    return jwt.encode(payload, secret, algorithm="HS256")

def decode_admin_token(token: str) -> dict:
    secret = current_app.config["JWT_SECRET_KEY"]
    try:
        return jwt.decode(token, secret, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Authorization token required"}), 401
            
        token = auth_header.split(" ", 1)[1].strip()
        payload = decode_admin_token(token)
        if not payload:
            return jsonify({"error": "Invalid or expired authorization token"}), 401

        session = get_session()
        admin_id = int(payload["sub"]) if str(payload["sub"]).isdigit() else payload["sub"]
        admin = session.query(AdminUser).filter(AdminUser.id == admin_id).first()
        if not admin or not admin.is_active:
            return jsonify({"error": "Admin account is inactive or not found"}), 403

        request.current_admin = admin
        return f(*args, **kwargs)
    return decorated_function
