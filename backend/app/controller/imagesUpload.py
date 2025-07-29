import os
import shutil
import re
import unicodedata
from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse

router = APIRouter()

UPLOAD_DIR = "uploads/"
BASE_STATIC_URL = "https://apiculturegalai.tn/uploads"  # ✅ DO NOT use /api here
ge_tUrl = "https://apiculturegalai.tn/api/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    filename = file.filename
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    public_url = f"{BASE_STATIC_URL}/{filename}"  # ✅ Correct image URL
    return JSONResponse(content={
        "filename": filename,
        "url": public_url
    })

@router.get("/images")
def list_uploaded_images():
    try:
        files = os.listdir(UPLOAD_DIR)
        image_files = [
            f"{ge_tUrl}/{filename}"
            for filename in files
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))
        ]
        return JSONResponse(content={"images": image_files})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})