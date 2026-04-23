from pydantic import BaseModel

from app.schemas.shared import ChatMessageSchema, NpcMemorySchema, NpcSchema, WorldEventSchema


class CampaignStateMemorySchema(BaseModel):
    campaignId: str
    locationId: str
    locationName: str
    region: str
    journal: list[str]
    hiddenQuests: list[str]


class GMContextBundleSchema(BaseModel):
    campaignState: CampaignStateMemorySchema
    recentMessages: list[ChatMessageSchema]
    currentJournal: list[str]
    currentWorldEvents: list[WorldEventSchema]
    npcInFocus: NpcSchema
    relevantNpcMemory: NpcMemorySchema | None = None
