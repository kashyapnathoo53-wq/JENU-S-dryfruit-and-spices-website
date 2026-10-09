from datetime import datetime, timezone
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, Text, JSON, DateTime, ForeignKey
)
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
from backend.database import Base

def utcnow():
    return datetime.now(timezone.utc)

class Product(Base):
    __tablename__ = "products"

    id = Column(String(80), primary_key=True)
    name = Column(String(255), nullable=False)
    subname = Column(String(255), nullable=True)
    category = Column(String(100), nullable=False, index=True)
    sub_category = Column(String(100), nullable=True, index=True)
    product_type = Column(String(255), nullable=True)
    origin = Column(String(255), nullable=True)
    harvest_year = Column(String(100), nullable=True)
    rating = Column(Float, default=4.8)
    reviews_count = Column(Integer, default=120)
    badge = Column(String(100), nullable=True)
    badge_type = Column(String(50), nullable=True)
    fssai_certified = Column(Boolean, default=True)
    image = Column(String(500), nullable=False)
    images = Column(JSON, default=list)
    overview = Column(JSON, default=dict)
    description = Column(Text, nullable=True)
    benefits = Column(JSON, default=list)
    nutrition = Column(JSON, default=dict)
    combo_items = Column(JSON, nullable=True)
    in_stock = Column(Boolean, default=True)
    stock_count = Column(Integer, default=100)
    is_bestseller = Column(Boolean, default=False)
    created_at = Column(DateTime, default=utcnow)
    updated_at = Column(DateTime, default=utcnow, onupdate=utcnow)

    variants = relationship("ProductVariant", back_populates="product", cascade="all, delete-orphan", lazy="joined")

    def to_dict(self):
        sorted_weights = sorted(
            [v.to_dict() for v in self.variants],
            key=lambda w: (not w.get("isDefault", False), w.get("price", 0))
        )
        return {
            "id": self.id,
            "name": self.name,
            "subname": self.subname or "",
            "category": self.category,
            "subCategory": self.sub_category or self.category,
            "productType": self.product_type or "",
            "origin": self.origin or "Kashmir Valley",
            "harvestYear": self.harvest_year or "2026 Fresh Harvest",
            "rating": self.rating,
            "reviewsCount": self.reviews_count,
            "badge": self.badge or ("FSSAI Certified" if self.fssai_certified else "Valley Pure"),
            "badgeType": self.badge_type or ("bestseller" if self.is_bestseller else "fssai"),
            "fssaiCertified": self.fssai_certified,
            "image": self.image,
            "images": self.images if self.images else [self.image],
            "overview": self.overview or {},
            "description": self.description or "",
            "benefits": self.benefits or [],
            "nutrition": self.nutrition or {},
            "weights": sorted_weights,
            "comboItems": self.combo_items,
            "inStock": self.in_stock,
            "stockCount": self.stock_count,
            "isBestseller": self.is_bestseller,
            "price": sorted_weights[0]["price"] if sorted_weights else 0
        }

class ProductVariant(Base):
    __tablename__ = "product_variants"

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(String(80), ForeignKey("products.id", ondelete="CASCADE"), nullable=False, index=True)
    weight = Column(String(50), nullable=False)
    price = Column(Integer, nullable=False)
    original_price = Column(Integer, nullable=True)
    discount = Column(Integer, default=0)
    is_default = Column(Boolean, default=False)
    stock_count = Column(Integer, default=50)

    product = relationship("Product", back_populates="variants")

    def to_dict(self):
        return {
            "id": self.id,
            "weight": self.weight,
            "price": self.price,
            "originalPrice": self.original_price or round(self.price * 1.25),
            "discount": self.discount,
            "isDefault": self.is_default,
            "stockCount": self.stock_count
        }

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_number = Column(String(80), unique=True, nullable=False, index=True)
    customer_name = Column(String(255), nullable=False)
    customer_email = Column(String(255), nullable=True)
    customer_phone = Column(String(50), nullable=False, index=True)
    clean_phone = Column(String(20), nullable=False, index=True)
    shipping_address = Column(Text, nullable=False)
    city = Column(String(100), nullable=False)
    pincode = Column(String(20), nullable=False)
    state = Column(String(100), nullable=True)
    
    subtotal = Column(Integer, nullable=False)
    discount_amount = Column(Integer, default=0)
    discount_code = Column(String(50), nullable=True)
    gst_amount = Column(Integer, default=0)
    shipping_fee = Column(Integer, default=0)
    total_amount = Column(Integer, nullable=False)
    currency = Column(String(10), default="INR")
    
    payment_status = Column(String(50), default="pending", index=True) # pending, paid, failed, refunded
    payment_method = Column(String(50), default="razorpay")
    razorpay_order_id = Column(String(100), nullable=True, index=True)
    razorpay_payment_id = Column(String(100), nullable=True, index=True)
    razorpay_signature = Column(String(255), nullable=True)

    current_step = Column(Integer, default=2) # 1 to 5
    status_text = Column(String(255), default="Nitrogen Vacuum Sealed • Ready for Air Cargo")
    carrier = Column(String(255), default="Priority Air Cargo (IndiGo Flight 6E-204 Srinagar ➔ Central Hub)")
    awb_number = Column(String(100), nullable=True)
    estimated_delivery = Column(String(100), default="Within 24 to 48 Hours")
    notes = Column(Text, nullable=True)

    created_at = Column(DateTime, default=utcnow)
    updated_at = Column(DateTime, default=utcnow, onupdate=utcnow)

    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan", lazy="joined")
    payments = relationship("Payment", back_populates="order", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "orderId": self.order_number,
            "orderNumber": self.order_number,
            "placedDate": self.created_at.strftime("%d %b %Y, %I:%M %p") if self.created_at else "",
            "customer": {
                "name": self.customer_name,
                "email": self.customer_email or "",
                "phone": self.customer_phone,
                "address": self.shipping_address,
                "city": self.city,
                "pincode": self.pincode,
                "state": self.state or ""
            },
            "subtotal": self.subtotal,
            "discountAmount": self.discount_amount,
            "discountCode": self.discount_code,
            "gstAmount": self.gst_amount,
            "shippingFee": self.shipping_fee,
            "total": self.total_amount,
            "paymentStatus": self.payment_status,
            "paymentMethod": self.payment_method,
            "paymentId": self.razorpay_payment_id or "",
            "razorpayOrderId": self.razorpay_order_id or "",
            "currentStep": self.current_step,
            "statusText": self.status_text,
            "carrier": self.carrier,
            "awbNumber": self.awb_number or "",
            "estimatedDelivery": self.estimated_delivery,
            "items": [item.to_dict() for item in self.items],
            "createdAt": self.created_at.isoformat() if self.created_at else ""
        }

class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    product_id = Column(String(80), nullable=False)
    product_name = Column(String(255), nullable=False)
    variant_weight = Column(String(50), nullable=False)
    unit_price = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    subtotal = Column(Integer, nullable=False)
    image_url = Column(String(500), nullable=True)

    order = relationship("Order", back_populates="items")

    def to_dict(self):
        return {
            "id": self.id,
            "productId": self.product_id,
            "name": self.product_name,
            "weight": self.variant_weight,
            "price": self.unit_price,
            "quantity": self.quantity,
            "subtotal": self.subtotal,
            "image": self.image_url or ""
        }

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="SET NULL"), nullable=True, index=True)
    razorpay_order_id = Column(String(100), nullable=False, index=True)
    razorpay_payment_id = Column(String(100), unique=True, nullable=False, index=True)
    razorpay_signature = Column(String(255), nullable=True)
    amount = Column(Integer, nullable=False) # In rupees
    amount_paise = Column(Integer, nullable=False) # In paise
    currency = Column(String(10), default="INR")
    status = Column(String(50), nullable=False) # captured, failed, refunded
    method = Column(String(50), nullable=True) # upi, card, netbanking
    error_code = Column(String(100), nullable=True)
    error_description = Column(Text, nullable=True)
    webhook_payload = Column(JSON, nullable=True)
    verified_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=utcnow)

    order = relationship("Order", back_populates="payments")

    def to_dict(self):
        return {
            "id": self.id,
            "orderId": self.order_id,
            "razorpayOrderId": self.razorpay_order_id,
            "razorpayPaymentId": self.razorpay_payment_id,
            "amount": self.amount,
            "currency": self.currency,
            "status": self.status,
            "method": self.method,
            "verifiedAt": self.verified_at.isoformat() if self.verified_at else None,
            "createdAt": self.created_at.isoformat() if self.created_at else ""
        }

class WholesaleInquiry(Base):
    __tablename__ = "wholesale_inquiries"

    id = Column(Integer, primary_key=True, autoincrement=True)
    ref_id = Column(String(80), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False, index=True)
    business_name = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False)
    branch = Column(String(100), nullable=True)
    product = Column(String(255), nullable=False)
    quantity = Column(String(100), nullable=False)
    target_price = Column(String(100), nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(String(50), default="New Blink ⚡")
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=utcnow)
    updated_at = Column(DateTime, default=utcnow, onupdate=utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "refId": self.ref_id,
            "date": self.created_at.strftime("%d %b %Y, %I:%M %p") if self.created_at else "Today",
            "name": self.name,
            "phone": self.phone,
            "business": self.business_name,
            "city": self.city,
            "branch": self.branch or "",
            "product": self.product,
            "quantity": self.quantity,
            "targetPrice": self.target_price or "",
            "notes": self.notes or "",
            "status": self.status,
            "isRead": self.is_read,
            "timestamp": int(self.created_at.timestamp() * 1000) if self.created_at else 0
        }

class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(100), unique=True, nullable=False, index=True)
    alt_id = Column(String(100), unique=True, nullable=True, index=True)
    email = Column(String(255), unique=True, nullable=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), default="admin")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=utcnow)
    last_login_at = Column(DateTime, nullable=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role,
            "lastLoginAt": self.last_login_at.isoformat() if self.last_login_at else None
        }
