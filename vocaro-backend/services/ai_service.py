from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_summary(transcript: str) -> dict:
    """Transcript se summary aur action items banao"""
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": """You are an expert meeting assistant.
                    Analyze the meeting transcript and provide:
                    1. A concise summary (3-5 sentences)
                    2. Key action items with owner names if mentioned
                    3. Important decisions made
                    Format as JSON."""
                },
                {
                    "role": "user",
                    "content": f"""Analyze this meeting transcript:
                    
{transcript}

Return JSON with this structure:
{{
    "summary": "brief summary here",
    "action_items": ["action 1", "action 2"],
    "decisions": ["decision 1", "decision 2"],
    "key_topics": ["topic 1", "topic 2"]
}}"""
                }
            ],
            response_format={"type": "json_object"}
        )

        import json
        result = json.loads(response.choices[0].message.content)
        return {"success": True, "data": result}

    except Exception as e:
        return {"success": False, "error": str(e)}