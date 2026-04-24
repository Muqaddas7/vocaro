from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.database import create_tables
from routers import meetings

# App banao
app = FastAPI(
    title="Vocaro API",
    description="AI Meeting Intelligence Platform",
    version="1.0.0"
)

# Frontend se baat karne ki permission
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database tables banao
create_tables()

# Routers add karo
app.include_router(meetings.router)

# Pehla endpoint
@app.get("/")
def root():
    return {
        "message": "Welcome to Vocaro API! 🎙️",
        "status": "running"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app": "Vocaro"
    }