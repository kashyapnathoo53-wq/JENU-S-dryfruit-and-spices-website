import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file from project root or backend dir
ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / ".env")
load_dotenv(Path(__file__).resolve().parent / ".env")

class Config:
    ENVIRONMENT = os.getenv("FLASK_ENV", os.getenv("ENVIRONMENT", "development"))
    DEBUG = ENVIRONMENT == "development"
    
    SECRET_KEY = os.getenv("SECRET_KEY", "jenus-kashmir-secret-key-production-seed-2026")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jenus-jwt-secure-signing-key-autumn-2026")
    JWT_EXPIRY_HOURS = int(os.getenv("JWT_EXPIRY_HOURS", "24"))

    # Database configuration (PostgreSQL / Supabase or local SQLite fallback)
    raw_db_url = os.getenv("DATABASE_URL", f"sqlite:///{ROOT_DIR / 'jenus_kashmir.db'}")
    # Normalize postgres:// to postgresql:// for SQLAlchemy 2.0+
    if raw_db_url.startswith("postgres://"):
        raw_db_url = raw_db_url.replace("postgres://", "postgresql://", 1)
    
    SQLALCHEMY_DATABASE_URI = raw_db_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 300,
    } if not raw_db_url.startswith("sqlite") else {}

    # Razorpay Credentials (SECRET stays on backend ONLY)
    RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", os.getenv("VITE_RAZORPAY_KEY_ID", "rzp_test_Tf36riXXdeFssw"))
    RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "")
    RAZORPAY_WEBHOOK_SECRET = os.getenv("RAZORPAY_WEBHOOK_SECRET", "")
    
    # Store branding & regulatory details
    MERCHANT_NAME = os.getenv("MERCHANT_NAME", "JENU'S Kashmir Gourmet")
    FSSAI_LICENSE = os.getenv("FSSAI_LICENSE", "10026061000412")
    CURRENCY = "INR"

    # CORS configuration
    CORS_ORIGINS = [origin.strip() for origin in os.getenv(
        "CORS_ORIGINS", 
        "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000"
    ).split(",") if origin.strip()]

    # Initial Admin Seed
    ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin@jenus.com")
    ADMIN_ALT_ID = os.getenv("ADMIN_ALT_ID", "jenus_admin")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "Kashmir2026!")

class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    RAZORPAY_KEY_ID = "rzp_test_TESTMOCK123456"
    RAZORPAY_KEY_SECRET = "mock_secret_test_key_123456"
    RAZORPAY_WEBHOOK_SECRET = "mock_webhook_secret_test_123"
