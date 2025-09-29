from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post('/api/chat')
async def chat(request: Request):
    data = await request.json()
    query = data.get('query', '')
    # Dummy Q&A response
    answer = f"You asked: {query}. This is a dummy answer."
    return JSONResponse({'answer': answer})
