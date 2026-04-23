from datetime import datetime
from uuid import uuid4

from app.core.database import get_database
from app.repositories.campaign_repository import CampaignRepository
from app.schemas.session import SessionScreenResponseSchema


def format_chat_time() -> str:
    return datetime.now().strftime("%I:%M %p").lstrip("0")


def generate_runtime_id(prefix: str) -> str:
    return f"{prefix}-{uuid4().hex}"


def build_session_screen_response(campaign_id: str) -> SessionScreenResponseSchema | None:
    repository = CampaignRepository(get_database())
    return repository.get_session_screen(campaign_id)
