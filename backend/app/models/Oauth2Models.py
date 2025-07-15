from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from db.database import Base

# SQLAlchemy Model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)

# Pydantic Models
class UserSchema(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True  # Enable ORM mode for SQLAlchemy

class UserCreateSchema(BaseModel):
    username: str
    email: str
    password: str

class UserInDBSchema(UserSchema):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str