from pydantic import BaseModel, field_validator
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
    subcategory_id: Optional[int] = None
    discounted_price: Optional[float] = None
    vip_price: Optional[float] = None
    image_url: Optional[str] = None  # Optional image URL for the product
    image2_url: Optional[str] = None
    image3_url: Optional[str] = None
    image4_url: Optional[str] = None
    promo: Optional[bool] = False  # Indicates if the product is on promotion
    buzzent: Optional[str] = None  # Optional field for buzz or marketing text
    rating: Optional[float] = None  # Average rating of the product
    num_ratings: Optional[int] = None  # Number of ratings for the product
    slug: Optional[str] = None  # Optional slug for the product
    shipping_cost: Optional[float] = 9.0  # Optional field for shipping cost
    class Config:
        from_attributes = True

class ProductResponse(ProductBase):
    id: int
    discounted_price: Optional[float] = None
    vip_price: Optional[float] = None

    class Config:
        from_attributes = True
class SubCategoryBase(BaseModel):
    id: Optional[int] = None 
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    link: Optional[str] = None
    category_id: int

    class Config:
        from_attributes = True

class SubCategoryCreate(SubCategoryBase):
    pass
class SubCategoryUpdate(SubCategoryBase):
    pass

class CategoryBase(BaseModel):
    id: Optional[int] = None 
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    subcategories: list[SubCategoryBase] = []

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
    public_price: Optional[float] = None
    vip_applied: Optional[bool] = False
    name: Optional[str] = None 
    shipping_cost: Optional[float] = 9.0

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
    vip_code: Optional[str] = None
    items: List[OrderItemBase]
    class Config:
        from_attributes = True  # This tells Pydantic to treat the SQLAlchemy models as dict-like

class CartItemBase(BaseModel):
    product_id: int
    quantity: int
    shipping_cost: Optional[float] = 9.0

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
    vip_code: Optional[str] = None
    
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
    vip_code: Optional[str] = None
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
        
class StoryBase(BaseModel):
    id: Optional[int] = None
    title: str
    platform : str  # e.g., "Instagram", "Facebook", etc.
    url : str
    thumbnail : str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    periority : int
    class Config:
        from_attributes = True
        # Convert empty string to None
    @field_validator('created_at', 'updated_at', mode='before')
    @classmethod
    def parse_empty_datetime(cls, v):
        if v == '' or v is None:
            return None
        return v
    
class PublicStats(BaseModel):
    product_count: int
    happy_customers: int
    store_locations: int

class LayoutImageBase(BaseModel):
    key: str
    label: str
    image_url: str
    kind: str = "background"

    class Config:
        from_attributes = True

class LayoutImageUpdate(BaseModel):
    image_url: str

class LayoutImageResponse(LayoutImageBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class PromoCountdownBase(BaseModel):
    title: str = "Promo products end soon"
    subtitle: Optional[str] = None
    ends_at: Optional[datetime] = None
    active: bool = False

    class Config:
        from_attributes = True

class PromoCountdownUpdate(PromoCountdownBase):
    pass

class PromoCountdownResponse(PromoCountdownBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class VipCardBase(BaseModel):
    id: Optional[int] = None
    customer_key: str
    customer_name: str
    email: Optional[str] = None
    telephone: Optional[str] = None
    code: str
    approved: bool
    issued_at: datetime
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class VipCardApprove(BaseModel):
    customer_key: str
    customer_name: str
    email: Optional[str] = None
    telephone: Optional[str] = None

class VipCardValidation(BaseModel):
    valid: bool
    message: str
    card: Optional[VipCardBase] = None

class CartPricingInputItem(BaseModel):
    product_id: int
    quantity: int

class CartPricingRequest(BaseModel):
    vip_code: Optional[str] = None
    items: List[CartPricingInputItem]

class CartPricingItem(BaseModel):
    product_id: int
    name: str
    quantity: int
    regular_price: float
    public_price: float
    vip_price: Optional[float] = None
    final_price: float
    vip_applied: bool
    shipping_cost: float
    line_total: float

class CartPricingResponse(BaseModel):
    valid_vip: bool
    vip_code: Optional[str] = None
    message: str
    has_vip_savings: bool
    subtotal: float
    shipping: float
    total: float
    items: List[CartPricingItem]
