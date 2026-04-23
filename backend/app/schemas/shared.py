from typing import Literal, Optional

from pydantic import BaseModel


TagTone = Literal["green", "blue", "violet", "amber"]
StatTone = Literal["green", "blue", "violet", "amber", "red"]
RelationshipDisposition = Literal["ally", "neutral", "wary"]
NavItemKey = Literal[
    "campaigns",
    "world",
    "characters",
    "locations",
    "factions",
    "quests",
    "events",
    "inventory",
    "timeline",
    "settings",
]
QuickActionKey = Literal[
    "attack",
    "persuade",
    "investigate",
    "search",
    "more-actions",
]
WorldOverviewStatKey = Literal[
    "faction-reputation",
    "world-tension",
    "session-turn",
]


class CampaignSchema(BaseModel):
    id: str
    title: str
    subtitle: str


class PlayerProfileSchema(BaseModel):
    id: str
    name: str
    roleLabel: str
    statusLabel: str


class DateDisplaySchema(BaseModel):
    fullDate: str
    phaseLabel: str
    timeLabel: str
    iconLabel: str


class AbilityScoreSchema(BaseModel):
    abbr: str
    score: int
    modifier: int


class CharacterTagSchema(BaseModel):
    label: str
    tone: TagTone


class AttackEntrySchema(BaseModel):
    id: str
    name: str
    bonus: str
    effect: str


class MythosCharacterSchema(BaseModel):
    id: str
    name: str
    level: int
    className: str
    ancestry: str
    background: str
    alignment: str
    experience: int
    passivePerception: int
    proficiencyBonus: int
    armorClass: int
    initiative: int
    speed: int
    hitPoints: dict
    hitDice: str
    deathSaves: dict
    tags: list[CharacterTagSchema]
    abilityScores: list[AbilityScoreSchema]
    savingThrows: list[str]
    skillProficiencies: list[str]
    attacks: list[AttackEntrySchema]
    features: list[str]
    languages: list[str]
    senses: list[str]
    equipment: list[str]


class GMChatMessageSchema(BaseModel):
    id: str
    role: Literal["gm"]
    time: str
    lines: list[str]
    emphasis: Optional[str] = None
    quote: Optional[str] = None


class PlayerChatMessageSchema(BaseModel):
    id: str
    role: Literal["player"]
    time: str
    lines: list[str]


ChatMessageSchema = GMChatMessageSchema | PlayerChatMessageSchema


class QuestStepSchema(BaseModel):
    id: str
    label: str
    done: bool


class ActiveQuestSchema(BaseModel):
    id: str
    title: str
    description: str
    currentStepCount: int
    totalStepCount: int
    steps: list[QuestStepSchema]


class MythosLocationSchema(BaseModel):
    id: str
    name: str
    region: str
    description: str


class NpcSchema(BaseModel):
    id: str
    name: str
    title: str
    disposition: RelationshipDisposition
    dispositionSegments: int
    tags: list[CharacterTagSchema]


class WorldEventSchema(BaseModel):
    id: str
    time: str
    text: str


class RelationshipNodeSchema(BaseModel):
    id: str
    name: str
    subtitle: str
    disposition: RelationshipDisposition


class RelationshipEdgeSchema(BaseModel):
    id: str
    fromId: str
    toId: str
    label: str
    disposition: RelationshipDisposition


class NavItemSchema(BaseModel):
    key: NavItemKey
    label: str
    active: bool = False


class QuickActionSchema(BaseModel):
    key: QuickActionKey
    label: str


class WorldOverviewStatSchema(BaseModel):
    key: WorldOverviewStatKey
    label: str
    value: str
    sublabel: str
    tone: StatTone
