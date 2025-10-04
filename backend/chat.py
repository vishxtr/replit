
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
import requests

router = APIRouter()

# Updated Gemini API key
GEMINI_API_KEY = "AIzaSyCxT9FbWGDqjLN0mzSPuU6ImPb4jhQYOa"
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY

SYSTEM_PROMPT = (
    "You are Gemini, a helpful, friendly, and knowledgeable AI assistant. "
    "You can answer questions about software, technology, and general topics. "
    "If the user asks about you, explain you are an AI chatbot powered by Google's Gemini API. "
    "Always provide clear, concise, and accurate answers. "
    "If the user is confused, offer to clarify or provide examples. "
    "Be conversational and supportive."
)

def get_gemini_response(user_query: str) -> str:
    payload = {
        "contents": [
            {"parts": [
                {"text": SYSTEM_PROMPT + "\nUser: " + user_query}
            ]}
        ]
    }
    try:
        response = requests.post(GEMINI_API_URL, json=payload, timeout=15)
        if response.status_code == 200:
            data = response.json()
            # Gemini returns response in data['candidates'][0]['content']['parts'][0]['text']
            candidates = data.get("candidates", [])
            if candidates and "content" in candidates[0]:
                parts = candidates[0]["content"].get("parts", [])
                if parts and "text" in parts[0]:
                    return parts[0]["text"]
        return "Sorry, I couldn't get a response from Gemini."
    except Exception:
        return "Sorry, there was an error connecting to Gemini API."

@router.post('/api/chat')
async def chat(request: Request):
    try:
        data = await request.json()
        query = data.get('query', '')
        if not query:
            return JSONResponse({'answer': "I didn't receive a question. How can I help you?"})
        response = get_gemini_response(query)
        return JSONResponse({'answer': response})
    except Exception:
        return JSONResponse({'answer': "I'm sorry, but I encountered an error. Please try again."}, status_code=500)
