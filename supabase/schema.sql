-- =========================================================================
-- JENU'S KASHMIR GOURMET - POSTGRESQL SCHEMA FOR SUPABASE & PRODUCTION
-- =========================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function for automatic updated_at timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(80) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subname VARCHAR(255),
    category VARCHAR(100) NOT NULL,
    sub_category VARCHAR(100),
    product_type VARCHAR(255),
    origin VARCHAR(255),
    harvest_year VARCHAR(100),
    rating NUMERIC(3, 2) DEFAULT 4.80,
    reviews_count INTEGER DEFAULT 120,
    badge VARCHAR(100),
    badge_type VARCHAR(50),
    fssai_certified BOOLEAN DEFAULT TRUE,
    image VARCHAR(500) NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    overview JSONB DEFAULT '{}'::jsonb,
    description TEXT,
    benefits JSONB DEFAULT '[]'::jsonb,
    nutrition JSONB DEFAULT '{}'::jsonb,
    combo_items JSONB,
    in_stock BOOLEAN DEFAULT TRUE,
    stock_count INTEGER DEFAULT 100,
    is_bestseller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products(sub_category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_bestseller ON products(is_bestseller);

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- 2. PRODUCT VARIANTS (WEIGHTS & PRICES)
CREATE TABLE IF NOT EXISTS product_variants (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(80) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    weight VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    original_price INTEGER,
    discount INTEGER DEFAULT 0,
    is_default BOOLEAN DEFAULT FALSE,
    stock_count INTEGER DEFAULT 50
);

CREATE INDEX IF NOT EXISTS idx_variants_product_id ON product_variants(product_id);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(80) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50) NOT NULL,
    clean_phone VARCHAR(20) NOT NULL,
    shipping_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    state VARCHAR(100),
    
    subtotal INTEGER NOT NULL,
    discount_amount INTEGER DEFAULT 0,
    discount_code VARCHAR(50),
    gst_amount INTEGER DEFAULT 0,
    shipping_fee INTEGER DEFAULT 0,
    total_amount INTEGER NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50) DEFAULT 'razorpay',
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    razorpay_signature VARCHAR(255),
    
    current_step INTEGER DEFAULT 2,
    status_text VARCHAR(255) DEFAULT 'Nitrogen Vacuum Sealed • Ready for Air Cargo',
    carrier VARCHAR(255) DEFAULT 'Priority Air Cargo (IndiGo Flight 6E-204 Srinagar ➔ Central Hub)',
    awb_number VARCHAR(100),
    estimated_delivery VARCHAR(100) DEFAULT 'Within 24 to 48 Hours',
    notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_clean_phone ON orders(clean_phone);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON orders(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- 4. ORDER ITEMS
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(80) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    variant_weight VARCHAR(50) NOT NULL,
    unit_price INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    subtotal INTEGER NOT NULL,
    image_url VARCHAR(500)
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- 5. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
    razorpay_order_id VARCHAR(100) NOT NULL,
    razorpay_payment_id VARCHAR(100) UNIQUE NOT NULL,
    razorpay_signature VARCHAR(255),
    amount INTEGER NOT NULL,
    amount_paise INTEGER NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(50) NOT NULL,
    method VARCHAR(50),
    error_code VARCHAR(100),
    error_description TEXT,
    webhook_payload JSONB,
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_order_id ON payments(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_payment_id ON payments(razorpay_payment_id);

-- 6. WHOLESALE INQUIRIES
CREATE TABLE IF NOT EXISTS wholesale_inquiries (
    id SERIAL PRIMARY KEY,
    ref_id VARCHAR(80) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    branch VARCHAR(100),
    product VARCHAR(255) NOT NULL,
    quantity VARCHAR(100) NOT NULL,
    target_price VARCHAR(100),
    notes TEXT,
    status VARCHAR(50) DEFAULT 'New Blink ⚡',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_wholesale_ref_id ON wholesale_inquiries(ref_id);
CREATE INDEX IF NOT EXISTS idx_wholesale_phone ON wholesale_inquiries(phone);
CREATE INDEX IF NOT EXISTS idx_wholesale_is_read ON wholesale_inquiries(is_read);

CREATE TRIGGER update_wholesale_updated_at
    BEFORE UPDATE ON wholesale_inquiries
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- 7. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    alt_id VARCHAR(100) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_admin_username ON admin_users(username);
CREATE INDEX IF NOT EXISTS idx_admin_alt_id ON admin_users(alt_id);
