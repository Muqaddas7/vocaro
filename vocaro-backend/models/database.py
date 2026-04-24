from sqlalchemy import create_engine, Column, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import uuid
import os
from dotenv import load_dotenv

load_dotenv()

# Database connection
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./vocaro.db")

engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Meeting table — har meeting ka data yahan save hoga
class Meeting(Base):
    __tablename__ = "meetings"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, default="Untitled Meeting")
    transcript = Column(Text, nullable=True)      # Audio ka text
    summary = Column(Text, nullable=True)          # AI summary
    action_items = Column(Text, nullable=True)     # Action items
    duration = Column(String, nullable=True)       # Meeting duration
    created_at = Column(DateTime, default=datetime.utcnow)

# Database tables banao
def create_tables():
    Base.metadata.create_all(bind=engine)

# Database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()