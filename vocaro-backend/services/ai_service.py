from groq import Groq
import os
import json
import traceback
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def generate_summary(transcript: str) -> dict:
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert meeting assistant. Analyze the meeting transcript and return ONLY a JSON object with keys: summary, action_items (array), decisions (array), key_topics (array). No other text, no markdown."
                },
                {
                    "role": "user",
                    "content": f"Analyze this transcript: {transcript}"
                }
            ],
            max_tokens=1000
        )

        text = response.choices[0].message.content.strip()

        if "```" in text:
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]

        result = json.loads(text)
        return {"success": True, "data": result}

    except Exception as e:
        print(traceback.format_exc())
        return {"success": False, "error": str(e)}