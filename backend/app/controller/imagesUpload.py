

import os
import shutil
from fastapi import APIRouter


router = APIRouter()

from fastapi import UploadFile, File
from fastapi.responses import JSONResponse

UPLOAD_DIR = "uploads/"
BASE_URL = "https://apiculturegalai.tn/api"  # Or your domain name

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    public_url = f"{BASE_URL}/uploads/{file.filename}"
    return JSONResponse(content={
        "filename": file.filename,
        "url": public_url
    })

@router.get("/images")
def list_uploaded_images():
    try:
        files = os.listdir(UPLOAD_DIR)
        image_files = [
            f"{BASE_URL}/uploads/{filename}"
            for filename in files
            if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))
        ]
        return JSONResponse(content={"images": image_files})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})