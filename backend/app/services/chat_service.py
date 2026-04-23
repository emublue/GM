from app.core.database import get_database
from app.repositories.campaign_repository import CampaignRepository
from app.schemas.chat import ChatRequestSchema
from app.schemas.session import SessionScreenResponseSchema
from app.schemas.shared import (
    GMChatMessageSchema,
    NpcMemorySchema,
    PlayerChatMessageSchema,
    WorldEventSchema,
)
from app.services.session_service import format_chat_time, generate_runtime_id


def handle_chat_turn(request: ChatRequestSchema) -> SessionScreenResponseSchema | None:
    repository = CampaignRepository(get_database())
    interaction_summary = "Aric pressed Aereth for answers while the warehouse fire raged nearby."

    player_message = PlayerChatMessageSchema(
        id=generate_runtime_id("msg"),
        role="player",
        time=format_chat_time(),
        lines=[request.playerInput],
    )

    gm_lines = [
        "Aereth narrows his eyes as the fire crackles behind him.",
        "For a moment, he says nothing, as if weighing how much to reveal.",
    ]

    if request.selectedAction == "Persuade":
        gm_lines.append(
            "\"If you truly want answers,\" he says quietly, \"then help me keep the crowd back first.\""
        )
    else:
        gm_lines.append(
            "\"Not here,\" he says. \"Too many ears, and too much smoke. Come with me.\""
        )

    gm_message = GMChatMessageSchema(
        id=generate_runtime_id("msg"),
        role="gm",
        time=format_chat_time(),
        lines=gm_lines,
        emphasis="The warehouse groans as another beam collapses into the flames.",
    )

    repository.upsert_npc_memory(
        request.campaignId,
        NpcMemorySchema(
            npcId="npc-aereth",
            name="Aereth",
            title="Captain of the Valemoor Guard",
            currentDisposition="ally",
            summary="A disciplined guard captain balancing duty, public order, and politically dangerous information about the fire.",
            tags=["Ally", "Trustworthy", "Duty-Bound"],
            lastNotableInteraction=interaction_summary,
        ),
    )

    return repository.append_chat_turn(
        request.campaignId,
        messages=[player_message.model_dump(), gm_message.model_dump()],
        recent_event=WorldEventSchema(
            id=generate_runtime_id("evt"),
            time="just now",
            text=interaction_summary,
        ),
    )
