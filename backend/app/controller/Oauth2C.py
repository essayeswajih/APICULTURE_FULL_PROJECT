from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from models.Oauth2Models import User as UserInDB, UserSchema, Token
from db.database import get_db
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY", "V0hxRkBhamoyODc0NDV4NDg1MXNxQGRqcWQxampqSDA3RDJmZmZxZHNxZHFzbSptKvlnO3V6cw==")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user(db: Session, username: str):
    return db.query(UserInDB).filter(UserInDB.username == username).first()

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    print(f"Login request for username: {form_data.username}")  # Debug log
    try:
        user = get_user(db, form_data.username)
        if not user or not verify_password(form_data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
                headers={"WWW-Authenticate": "Bearer", "Access-Control-Allow-Origin": "*"},
            )
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        print(f"Error in /auth/token: {str(e)}")  # Debug log
        raise HTTPException(
            status_code=500,
            detail=str(e),
            headers={"Access-Control-Allow-Origin": "*"}
        )

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer", "Access-Control-Allow-Origin": "*"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        user = db.query(UserInDB).filter(UserInDB.username == username).first()
        if user is None:
            raise credentials_exception
        return user
    except JWTError:
        raise credentials_exception

@router.get("/users/me", response_model=UserSchema)
async def read_users_me(current_user: UserInDB = Depends(get_current_user)):
    return current_user