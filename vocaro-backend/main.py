from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.database import create_tables
from routers import meetings
from routers import audio

app = FastAPI(
    title="Vocaro API",
    description="AI Meeting Intelligence Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()

app.include_router(meetings.router)
app.include_router(audio.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to Vocaro API!",
        "status": "running"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app": "Vocaro"
    }