from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from controller.Oauth2C import get_current_user
from db.database import get_db
from models.vetrineModels import Product, Order, OrderItem, CartItem, Category
from models.Oauth2Models import User
from schemas.vetrineSchemas import CategoryBase, OrederStatus, ProductBase, OrderCreate, CartItemBase, OrderItemBase, OrderBase
from crud.vetrineCrud import (
    create_category, delete_category, delete_product, get_categories, get_category_by_id,
    get_products, get_product_by_id, create_product, get_orders, create_order,
    get_cart_items, add_to_cart, remove_from_cart, update_category, update_product
)

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
    limit: int = 100,
    category: Optional[str] = None,
    max_price: Optional[float] = None,
    sortBy: Optional[str] = 'popularite',  # Default sortBy value
    db: Session = Depends(get_db)
):
    return get_products(
        db,
        skip=skip,
        limit=limit,
        category_name=category,
        max_price=max_price,
        sortBy=sortBy
    )

# Route to get a single product by ID
@router.get("/products/{product_id}", response_model=ProductBase)
def get_product(product_id: int, db: Session = Depends(get_db)):
    db_product = get_product_by_id(db, product_id)
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
def get_all_categories(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
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
    skip: int = 0, limit: int = 10, 
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    return get_orders(db,skip=skip, limit=limit)

# Route to create an order
@router.post("/orders", response_model=OrderBase)
def create_new_order(
    order_create: OrderCreate, db: Session = Depends(get_db),
):
    if not order_create.items:
        raise HTTPException(status_code=400, detail="Order must contain items.")
    
    # Validate that the quantity is positive
    if any(item.quantity <= 0 for item in order_create.items):
        raise HTTPException(status_code=400, detail="Quantity must be a positive number.")
    
    # Calculate total amount
    total_amount = sum(item.price * item.quantity for item in order_create.items)
    
    return create_order(db,order_create=order_create, total_amount=total_amount)
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
    
    # Ensure there's enough stock
    if product.stock_quantity < cart_item.quantity:
        raise HTTPException(status_code=400, detail="Not enough stock for this product.")
    
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