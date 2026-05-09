import whisper
import traceback

model = None

def get_model():
    global model
    if model is None:
        model = whisper.load_model("base")
    return model

def transcribe_audio(file_path: str) -> dict:
    try:
        m = get_model()
        result = m.transcribe(file_path, fp16=False)
        transcript = str(result.get("text", "")).strip()
        language = str(result.get("language", "unknown"))
        return {
            "success": True,
            "transcript": transcript,
            "language": language
        }
    except Exception as e:
        print(traceback.format_exc())
        return {
            "success": False,
            "error": str(e),
            "transcript": ""
        }