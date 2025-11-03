import os
import shutil
from fastapi import APIRouter, Depends, UploadFile, File
from fastapi.responses import JSONResponse

from controller.Oauth2C import get_current_user
from models.Oauth2Models import User

router = APIRouter()

# ✅ Use absolute path to match Docker volume
UPLOAD_DIR = "/uploads"
BASE_STATIC_URL = "https://api.apiculturegalai.tn/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_image(file: UploadFile = File(...), user: User = Depends(get_current_user)):
    filename = file.filename
    file_path = os.path.join(UPLOAD_DIR, filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        public_url = f"{BASE_STATIC_URL}/{filename}"
        return JSONResponse(content={
            "filename": filename,
            "url": public_url
        })

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@router.get("/images")
def list_uploaded_images(user: User = Depends(get_current_user)):
    try:
        files = os.listdir(UPLOAD_DIR)
        image_files = [
            f"{BASE_STATIC_URL}/{filename}"
            for filename in files
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))
        ]
        return JSONResponse(content={"images": image_files})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
