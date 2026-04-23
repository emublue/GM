from pydantic import TypeAdapter

from app.core.database import get_database
from app.repositories.campaign_repository import CampaignRepository
from app.schemas.context import CampaignStateMemorySchema, GMContextBundleSchema
from app.schemas.shared import ChatMessageSchema, NpcMemorySchema, NpcSchema, WorldEventSchema

chat_message_adapter = TypeAdapter(ChatMessageSchema)


def get_current_campaign_state(campaign_id: str) -> CampaignStateMemorySchema | None:
    repository = CampaignRepository(get_database())
    context_bundle = repository.build_gm_context_bundle(campaign_id)
    if context_bundle is None:
        return None
    return context_bundle.campaignState


def get_recent_messages(campaign_id: str) -> list[ChatMessageSchema]:
    repository = CampaignRepository(get_database())
    return [
        chat_message_adapter.validate_python(message)
        for message in repository.get_recent_messages(campaign_id)
    ]


def get_current_journal(campaign_id: str) -> list[str]:
    repository = CampaignRepository(get_database())
    return [entry["text"] for entry in repository.get_current_journal(campaign_id)]


def get_current_world_events(campaign_id: str) -> list[WorldEventSchema]:
    repository = CampaignRepository(get_database())
    return [
        WorldEventSchema.model_validate(event)
        for event in repository.get_current_world_events(campaign_id)
    ]


def get_npc_in_focus(campaign_id: str) -> NpcSchema | None:
    repository = CampaignRepository(get_database())
    npc_in_focus = repository.get_npc_in_focus(campaign_id)
    if npc_in_focus is None:
        return None
    return NpcSchema.model_validate(npc_in_focus)


def get_relevant_npc_memory(
    campaign_id: str,
    npc_id: str | None = None,
) -> NpcMemorySchema | None:
    repository = CampaignRepository(get_database())
    return repository.get_relevant_npc_memory(campaign_id, npc_id)


def build_gm_context_bundle(
    campaign_id: str,
    npc_id: str | None = None,
) -> GMContextBundleSchema | None:
    repository = CampaignRepository(get_database())
    return repository.build_gm_context_bundle(campaign_id, npc_id)
