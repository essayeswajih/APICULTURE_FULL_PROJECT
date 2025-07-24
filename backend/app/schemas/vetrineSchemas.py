from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Base Schemas

class ProductBase(BaseModel):
    id: Optional[int] = None
    name: str
    description: Optional[str] = None
    price: float
    stock_quantity: int
    category_id: int
    discounted_price: Optional[float] = None
    image_url: Optional[str] = None  # Optional image URL for the product
    image2_url: Optional[str] = None
    image3_url: Optional[str] = None
    image4_url: Optional[str] = None
    promo: Optional[bool] = False  # Indicates if the product is on promotion
    buzzent: Optional[str] = None  # Optional field for buzz or marketing text

    class Config:
        from_attributes = True

class ProductResponse(ProductBase):
    id: int
    discounted_price: Optional[float] = None

    class Config:
        from_attributes = True

class CategoryBase(BaseModel):
    id: Optional[int] = None 
    name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True
class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int

    class Config:
        from_attributes = True

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int
    price: float
    name: Optional[str] = None 

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    id: int
    total_amount: float
    status: str
    created_at: datetime
    username: str
    email: str
    telephone: str
    location: str
    payment_method: str
    payed : str
    code: str
    items: List[OrderItemBase]
    class Config:
        from_attributes = True  # This tells Pydantic to treat the SQLAlchemy models as dict-like

class CartItemBase(BaseModel):
    product_id: int
    quantity: int

    class Config:
        from_attributes = True

# Order Related Schemas
class OrderCreate(BaseModel):
    items: List[OrderItemBase]
    username: str
    email: str
    telephone: str
    location: str
    payment_method: str
    
    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: str
    created_at: datetime
    username: str
    email: str
    telephone: str
    location: str
    payment_method: str
    payed : str
    code: str
    items: List[OrderItemBase]

    class Config:
        from_attributes = True

class OrderItemResponse(BaseModel):
    id: int
    order_id: int
    product_id: int
    quantity: int
    price: float

    class Config:
        from_attributes = True

class CartItemResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int

    class Config:
        from_attributes = True
        
class OrederStatus(BaseModel):
    status: str

    class Config:
        from_attributes = True
        