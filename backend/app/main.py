from fastapi import FastAPI, Response, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware
from slowapi.errors import RateLimitExceeded
from db.database import Base, engine, get_db
from controller.Oauth2C import router as Oauth2CRouter
from controller.vetineController import router as VetrineRouter
from controller.imagesUpload import router as ImagesUploadRouter

# Initialize the rate limiter
from config.limiter_config import limiter

app = FastAPI()
Base.metadata.create_all(bind=engine)
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    print(f"Unhandled error: {str(exc)}")  # Log the error for debugging
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error": str(exc)},
        headers={"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true"},
    )
# Add rate limiting middleware
app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded,
    lambda request, exc: Response(content="Rate limit exceeded", status_code=429),
)
app.add_middleware(SlowAPIMiddleware)

# Include routers
app.include_router(Oauth2CRouter, prefix="/auth", tags=["Authentication"])
app.include_router(VetrineRouter, tags=["vetrine"])
app.include_router(ImagesUploadRouter, tags=["Images Upload"])

# Mount uploads (NOT under /api!)
app.mount("/uploads", StaticFiles(directory="/uploads"), name="uploads")

# Initialize database on startup
@app.on_event("startup")
def startup_event():
    #Base.metadata.drop_all(bind=engine)  # Drop all tables on startup (for development)
    Base.metadata.create_all(bind=engine)

@app.get("/")
@limiter.limit("5/minute")
def read_root(request: Request, db=Depends(get_db)):
    return {"message": "Not allowed here."}
