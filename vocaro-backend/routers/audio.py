from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from models.database import get_db, Meeting
from services.audio_service import transcribe_audio
import tempfile
import os
import uuid

router = APIRouter(prefix="/audio", tags=["Audio"])

# Audio upload endpoint
@router.post("/upload/{meeting_id}")
async def upload_audio(
    meeting_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Meeting check karo
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    # File format check karo
    allowed = ["audio/mpeg", "audio/wav", "audio/mp4", "audio/m4a", "audio/webm"]
    if file.content_type not in allowed:
        raise HTTPException(
            status_code=400,
            detail=f"Format supported nahi: {file.content_type}"
        )

    # Temp file mein save karo
    suffix = os.path.splitext(file.filename)[1]
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name

    try:
        # Whisper se transcribe karo
        result = transcribe_audio(tmp_path)

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        # Database mein save karo
        meeting.transcript = result["transcript"]
        db.commit()
        db.refresh(meeting)

        return {
            "message": "✅ Audio transcribed!",
            "meeting_id": meeting_id,
            "transcript": result["transcript"],
            "language": result["language"]
        }
    finally:
        # Temp file delete karo
        os.unlink(tmp_path)