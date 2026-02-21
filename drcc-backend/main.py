import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import engine, Base, get_connection
from routes.resume_docs import router as resume_router
from routes.registrationUser import router as registration_router
from routes.EmployerLogin import router as EmployerLogin_router
from routes.user_management import router as users_router
from routes.admin_registration import router as admin_router
from routes.admin_login import router as auth_router

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
app.include_router(EmployerLogin_router)
app.include_router(resume_router)
app.include_router(registration_router)
app.include_router(users_router)
app.include_router(admin_router)
app.include_router(auth_router)


@app.on_event("startup")
def create_tables():
    pass
    # Base.metadata.create_all(bind=engine)
    
    # conn = get_connection()
    # cursor = conn.cursor()
    # cursor.execute("""
    #     CREATE TABLE IF NOT EXISTS add_user (
    #         id SERIAL PRIMARY KEY,
    #         full_name VARCHAR(255) NOT NULL,
    #         email VARCHAR(255) UNIQUE NOT NULL,
    #         role VARCHAR(50) NOT NULL DEFAULT 'User',
    #         status VARCHAR(20) NOT NULL DEFAULT 'Active',
    #         created_at TIMESTAMP NOT NULL DEFAULT NOW()
    #     );
    # """)
    # conn.commit()
    # cursor.close()
    # conn.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
