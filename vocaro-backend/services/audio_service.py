import whisper
import os
import tempfile

# Whisper model load karo (pehli baar download hoga)
model = None

def get_model():
    global model
    if model is None:
        print("🎙️ Whisper model load ho raha hai...")
        model = whisper.load_model("base")
        print("✅ Whisper ready!")
    return model

def transcribe_audio(file_path: str) -> dict:
    """Audio file ko text mein convert karo"""
    try:
        m = get_model()
        print(f"🎵 Transcribing: {file_path}")
        result = m.transcribe(file_path)
        return {
            "success": True,
            "transcript": result["text"],
            "language": result.get("language", "unknown")
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "transcript": ""
        }