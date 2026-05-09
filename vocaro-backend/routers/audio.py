from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from models.database import get_db, Meeting
from services.audio_service import transcribe_audio
import tempfile
import os

router = APIRouter(prefix="/audio", tags=["Audio"])

@router.post("/upload/{meeting_id}")
async def upload_audio(
    meeting_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    filename = file.filename or ""
    ext = os.path.splitext(filename)[1].lower()
    allowed_extensions = ['.mp3', '.wav', '.mp4', '.m4a', '.webm', '.ogg', '.flac', '.opus', '.3gp', '.aac']

    if ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported format: {ext}"
        )

    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        content = await file.read()
        tmp.write(content)
        tmp_path = tmp.name

    try:
        result = transcribe_audio(tmp_path)

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        meeting.transcript = result["transcript"]
        db.commit()
        db.refresh(meeting)

        return {
            "message": "Audio transcribed successfully",
            "meeting_id": meeting_id,
            "transcript": result["transcript"],
            "language": result["language"]
        }
    finally:
        os.unlink(tmp_path)