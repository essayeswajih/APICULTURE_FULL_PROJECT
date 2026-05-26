import bleach
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from typing import List, Optional
from controller.Oauth2C import get_current_user
from db.database import get_db
from models.vetrineModels import Product, Order, OrderItem, CartItem, Category
from models.Oauth2Models import User
from schemas.vetrineSchemas import CategoryBase, OrederStatus, ProductBase, OrderCreate, CartItemBase, OrderItemBase, OrderBase, PublicStats, StoryBase, SubCategoryBase, VipCardApprove, VipCardBase, VipCardValidation, CartPricingRequest, CartPricingResponse
from crud.vetrineCrud import (
    create_category, create_story, create_subcategory, delete_category, delete_order, delete_product, delete_story, delete_subcategory, get_This_year_sales_crud, get_categories, get_category_by_id,
    get_products, get_product_by_id, create_product, get_orders, create_order,
    get_cart_items, add_to_cart, get_featured_products, get_latest_products, get_popular_products, get_public_stats, get_stories, get_story, get_subcategories, get_top_products_crud, getMonthlyStatus, getOrdersAnalytics, getSalesAnalytics, getUsersAnalytics, getViewsAnalytics, getWeeklyIncome, remove_from_cart, update_category, update_product, get_product_by_slug_db, update_story, update_subcategory,
    approve_vip_card, calculate_cart_pricing, get_vip_cards, revoke_vip_card, validate_vip_card
)
from controller.sendMail import AdminEmail, send_email_via_gmail
from fastapi import Request
from config.limiter_config import limiter

router = APIRouter()

# Role Check - Admin Access
def check_admin(current_user: User = Depends(get_current_user)):
    #if current_user.role != 'admin':
    #    raise HTTPException(status_code=403, detail="Not authorized")
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authorized")

# Route to get all products with filtering options
@router.get("/products", response_model=List[ProductBase])
def get_all_products(
    skip: int = 0,
    limit: int = 1000,
    category: Optional[str] = None,
    max_price: Optional[float] = None,
    sortBy: Optional[str] = 'popularite',  # Default sortBy value
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return get_products(
        db,
        skip=skip,
        limit=limit,
        category_name=category,
        max_price=max_price,
        sortBy=sortBy,
        searchFor=search
    )

@router.get("/products/featured", response_model=List[ProductBase])
def get_homepage_featured_products(db: Session = Depends(get_db)):
    return get_featured_products(db)

@router.get("/products/popular", response_model=List[ProductBase])
def get_homepage_popular_products(db: Session = Depends(get_db)):
    return get_popular_products(db)

@router.get("/products/latest", response_model=List[ProductBase])
def get_homepage_latest_products(db: Session = Depends(get_db)):
    return get_latest_products(db)

# Route to get a single product by ID
@router.get("/products/{product_id}", response_model=ProductBase)
def get_product(product_id: int, db: Session = Depends(get_db)):
    db_product = get_product_by_id(db, product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product
# get a single product by Slug
@router.get("/products/slug/{product_slug}", response_model=ProductBase)
def get_product_by_slug(product_slug: str, db: Session = Depends(get_db)):
    db_product = get_product_by_slug_db(db, product_slug)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

# Route to create a new product
@router.post("/products", response_model=ProductBase, dependencies=[Depends(check_admin)])
def create_new_product(product: ProductBase, db: Session = Depends(get_db)):
    if(not product.category_id):
        raise HTTPException(status_code=400, detail="Category ID is required for product creation.")
    return create_product(db, product)

# Route to update an existing product
@router.put("/products/{product_id}", response_model=ProductBase, dependencies=[Depends(check_admin)])
def update_product_info(product_id: int, product: ProductBase, db: Session = Depends(get_db)):
    updated_product = update_product(db, product_id, product)
    if updated_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product

# Route to delete a product
@router.delete("/products/{product_id}", response_model=dict, dependencies=[Depends(check_admin)])
def delete_product_info(product_id: int, db: Session = Depends(get_db)):
    delete_product(db, product_id)
    return {"message": "Product deleted successfully."}

# Route to get all categories
@router.get("/categories", response_model=List[CategoryBase])
def get_all_categories(skip: int = 0, limit: int = 1000, db: Session = Depends(get_db)):
    return get_categories(db, skip=skip, limit=limit)

# Route to get a single category by ID
@router.get("/categories/{category_id}", response_model=CategoryBase)
def get_category(category_id: int, db: Session = Depends(get_db)):
    db_category = get_category_by_id(db, category_id)
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_category

# Route to create a new category
@router.post("/categories", response_model=CategoryBase, dependencies=[Depends(check_admin)])
def create_new_category(category: CategoryBase, db: Session = Depends(get_db)):
    return create_category(db, category)

# Route to update an existing category
@router.put("/categories/{category_id}", response_model=CategoryBase, dependencies=[Depends(check_admin)])
def update_category_info(category_id: int, category: CategoryBase, db: Session = Depends(get_db)):
    updated_category = update_category(db, category_id, category)
    if updated_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return updated_category

# Route to delete a category
@router.delete("/categories/{category_id}", response_model=dict, dependencies=[Depends(check_admin)])
def delete_category_info(category_id: int, db: Session = Depends(get_db)):
    delete_category(db, category_id)
    return {"message": "Category deleted successfully."}

# Route to get orders for a user (use Pydantic schema here)
@router.get("/orders", response_model=List[OrderBase])
def get_user_orders(
    skip: int = 0, limit: int = 1000, 
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    return get_orders(db,skip=skip, limit=limit)

# Route to create an order
@router.post("/orders", response_model=OrderBase)
@limiter.limit("5/minute")
def create_new_order(
    request: Request, 
    order_create: OrderCreate,
    db: Session = Depends(get_db),
):
    if not order_create.items:
        raise HTTPException(status_code=400, detail="Order must contain items.")
    
    # Validate that the quantity is positive
    if any(item.quantity <= 0 for item in order_create.items):
        raise HTTPException(status_code=400, detail="Quantity must be a positive number.")
    
    return create_order(db, order_create=order_create)

# delte order
@router.delete("/orders/{order_id}", response_model=dict)
def delete_order_info(order_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    delete_order(db, order_id)
    return {"message": "Order deleted successfully."}
# Update Order Status
@router.put("/orders/orderStatus/{order_id}", response_model=OrderBase)
def update_order_status(
    order_id: int, order_update: OrederStatus, db: Session = Depends(get_db), user: User = Depends(get_current_user)
):
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")

    db_order.status = order_update.status
    db.commit()
    db.refresh(db_order)
    return db_order
    raise credentials_exception

#update Order
@router.put("/orders/{order_id}", response_model=OrderBase)
def update_order_info(
    order_id: int,
    order_update: OrderBase, 
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
    ):
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    db_order.status = order_update.status
    db.commit()
    db.refresh(db_order)
    return db_order

# Route to get cart items for a user
@router.get("/cart", response_model=List[CartItemBase])
def get_user_cart(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_cart_items(db, user_id=current_user.id)

# Route to add item to the cart
@router.post("/cart", response_model=CartItemBase)
def add_item_to_cart(
    cart_item: CartItemBase, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    product = db.query(Product).filter(Product.id == cart_item.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return add_to_cart(db, user_id=current_user.id, cart_item=cart_item)

# Route to remove item from the cart
@router.delete("/cart/{cart_item_id}", response_model=dict)
def remove_item_from_cart(
    cart_item_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    db_cart_item = db.query(CartItem).filter(CartItem.id == cart_item_id, CartItem.user_id == current_user.id).first()
    if not db_cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    
    remove_from_cart(db, user_id=current_user.id, cart_item_id=cart_item_id)
    return {"message": "Item removed from cart successfully."}

@router.get("/orders/orderCode/{order_code}", response_model=OrderBase)
def get_order_by_code(
    order_code: str,
    db: Session = Depends(get_db),
):
    db_order = db.query(Order).filter(Order.code == order_code).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order

@router.get("/vip-cards", response_model=List[VipCardBase], dependencies=[Depends(check_admin)])
def get_all_vip_cards(db: Session = Depends(get_db)):
    return get_vip_cards(db)

@router.post("/vip-cards/approve", response_model=VipCardBase, dependencies=[Depends(check_admin)])
def approve_customer_vip_card(vip_card: VipCardApprove, db: Session = Depends(get_db)):
    return approve_vip_card(db, vip_card)

@router.delete("/vip-cards/{code}", response_model=dict, dependencies=[Depends(check_admin)])
def delete_vip_card(code: str, db: Session = Depends(get_db)):
    revoke_vip_card(db, code)
    return {"message": "VIP card revoked successfully."}

@router.get("/vip-cards/validate/{code}", response_model=VipCardValidation)
def validate_vip_code(code: str, db: Session = Depends(get_db)):
    card = validate_vip_card(db, code)
    if not card:
        return {"valid": False, "message": "Invalid or inactive VIP code.", "card": None}
    return {"valid": True, "message": "VIP code is active.", "card": card}

@router.post("/vip-cards/validate-cart", response_model=CartPricingResponse)
def validate_vip_cart(cart: CartPricingRequest, db: Session = Depends(get_db)):
    return calculate_cart_pricing(db, cart.items, cart.vip_code)
# subscribe to newsletter sending emil and return 201
class Newsletter(BaseModel):
    email: str
class Reduction(BaseModel):
    email: str
    name: str
@router.post("/subscribe_to_newsletter", response_model=dict)
@limiter.limit("3/minute")
def subscribe_to_newsletter(request: Request, newsletter: Newsletter):
    email = newsletter.email
    try:
        send_email_via_gmail(
            subject="Apiculture Newsletter Subscription",
            body=f"{email} has subscribed to the Apiculture newsletter.",
            to_email=AdminEmail
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to send subscription email.")
    
    return {"message": "Successfully subscribed to the newsletter."}

@router.post("/subscribe_to_redactions", response_model=dict)
@limiter.limit("3/minute")
def subscribe_to_redactions(request: Request, reduction: Reduction):
    email = reduction.email
    name = reduction.name
    try:
        send_email_via_gmail(
            subject="Apiculture Reduction Subscription",
            body=f"{name}with email:{email} has subscribed to the Apiculture Reduction.",
            to_email=AdminEmail
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to send subscription email. Error: " + str(e))
    
    return {"message": "Successfully subscribed to the Reduction."}

# Contact Form
class contactRequest(BaseModel):
    name: str
    email: EmailStr
    sujet: str
    message: str

@router.post("/support-contact", response_model=dict)
@limiter.limit("3/minute")
def contact_form(request: Request, contact_form: contactRequest):
    if not contact_form.name or not contact_form.email or not contact_form.sujet or not contact_form.message:
        raise HTTPException(status_code=400, detail="All fields are required.")
    
    # Sanitize inputs
    name = bleach.clean(contact_form.name)
    sujet = bleach.clean(contact_form.sujet)
    message = bleach.clean(contact_form.message)
    
    try:
        send_email_via_gmail(
            subject="Apiculture Contact Message",
            body=f"Name: {name}\nEmail: {contact_form.email}\nSujet: {sujet}\nMessage: {message}",
            to_email=AdminEmail,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to send contact message.")
    
    return {"message": "Successfully sent the message."}

# Route to get all stories
@router.get("/stories", response_model=List[StoryBase])
def get_all_stories(skip: int = 0, limit: int = 1000, db: Session = Depends(get_db)):
    return get_stories(db, skip=skip, limit=limit)

# Route to get a specific story by ID
@router.get("/stories/{story_id}", response_model=StoryBase)
def get_story_by_id(story_id: int, db: Session = Depends(get_db)):
    return get_story(db, story_id)

# Route to create a new story
@router.post("/stories", response_model=StoryBase, dependencies=[Depends(check_admin)])
def create_new_story(story: StoryBase, db: Session = Depends(get_db)):
    return create_story(db, story)

# Route to update an existing story
@router.put("/stories/{story_id}", response_model=StoryBase, dependencies=[Depends(check_admin)])
def update_story_info(story_id: int, story: StoryBase, db: Session = Depends(get_db)):
    return update_story(db, story_id, story)

# Route to delete a story
@router.delete("/stories/{story_id}", dependencies=[Depends(check_admin)])
def delete_story_info(story_id: int, db: Session = Depends(get_db)):
    delete_story(db, story_id)
    return {"message": "Story deleted successfully."}

# SubCategory Routes
@router.get("/subcategories", response_model=List[SubCategoryBase])
def get_all_subcategories(skip: int = 0, limit: int = 1000, db: Session = Depends(get_db)):
    return get_subcategories(db, skip=skip, limit=limit)

@router.get("/subcategories/{sub_category_id}", response_model=SubCategoryBase)
def get_subcategory_by_id(sub_category_id: int, db: Session = Depends(get_db)):
    return get_subcategories(db, skip=0, limit=1, sub_category_id=sub_category_id)[0]

@router.post("/subcategories", response_model=SubCategoryBase, dependencies=[Depends(check_admin)])
def create_new_subcategory(subcategory: SubCategoryBase, db: Session = Depends(get_db)):
    return create_subcategory(db, subcategory)

@router.delete("/subcategories/{sub_category_id}", dependencies=[Depends(check_admin)])
def delete_subcategory_info(sub_category_id: int, db: Session = Depends(get_db)):
    delete_subcategory(db, sub_category_id)
    return {"message": "SubCategory deleted successfully."}

@router.put("/subcategories/{sub_category_id}", response_model=SubCategoryBase, dependencies=[Depends(check_admin)])
def update_subcategory_info(sub_category_id: int, subcategory: SubCategoryBase, db: Session = Depends(get_db)):
    updated_subcategory = update_subcategory(db, sub_category_id, subcategory)
    if updated_subcategory is None:
        raise HTTPException(status_code=404, detail="SubCategory not found")
    return updated_subcategory  


# Analytics Route

# Schema (like TypeScript interface)
class AnalyticEcommerceItem(BaseModel):
    title: str
    amount: str
    background: str
    border: str
    icon: str
    percentage: str
    color: str
    number: str


# API Endpoint
@router.get("/analytics", response_model=List[AnalyticEcommerceItem], dependencies=[Depends(check_admin)])
def get_analytics(db: Session = Depends(get_db)):
    analytics_data = []
    getViews = getViewsAnalytics(db)
    getUsers = getUsersAnalytics(db)
    getOrders = getOrdersAnalytics(db)
    getSales = getSalesAnalytics(db)
    analytics_data.append(getViews)
    analytics_data.append(getUsers)
    analytics_data.append(getOrders)
    analytics_data.append(getSales)
    return analytics_data

# Recent Orders
@router.get("/analytics/recent-orders", response_model=List[OrderBase], dependencies=[Depends(check_admin)])
def get_recent_orders(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_orders(db, skip=skip, limit=limit)

@router.get("/analytics/weekly-income", response_model=dict, dependencies=[Depends(check_admin)])
def weekly_income(db: Session = Depends(get_db)):
    return getWeeklyIncome(db)

@router.get("/analytics/monthly-status", response_model=dict, dependencies=[Depends(check_admin)])
def get_monthly_status(db: Session = Depends(get_db)):
    return getMonthlyStatus(db)

@router.get("/analytics/this-year-sales", response_model=dict, dependencies=[Depends(check_admin)])
def get_this_year_sales(db: Session = Depends(get_db)):
    return {"thisYearSales": get_This_year_sales_crud(db)}

@router.get("/analytics/top-products")
def get_top_products(
    period: str = Query("week", enum=["week", "month"]),
    db: Session = Depends(get_db)
):
    return get_top_products_crud(period=period, db=db)

@router.get("/public-stats", response_model=PublicStats)
def get_public_stats_endpoint(db: Session = Depends(get_db)):
    return get_public_stats(db)
