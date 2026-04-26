import whisper
import os
import traceback

model = None

def get_model():
    global model
    if model is None:
        print("🎙️ Whisper model load ho raha hai...")
        model = whisper.load_model("base")
        print("✅ Whisper ready!")
    return model

def transcribe_audio(file_path: str) -> dict:
    try:
        m = get_model()
        print(f"🎵 Transcribing: {file_path}")
        result = m.transcribe(file_path, fp16=False)
        transcript = str(result.get("text", "")).strip()
        language = str(result.get("language", "unknown"))
        print(f"✅ Transcript: {transcript[:50]}")
        return {
            "success": True,
            "transcript": transcript,
            "language": language
        }
    except Exception as e:
        print(f"❌ FULL ERROR: {traceback.format_exc()}")
        return {
            "success": False,
            "error": str(e),
            "transcript": ""
        }