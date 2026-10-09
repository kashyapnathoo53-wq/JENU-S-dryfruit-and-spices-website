import json
import logging
from pathlib import Path
from werkzeug.security import generate_password_hash
from backend.database import Base, get_session, get_engine
from backend.models import Product, ProductVariant, AdminUser, WholesaleInquiry

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("jenus_seed")

def seed_database(app=None):
    from backend.app import create_app
    if app is None:
        app = create_app()

    with app.app_context():
        engine = get_engine()
        session = get_session()

        # 1. Create all tables if they don't exist
        logger.info("Creating database tables...")
        Base.metadata.create_all(bind=engine)

        # 2. Seed Admin User
        admin_user = session.query(AdminUser).filter(
            (AdminUser.username == app.config["ADMIN_USERNAME"]) | 
            (AdminUser.alt_id == app.config["ADMIN_ALT_ID"])
        ).first()

        if not admin_user:
            logger.info("Seeding initial admin user...")
            admin_user = AdminUser(
                username=app.config["ADMIN_USERNAME"],
                alt_id=app.config["ADMIN_ALT_ID"],
                email="admin@jenus.com",
                password_hash=generate_password_hash(app.config["ADMIN_PASSWORD"]),
                role="superadmin"
            )
            session.add(admin_user)
            session.commit()
            logger.info("Admin user created successfully.")

        # 3. Seed Products and Variants from seed_products.json
        json_path = Path(__file__).resolve().parent / "seed_products.json"
        if not json_path.exists():
            logger.error("seed_products.json not found!")
            return

        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        products_data = data.get("products", [])
        logger.info(f"Seeding {len(products_data)} products...")

        for p_raw in products_data:
            p_id = p_raw["id"]
            existing_p = session.query(Product).filter(Product.id == p_id).first()

            is_bestseller = (
                p_raw.get("badge") == "Bestseller" or 
                p_raw.get("badgeType") == "bestseller" or
                p_id in ["jnu-mamra-01", "jnu-deal-bundle-12"]
            )
            stock_count = 42 if is_bestseller else 120

            if not existing_p:
                product = Product(
                    id=p_id,
                    name=p_raw["name"],
                    subname=p_raw.get("subname", ""),
                    category=p_raw["category"],
                    sub_category=p_raw.get("subCategory", p_raw["category"]),
                    product_type=p_raw.get("productType", ""),
                    origin=p_raw.get("origin", "Kashmir Valley"),
                    harvest_year=p_raw.get("harvestYear", "2026 Fresh Harvest"),
                    rating=p_raw.get("rating", 4.8),
                    reviews_count=p_raw.get("reviewsCount", 120),
                    badge=p_raw.get("badge"),
                    badge_type=p_raw.get("badgeType"),
                    fssai_certified=p_raw.get("fssaiCertified", True),
                    image=p_raw["image"],
                    images=p_raw.get("images", [p_raw["image"]]),
                    overview=p_raw.get("overview", {}),
                    description=p_raw.get("description", ""),
                    benefits=p_raw.get("benefits", []),
                    nutrition=p_raw.get("nutrition", {}),
                    combo_items=p_raw.get("comboItems"),
                    in_stock=True,
                    stock_count=stock_count,
                    is_bestseller=is_bestseller
                )
                session.add(product)
                session.flush()

                # Add variants
                for w in p_raw.get("weights", []):
                    variant = ProductVariant(
                        product_id=p_id,
                        weight=w["weight"],
                        price=w["price"],
                        original_price=w.get("originalPrice"),
                        discount=w.get("discount", 0),
                        is_default=w.get("isDefault", False),
                        stock_count=50
                    )
                    session.add(variant)
            else:
                # Update images and metadata if changed
                existing_p.image = p_raw["image"]
                existing_p.images = p_raw.get("images", [p_raw["image"]])
                existing_p.name = p_raw["name"]
                existing_p.subname = p_raw.get("subname", "")
                existing_p.description = p_raw.get("description", "")
                existing_p.overview = p_raw.get("overview", {})

        session.commit()
        logger.info(f"Database successfully seeded with {len(products_data)} products and variants!")

        # 4. Seed Wholesale Inquiries if empty
        inquiry_count = session.query(WholesaleInquiry).count()
        if inquiry_count == 0:
            logger.info("Seeding initial wholesale sample inquiries...")
            sample_inquiries = [
                WholesaleInquiry(
                    ref_id="JNU-BLK-94821",
                    name="Sunil Aggarwal",
                    phone="9811223344",
                    business_name="Aggarwal Sweets & Dry Fruit House",
                    city="New Delhi (NCR)",
                    branch="Delhi (Khari Baoli Market)",
                    product="Kashmiri Mamra Almonds (Grade-1 Organic)",
                    quantity="150 kg",
                    target_price="₹1,850 / kg",
                    notes="Requires 10kg nitrogen-sealed airtight canister packing for corporate suites.",
                    status="New Blink ⚡",
                    is_read=False
                ),
                WholesaleInquiry(
                    ref_id="JNU-BLK-91204",
                    name="Pooja Mehta",
                    phone="9820011223",
                    business_name="Royal Heritage Caterers & Confectionery",
                    city="Mumbai",
                    branch="Mumbai (APMC Vashi Hub)",
                    product="Pure Pampore Mogra Saffron (Grade-1 A++)",
                    quantity="250 grams (250 x 1g airtight jars)",
                    target_price="₹220 / gram",
                    notes="Need NABL laboratory purity certificate for 5-star hotel banquet dessert menu.",
                    status="Quoted 📋",
                    is_read=True
                )
            ]
            session.add_all(sample_inquiries)
            session.commit()
            logger.info("Sample wholesale inquiries seeded.")

if __name__ == "__main__":
    seed_database()
