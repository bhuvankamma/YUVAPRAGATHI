import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import engine, Base, get_connection
# from routes.user_profile import router as profile_router
from routes.resume_docs import router as resume_router
from routes.registrationUser import router as registration_router
from routes.user_management import router as users_router
from routes.admin_registration import router as admin_router

app = FastAPI()

# CORS Configuration
ALLOWED_ORIGINS = [
    "https://www.yuvasaathi.in",
    "http://localhost:3000",
    "https://www.yuvasaathiadmin.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Upload Directory
UPLOAD_DIR = Path(__file__).resolve().parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

# Include Routers
# app.include_router(profile_router)
app.include_router(resume_router)
app.include_router(registration_router)
app.include_router(users_router)
app.include_router(admin_router)


@app.on_event("startup")
def create_tables():
    Base.metadata.create_all(bind=engine)
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS add_user (
            id SERIAL PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            role VARCHAR(50) NOT NULL DEFAULT 'User',
            status VARCHAR(20) NOT NULL DEFAULT 'Active',
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
    """)
    conn.commit()
    cursor.close()
    conn.close()
