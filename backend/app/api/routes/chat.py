from fastapi import APIRouter, HTTPException

from app.schemas.chat import ChatRequestSchema, ChatResponseSchema
from app.services.chat_service import handle_chat_turn

router = APIRouter(tags=["chat"])


@router.post("/chat", response_model=ChatResponseSchema)
def chat(request: ChatRequestSchema) -> ChatResponseSchema:
    screen = handle_chat_turn(request)

    if screen is None:
        raise HTTPException(status_code=404, detail="Campaign not found")

    return ChatResponseSchema(screen=screen)