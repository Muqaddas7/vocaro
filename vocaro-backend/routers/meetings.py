from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from models.database import get_db, Meeting
import uuid
import os

router = APIRouter(prefix="/meetings", tags=["Meetings"])

# Sabhi meetings get karo
@router.get("/")
def get_meetings(db: Session = Depends(get_db)):
    meetings = db.query(Meeting).order_by(Meeting.created_at.desc()).all()
    return {"meetings": meetings}

# Ek meeting get karo
@router.get("/{meeting_id}")
def get_meeting(meeting_id: str, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return meeting

# Nai meeting banao
@router.post("/create")
def create_meeting(title: str = "New Meeting", db: Session = Depends(get_db)):
    meeting = Meeting(
        id=str(uuid.uuid4()),
        title=title
    )
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    return {"message": "Meeting created!", "meeting": meeting}

# Meeting delete karo
@router.delete("/{meeting_id}")
def delete_meeting(meeting_id: str, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    db.delete(meeting)
    db.commit()
    return {"message": "Meeting deleted!"}