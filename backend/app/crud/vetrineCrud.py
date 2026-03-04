from sqlalchemy import asc, desc, func, or_
from sqlalchemy.orm import Session
from typing import List, Optional
from models.vetrineModels import OrderStatus, Product, Order, OrderItem, CartItem, Category, Story
from schemas.vetrineSchemas import CategoryBase, ProductBase, OrderCreate, CartItemBase, OrderItemBase, StoryBase
from datetime import datetime
from fastapi import HTTPException
from random import randint

from controller.sendMail import send_email_via_gmail

# CRUD operations for Product
def get_products(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    category_name: Optional[str] = None,
    max_price: Optional[float] = None,
    sortBy: Optional[str] = 'popularite',
    searchFor: Optional[str] = None
):
    query = db.query(Product)

    # Filter by category if category_name is provided (except "tous")
    if category_name and category_name.lower() != "tous":
        category = db.query(Category).filter(func.lower(Category.name) == category_name.lower()).first()
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
        print(category.id)
        query = query.filter(Product.category_id == category.id)

    # Filter by price if max_price is provided
    if max_price:
        query = query.filter(Product.price <= max_price)

    if searchFor and searchFor.strip():
        search_query = f"%{searchFor.strip()}%"
        query = query.filter(
            Product.name.ilike(search_query) |
            Product.description.ilike(search_query)
        )

    # Apply sorting
    if sortBy == 'prix-asc':
        query = query.order_by(asc(Product.price))  # Sort by price ascending
    elif sortBy == 'prix-desc':
        query = query.order_by(desc(Product.price))  # Sort by price descending
    elif sortBy == 'popularite':
        query = query.order_by(asc(Product.buzzent))  # Sort by popularity (ascending or descending)
    else:
        query = query.order_by(asc(Product.id))  # Default sorting by ID or any other field

    # Apply pagination
    query = query.offset(skip).limit(limit)

    # Fetch the products and convert them to dictionaries (to return a formatted response)
    #raise HTTPException(status_code=400, detail=str(query.statement.compile(compile_kwargs={"literal_binds": True}))) 
    return query.all()

def get_product_by_id(db: Session, product_id: int) -> Optional[Product]:
    return db.query(Product).filter(Product.id == product_id).first()

def get_product_by_slug_db(db: Session, slug: str) -> Optional[Product]:
    return db.query(Product).filter(Product.slug == slug).first()

def create_product(db: Session, product: ProductBase) -> Product:
    db_product = Product(
        name=product.name,
        description=product.description,
        price=product.price,
        stock_quantity=product.stock_quantity,
        category_id=product.category_id,  # Handle optional category_id
        discounted_price=product.discounted_price,
        image_url=product.image_url,
        image2_url=product.image2_url,
        image3_url=product.image3_url,
        image4_url=product.image4_url,
        promo=product.promo,
        buzzent=product.buzzent,
        rating=product.rating,
        num_ratings=product.num_ratings,
        slug=create_slug(product.name),
        shipping_cost=product.shipping_cost
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product
def create_slug(name):
    slug = name.lower().replace(" ", "-")
    return slug
def update_product(db: Session, product_id: int, product: ProductBase) -> Optional[Product]:
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        db_product.name = product.name
        db_product.description = product.description
        db_product.price = product.price
        db_product.stock_quantity = product.stock_quantity
        db_product.category_id = product.category_id,
        db_product.discounted_price = product.discounted_price
        db_product.image_url = product.image_url
        db_product.image2_url = product.image2_url
        db_product.image3_url = product.image3_url
        db_product.image4_url = product.image4_url
        db_product.promo = product.promo
        db_product.buzzent = product.buzzent
        db_product.rating = product.rating
        db_product.num_ratings = product.num_ratings
        db_product.slug = create_slug(product.name)
        db_product.shipping_cost = product.shipping_cost
        db.commit()
        db.refresh(db_product)
        return db_product
    return None

def delete_product(db: Session, product_id: int) -> None:
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
    else:
        raise HTTPException(status_code=404, detail="Product not found")
    
# CRUD operations for Category

# Get all categories
def get_categories(db: Session, skip: int = 0, limit: int = 10) -> List[Category]:
    return db.query(Category).offset(skip).limit(limit).all()

# Get a category by ID
def get_category_by_id(db: Session, category_id: int) -> Category:
    return db.query(Category).filter(Category.id == category_id).first()

# Create a new category
def create_category(db: Session, category: CategoryBase) -> Category:
    db_category = Category(name=category.name,description=category.description,image_url=category.image_url)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

# Update an existing category
def update_category(db: Session, category_id: int, category: CategoryBase) -> Category:
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if db_category:
        db_category.name = category.name
        db_category.description = category.description
        db_category.image_url = category.image_url  
        db.commit()
        db.refresh(db_category)
        return db_category
    return None

# Delete a category
def delete_category(db: Session, category_id: int) -> None:
    db_category = db.query(Category).filter(Category.id == category_id).first()
    if db_category:
        db.delete(db_category)
        db.commit()

# CRUD operations for Order
def get_orders(db: Session, skip: int = 0, limit: int = 10) -> List[Order]:
    if skip < 0 or limit <= 0:
        raise HTTPException(status_code=400, detail="Invalid pagination parameters.")
    return db.query(Order).order_by(Order.created_at.desc()).offset(skip).limit(limit).all()

def create_order(db: Session, order_create: OrderCreate, total_amount: float) -> Order:
    # Validate items list
    if not order_create.items:
        raise HTTPException(status_code=400, detail="Order must contain at least one item.")

    # Validate products and stock before creating the order
    for item in order_create.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product with ID {item.product_id} not found.")
        if item.quantity <= 0:
            raise HTTPException(status_code=400, detail=f"Quantity for product {product.name} must be positive.")
    # Create the order
    order = Order(
        total_amount=total_amount,
        status=OrderStatus.PENDING,  # Use enum value directly
        created_at=datetime.utcnow(),
        username=order_create.username,
        email=order_create.email,
        telephone=order_create.telephone,
        location=order_create.location,
        payment_method=order_create.payment_method,
        payed= "check",  # Default to false, can be updated later
        code = str(randint(10000, 99999))  + "-" + str(randint(10000, 99999)) + "-" + str(randint(10000, 99999)) + "-" + str(randint(10000, 99999))  # Generate a random code for the order
    )
    db.add(order)
    db.flush()  # Get order.id without committing yet

    # Create order items and update stock
    for item in order_create.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        order_item = OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=item.price,
            name=product.name if product else None,
            shipping_cost=item.shipping_cost if item.shipping_cost is not None else 9.0
        )
        db.add(order_item)
        product.stock_quantity -= item.quantity  # Update stock

    # Commit all changes at once
    db.commit()
    db.refresh(order)
    # send_email_via_gmail
    send_email_via_gmail(
        to_email=order.email,
        subject="Confirmation de commande",
        body=(
            f"Merci pour votre commande {order.code}.\n"
            f"Votre commande sera traitée rapidement.\n"
            f"Montant total : {order.total_amount}.\n"
            f"Statut : {str(order.status)}\n"
            f"Vous pouvez suivre votre commande en cliquant sur ce lien : "
            f"https://apiculturegalai.tn/client-order-view?ordercode={order.code}\n\n"
            "Cordialement,\n"
            "Apiculture Galai Team"
        )
    )
    return order

def delete_order(db: Session, order_id: int) -> None:
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")

    db.query(OrderItem).filter(OrderItem.order_id == order_id).delete()
    db.delete(order)
    db.commit()


# CRUD operations for CartItem
def get_cart_items(db: Session, user_id: int) -> List[CartItem]:
    return db.query(CartItem).filter(CartItem.user_id == user_id).all()

def add_to_cart(db: Session, cart_item: CartItemBase) -> CartItem:
    # Check if product exists
    product = db.query(Product).filter(Product.id == cart_item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")
    
    # Check if product stock is sufficient
    if cart_item.quantity > product.stock_quantity:
        raise HTTPException(status_code=400, detail="Insufficient stock.")
    
    db_cart_item = CartItem( product_id=cart_item.product_id, quantity=cart_item.quantity)
    db.add(db_cart_item)
    db.commit()
    db.refresh(db_cart_item)
    return db_cart_item

def remove_from_cart(db: Session, user_id: int, cart_item_id: int) -> None:
    db_cart_item = db.query(CartItem).filter(CartItem.id == cart_item_id, CartItem.user_id == user_id).first()
    if not db_cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found.")
    
    db.delete(db_cart_item)
    db.commit()

def caclulate_max_shipping_cost(items: List[OrderItemBase]) -> float:
    return max(item.shipping_cost for item in items)

# =========================
# STORY CRUD
# =========================

def get_stories(db: Session, skip: int = 0, limit: int = 500) -> List[Story]:
    # Fix: order_by comes before offset/limit
    return db.query(Story).order_by(Story.periority).offset(skip).limit(limit).all()

def get_story(db: Session, story_id: int) -> Story:
    return db.query(Story).filter(Story.id == story_id).first()

def create_story(db: Session, story: StoryBase) -> Story:
    db_story = Story(
        **story(),
        created_at=story.created_at or datetime.utcnow(),
        updated_at=story.updated_at or datetime.utcnow()
    )
    db.add(db_story)
    db.commit()
    db.refresh(db_story)
    return db_story

def update_story(db: Session, story_id: int, story: StoryBase) -> Story:
    db_story = db.query(Story).filter(Story.id == story_id).first()
    if db_story:
        for key, value in story.dict(exclude_unset=True).items():
            setattr(db_story, key, value)
        db_story.updated_at = datetime.utcnow()  # always update timestamp
        db.commit()
        db.refresh(db_story)
        return db_story
    return None

def delete_story(db: Session, story_id: int) -> None:
    db_story = db.query(Story).filter(Story.id == story_id).first()
    if db_story:
        db.delete(db_story)
        db.commit()
    else:
        raise HTTPException(status_code=404, detail="Story not found")