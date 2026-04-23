from pydantic import BaseModel

from app.schemas.shared import (
    ActiveQuestSchema,
    CampaignSchema,
    ChatMessageSchema,
    DateDisplaySchema,
    MythosCharacterSchema,
    MythosLocationSchema,
    NavItemSchema,
    NpcSchema,
    PlayerProfileSchema,
    QuickActionSchema,
    RelationshipEdgeSchema,
    RelationshipNodeSchema,
    WorldEventSchema,
    WorldOverviewStatSchema,
)


class TopbarDataSchema(BaseModel):
    campaign: CampaignSchema
    playerProfile: PlayerProfileSchema
    dateDisplay: DateDisplaySchema


class SidebarDataSchema(BaseModel):
    navItems: list[NavItemSchema]
    worldOverview: list[WorldOverviewStatSchema]


class ChatPanelDataSchema(BaseModel):
    messages: list[ChatMessageSchema]
    quickActions: list[QuickActionSchema]


class RelationshipGraphDataSchema(BaseModel):
    nodes: list[RelationshipNodeSchema]
    edges: list[RelationshipEdgeSchema]


class InfoPanelsDataSchema(BaseModel):
    activeQuest: ActiveQuestSchema
    location: MythosLocationSchema
    npcInFocus: NpcSchema
    recentEvents: list[WorldEventSchema]
    relationships: RelationshipGraphDataSchema


class SessionScreenResponseSchema(BaseModel):
    topbar: TopbarDataSchema
    sidebar: SidebarDataSchema
    chat: ChatPanelDataSchema
    characterSheet: MythosCharacterSchema
    infoPanels: InfoPanelsDataSchema