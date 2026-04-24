from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.database import get_db, Meeting
from services.ai_service import generate_summary
import uuid

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

# AI Summary generate karo
@router.post("/{meeting_id}/summarize")
def summarize_meeting(meeting_id: str, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    if not meeting.transcript:
        raise HTTPException(status_code=400, detail="Pehle audio upload karo!")

    # AI se summary lo
    result = generate_summary(meeting.transcript)

    if not result["success"]:
        raise HTTPException(status_code=500, detail=result["error"])

    import json
    data = result["data"]

    # Database mein save karo
    meeting.summary = data.get("summary", "")
    meeting.action_items = json.dumps(data.get("action_items", []))
    db.commit()
    db.refresh(meeting)

    return {
        "message": "✅ Summary ready!",
        "meeting_id": meeting_id,
        "summary": data.get("summary"),
        "action_items": data.get("action_items"),
        "decisions": data.get("decisions"),
        "key_topics": data.get("key_topics")
    }

# Meeting delete karo
@router.delete("/{meeting_id}")
def delete_meeting(meeting_id: str, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    db.delete(meeting)
    db.commit()
    return {"message": "Meeting deleted!"}