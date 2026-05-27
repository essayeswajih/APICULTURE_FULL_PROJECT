import os
import shutil
from urllib.parse import quote
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from controller.Oauth2C import get_current_user
from models.Oauth2Models import User

router = APIRouter()

# ✅ Use absolute path to match Docker volume
UPLOAD_DIR = "/uploads"
BASE_STATIC_URL = "https://api.apiculturegalai.tn/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

IMAGE_EXTENSIONS = ('.png', '.jpg', '.jpeg', '.gif', '.webp')


class RenameImageRequest(BaseModel):
    filename: str


def safe_image_filename(filename: str) -> str:
    stripped_name = filename.strip()
    clean_name = os.path.basename(stripped_name)
    if "/" in stripped_name or "\\" in stripped_name:
        raise HTTPException(status_code=400, detail="Invalid filename")
    if not clean_name or clean_name in (".", "..") or clean_name != stripped_name:
        raise HTTPException(status_code=400, detail="Invalid filename")
    if not clean_name.lower().endswith(IMAGE_EXTENSIONS):
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    return clean_name


def image_url(filename: str) -> str:
    return f"{BASE_STATIC_URL}/{quote(filename)}"


@router.post("/upload")
async def upload_image(file: UploadFile = File(...), user: User = Depends(get_current_user)):
    filename = safe_image_filename(file.filename)
    file_path = os.path.join(UPLOAD_DIR, filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return JSONResponse(content={
            "filename": filename,
            "url": image_url(filename)
        })

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@router.get("/images")
def list_uploaded_images(user: User = Depends(get_current_user)):
    try:
        files = os.listdir(UPLOAD_DIR)
        image_files = [
            image_url(filename)
            for filename in files
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))
        ]
        return JSONResponse(content={"images": image_files})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


@router.put("/images/{filename}")
def rename_uploaded_image(filename: str, payload: RenameImageRequest, user: User = Depends(get_current_user)):
    current_filename = safe_image_filename(filename)
    new_filename = safe_image_filename(payload.filename)
    current_path = os.path.join(UPLOAD_DIR, current_filename)
    new_path = os.path.join(UPLOAD_DIR, new_filename)

    if not os.path.exists(current_path):
        raise HTTPException(status_code=404, detail="Image not found")
    if os.path.exists(new_path):
        raise HTTPException(status_code=409, detail="An image with this name already exists")

    os.rename(current_path, new_path)
    return JSONResponse(content={
        "filename": new_filename,
        "url": image_url(new_filename)
    })


@router.delete("/images/{filename}")
def delete_uploaded_image(filename: str, user: User = Depends(get_current_user)):
    clean_filename = safe_image_filename(filename)
    file_path = os.path.join(UPLOAD_DIR, clean_filename)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Image not found")

    os.remove(file_path)
    return JSONResponse(content={"message": "Image deleted successfully"})
