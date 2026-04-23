from fastapi import APIRouter, HTTPException

from app.schemas.session import SessionScreenResponseSchema
from app.services.session_service import build_session_screen_response

router = APIRouter(prefix="/ui", tags=["ui"])


@router.get("/session/{campaign_id}", response_model=SessionScreenResponseSchema)
def get_session_screen(campaign_id: str) -> SessionScreenResponseSchema:
    screen = build_session_screen_response(campaign_id)

    if screen is None:
        raise HTTPException(status_code=404, detail="Campaign not found")

    return screen