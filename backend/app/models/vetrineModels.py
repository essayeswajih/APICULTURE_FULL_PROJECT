from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Enum, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from enum import Enum as PyEnum

from db.database import Base

# Enums for order status
class OrderStatus(str, PyEnum):
    PENDING = "pending"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"

# Product Model
class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True) 
    price = Column(Float, nullable=False)
    stock_quantity = Column(Integer, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"))
    discounted_price = Column(Float, nullable=True)
    image_url = Column(Text, nullable=True)  # Optional image URL for the product
    image2_url = Column(Text, nullable=True)
    image3_url = Column(Text, nullable=True)
    image4_url = Column(Text, nullable=True)
    promo = Column(Boolean, default=False)  # Indicates if the product is on promotion
    buzzent = Column(Text, nullable=True)  # Optional field for buzz or marketing text
    rating = Column(Float, nullable=True)  # Optional field for product rating
    num_ratings = Column(Integer, nullable=True)  # Optional field for number of ratings
    slug = Column(String, nullable=True)
    category = relationship("Category", back_populates="products")
    order_items = relationship("OrderItem", back_populates="product")
    shipping_cost = Column(Float, nullable=True, default=9)  # Optional field for shipping cost
    orders = relationship(
        "Order",
        secondary="order_items",
        back_populates="products",
        overlaps="order_items,items"
    )

# Category Model
class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(String)
    image_url = Column(Text, nullable=True)

    products = relationship("Product", back_populates="category")

# OrderItem Model (Intermediary between Order and Product)
class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)  # Store the price at the time of purchase
    name = Column(String, nullable=True)  # Optional field for product name
    order = relationship("Order", back_populates="items")
    product = relationship("Product", back_populates="order_items")
    shipping_cost = Column(Float, nullable=True)  # Optional field for shipping cost of this item

# Order Model
class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)

    total_amount = Column(Float, nullable=False)
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)
    created_at = Column(DateTime, default=datetime.now)

    username = Column(String,nullable=False)
    email = Column(String, nullable=False)
    telephone = Column(String, nullable=False)
    location = Column(String, nullable=False)
    payment_method = Column(String, nullable=False)
    payed = Column(String, default="false")
    code = Column(String, nullable=False)

    items = relationship("OrderItem", back_populates="order")
    products = relationship(
        "Product",
        secondary="order_items",
        back_populates="orders",
        overlaps="items,order"
    )


# CartItem Model
class CartItem(Base):
    __tablename__ = "cart_items"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, nullable=False)

class Story(Base):
    __tablename__ = "stories"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    platform = Column(String, nullable=False)  # e.g., "Instagram", "Facebook", etc.
    url = Column(Text, nullable=False)
    thumbnail = Column(Text, nullable=True)  # Optional image URL for the story
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
    periority = Column(Integer, nullable=True)  # Optional field for story priority or order