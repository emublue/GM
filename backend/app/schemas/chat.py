from typing import Optional

from pydantic import BaseModel

from app.schemas.session import SessionScreenResponseSchema


class ChatRequestSchema(BaseModel):
    campaignId: str
    playerInput: str
    selectedAction: Optional[str] = None


class ChatResponseSchema(BaseModel):
    screen: SessionScreenResponseSchema