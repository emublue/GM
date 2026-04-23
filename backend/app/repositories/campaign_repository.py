from datetime import UTC, datetime, timedelta

from pymongo import DESCENDING
from pymongo.database import Database

from app.core.config import get_settings
from app.models.campaign_seed import (
    INITIAL_CAMPAIGN_ID,
    build_seed_character_sheet,
    build_seed_journal_entries,
    build_seed_npc_memories,
    build_seed_quests,
    build_seed_session_screen,
)
from app.schemas.context import CampaignStateMemorySchema, GMContextBundleSchema
from app.schemas.session import SessionScreenResponseSchema
from app.schemas.shared import NpcMemorySchema, WorldEventSchema

CHAT_HISTORY_LIMIT = 40
RECENT_EVENTS_LIMIT = 20


class CampaignRepository:
    def __init__(self, database: Database):
        settings = get_settings()
        self._campaigns = database[settings.campaigns_collection_name]
        self._chat_messages = database[settings.chat_messages_collection_name]
        self._world_events = database[settings.world_events_collection_name]
        self._npc_memories = database[settings.npc_memories_collection_name]

    def ensure_indexes(self) -> None:
        self._campaigns.create_index("campaignId", unique=True)
        self._chat_messages.create_index([("campaignId", 1), ("createdAt", -1)])
        self._chat_messages.create_index("id", unique=True)
        self._world_events.create_index([("campaignId", 1), ("createdAt", -1)])
        self._world_events.create_index("id", unique=True)
        self._npc_memories.create_index([("campaignId", 1), ("npcId", 1)], unique=True)

    def _backfill_existing_campaign(self, campaign_document: dict) -> None:
        campaign_id = campaign_document["campaignId"]
        update_fields: dict = {}

        if "quests" not in campaign_document:
            info_panels = campaign_document.get("infoPanels", {})
            if "activeQuest" in info_panels:
                update_fields["quests"] = [info_panels["activeQuest"]]
                update_fields["infoPanels"] = {
                    **{
                        key: value
                        for key, value in info_panels.items()
                        if key != "activeQuest"
                    },
                    "journal": [
                        entry.model_dump() for entry in build_seed_journal_entries()
                    ],
                }
            else:
                update_fields["quests"] = [quest.model_dump() for quest in build_seed_quests()]

        info_panels = update_fields.get("infoPanels", campaign_document.get("infoPanels", {}))
        if "journal" not in info_panels:
            update_fields["infoPanels"] = {
                **info_panels,
                "journal": [entry.model_dump() for entry in build_seed_journal_entries()],
            }

        focus_npc = info_panels.get("npcInFocus") or {}
        if "summary" not in focus_npc or "lastNotableInteraction" not in focus_npc:
            seed_focus_npc = build_seed_session_screen().infoPanels.npcInFocus.model_dump()
            update_fields["infoPanels"] = {
                **info_panels,
                "npcInFocus": {
                    **seed_focus_npc,
                    **focus_npc,
                    "summary": focus_npc.get("summary", seed_focus_npc["summary"]),
                    "lastNotableInteraction": focus_npc.get(
                        "lastNotableInteraction",
                        seed_focus_npc["lastNotableInteraction"],
                    ),
                },
            }

        if self._world_events.count_documents({"campaignId": campaign_id}, limit=1) == 0:
            existing_events = campaign_document.get("infoPanels", {}).get("recentEvents") or []
            if not existing_events:
                existing_events = [
                    event.model_dump() for event in build_seed_session_screen().infoPanels.recentEvents
                ]

            self._world_events.insert_many(
                [
                    {
                        **event,
                        "campaignId": campaign_id,
                        "createdAt": datetime.now(UTC) + timedelta(milliseconds=index),
                    }
                    for index, event in enumerate(existing_events)
                ]
            )

        if self._npc_memories.count_documents({"campaignId": campaign_id}, limit=1) == 0:
            self._npc_memories.insert_many(
                [
                    {
                        **memory.model_dump(),
                        "campaignId": campaign_id,
                        "updatedAt": datetime.now(UTC) + timedelta(milliseconds=index),
                    }
                    for index, memory in enumerate(build_seed_npc_memories())
                ]
            )

        if update_fields:
            update_fields["updatedAt"] = datetime.now(UTC)
            self._campaigns.update_one(
                {"campaignId": campaign_id},
                {"$set": update_fields},
            )

    def seed_initial_data(self) -> None:
        existing_campaign = self._campaigns.find_one({"campaignId": INITIAL_CAMPAIGN_ID})
        if existing_campaign is not None:
            self._backfill_existing_campaign(existing_campaign)
            return

        seed_screen = build_seed_session_screen()

        self._campaigns.insert_one(
            {
                "campaignId": INITIAL_CAMPAIGN_ID,
                "topbar": seed_screen.topbar.model_dump(),
                "sidebar": {
                    "navItems": [item.model_dump() for item in seed_screen.sidebar.navItems],
                    "worldOverview": [
                        stat.model_dump() for stat in seed_screen.sidebar.worldOverview
                    ],
                },
                "chat": {
                    "quickActions": [
                        action.model_dump() for action in seed_screen.chat.quickActions
                    ]
                },
                "quests": [quest.model_dump() for quest in build_seed_quests()],
                "infoPanels": {
                    "location": seed_screen.infoPanels.location.model_dump(),
                    "journal": [
                        entry.model_dump() for entry in seed_screen.infoPanels.journal
                    ],
                    "npcInFocus": seed_screen.infoPanels.npcInFocus.model_dump(),
                    "relationships": {
                        "nodes": [
                            node.model_dump()
                            for node in seed_screen.infoPanels.relationships.nodes
                        ],
                        "edges": [
                            edge.model_dump()
                            for edge in seed_screen.infoPanels.relationships.edges
                        ],
                    },
                },
                "createdAt": datetime.now(UTC),
                "updatedAt": datetime.now(UTC),
            }
        )

        self._chat_messages.insert_many(
            [
                {
                    **message.model_dump(),
                    "campaignId": INITIAL_CAMPAIGN_ID,
                    "createdAt": datetime.now(UTC) + timedelta(milliseconds=index),
                }
                for index, message in enumerate(seed_screen.chat.messages)
            ]
        )

        self._world_events.insert_many(
            [
                {
                    **event.model_dump(),
                    "campaignId": INITIAL_CAMPAIGN_ID,
                    "createdAt": datetime.now(UTC) + timedelta(milliseconds=index),
                }
                for index, event in enumerate(seed_screen.infoPanels.recentEvents)
            ]
        )

        self._npc_memories.insert_many(
            [
                {
                    **memory.model_dump(),
                    "campaignId": INITIAL_CAMPAIGN_ID,
                    "updatedAt": datetime.now(UTC) + timedelta(milliseconds=index),
                }
                for index, memory in enumerate(build_seed_npc_memories())
            ]
        )

    def get_recent_messages(self, campaign_id: str, limit: int = CHAT_HISTORY_LIMIT) -> list[dict]:
        recent_messages = list(
            self._chat_messages.find(
                {"campaignId": campaign_id},
                {"_id": 0, "campaignId": 0, "createdAt": 0},
            )
            .sort([("createdAt", DESCENDING), ("_id", DESCENDING)])
            .limit(limit)
        )
        recent_messages.reverse()
        return recent_messages

    def get_current_world_events(self, campaign_id: str, limit: int = RECENT_EVENTS_LIMIT) -> list[dict]:
        recent_events = list(
            self._world_events.find(
                {"campaignId": campaign_id},
                {"_id": 0, "campaignId": 0, "createdAt": 0},
            )
            .sort([("createdAt", DESCENDING), ("_id", DESCENDING)])
            .limit(limit)
        )
        recent_events.reverse()
        return recent_events

    def get_campaign_document(self, campaign_id: str) -> dict | None:
        return self._campaigns.find_one({"campaignId": campaign_id}, {"_id": 0})

    def get_current_journal(self, campaign_id: str) -> list[dict]:
        campaign_document = self.get_campaign_document(campaign_id)
        if campaign_document is None:
            return []
        return campaign_document.get("infoPanels", {}).get("journal", [])

    def get_npc_in_focus(self, campaign_id: str) -> dict | None:
        campaign_document = self.get_campaign_document(campaign_id)
        if campaign_document is None:
            return None
        return campaign_document.get("infoPanels", {}).get("npcInFocus")

    def get_relevant_npc_memory(
        self,
        campaign_id: str,
        npc_id: str | None,
    ) -> NpcMemorySchema | None:
        resolved_npc_id = npc_id
        if resolved_npc_id is None:
            focus_npc = self.get_npc_in_focus(campaign_id)
            resolved_npc_id = focus_npc["id"] if focus_npc is not None else None

        if resolved_npc_id is None:
            return None

        memory_document = self._npc_memories.find_one(
            {"campaignId": campaign_id, "npcId": resolved_npc_id},
            {"_id": 0, "campaignId": 0, "updatedAt": 0},
        )
        if memory_document is None:
            return None
        return NpcMemorySchema.model_validate(memory_document)

    def build_gm_context_bundle(
        self,
        campaign_id: str,
        npc_id: str | None = None,
    ) -> GMContextBundleSchema | None:
        campaign_document = self.get_campaign_document(campaign_id)
        if campaign_document is None:
            return None

        hidden_quests = [
            quest.get("title", "")
            for quest in campaign_document.get("quests", [])
            if quest.get("title")
        ]
        journal_entries = self.get_current_journal(campaign_id)
        relevant_npc_memory = self.get_relevant_npc_memory(campaign_id, npc_id)

        return GMContextBundleSchema.model_validate(
            {
                "campaignState": CampaignStateMemorySchema(
                    campaignId=campaign_id,
                    locationId=campaign_document["infoPanels"]["location"]["id"],
                    locationName=campaign_document["infoPanels"]["location"]["name"],
                    region=campaign_document["infoPanels"]["location"]["region"],
                    journal=[entry["text"] for entry in journal_entries],
                    hiddenQuests=hidden_quests,
                ).model_dump(),
                "recentMessages": self.get_recent_messages(campaign_id),
                "currentJournal": [entry["text"] for entry in journal_entries],
                "currentWorldEvents": self.get_current_world_events(campaign_id),
                "npcInFocus": campaign_document["infoPanels"]["npcInFocus"],
                "relevantNpcMemory": (
                    relevant_npc_memory.model_dump() if relevant_npc_memory is not None else None
                ),
            }
        )

    def upsert_npc_memory(
        self,
        campaign_id: str,
        memory: NpcMemorySchema,
    ) -> None:
        self._npc_memories.update_one(
            {"campaignId": campaign_id, "npcId": memory.npcId},
            {
                "$set": {
                    **memory.model_dump(),
                    "updatedAt": datetime.now(UTC),
                }
            },
            upsert=True,
        )
        self._campaigns.update_one(
            {
                "campaignId": campaign_id,
                "infoPanels.npcInFocus.id": memory.npcId,
            },
            {
                "$set": {
                    "infoPanels.npcInFocus.disposition": memory.currentDisposition,
                    "infoPanels.npcInFocus.dispositionSegments": (
                        3
                        if memory.currentDisposition == "ally"
                        else 2
                        if memory.currentDisposition == "neutral"
                        else 1
                    ),
                    "infoPanels.npcInFocus.summary": memory.summary,
                    "infoPanels.npcInFocus.lastNotableInteraction": memory.lastNotableInteraction,
                    "updatedAt": datetime.now(UTC),
                }
            },
        )

    def get_session_screen(self, campaign_id: str) -> SessionScreenResponseSchema | None:
        campaign_document = self.get_campaign_document(campaign_id)

        if campaign_document is None:
            return None

        return SessionScreenResponseSchema.model_validate(
            {
                "topbar": campaign_document["topbar"],
                "sidebar": campaign_document["sidebar"],
                "chat": {
                    "messages": self.get_recent_messages(campaign_id),
                    "quickActions": campaign_document["chat"]["quickActions"],
                },
                "characterSheet": build_seed_character_sheet().model_dump(),
                "infoPanels": {
                    **campaign_document["infoPanels"],
                    "recentEvents": self.get_current_world_events(campaign_id),
                },
            }
        )

    def append_chat_turn(
        self,
        campaign_id: str,
        messages: list[dict],
        recent_event: WorldEventSchema | None = None,
    ) -> SessionScreenResponseSchema | None:
        if self._campaigns.find_one({"campaignId": campaign_id}, {"_id": 1}) is None:
            return None

        now = datetime.now(UTC)
        self._chat_messages.insert_many(
            [
                {
                    **message,
                    "campaignId": campaign_id,
                    "createdAt": now + timedelta(milliseconds=index),
                }
                for index, message in enumerate(messages)
            ]
        )

        update_operations: dict = {
            "$set": {
                "updatedAt": now,
            }
        }

        self._campaigns.update_one({"campaignId": campaign_id}, update_operations)
        if recent_event is not None:
            self._world_events.insert_one(
                {
                    **recent_event.model_dump(),
                    "campaignId": campaign_id,
                    "createdAt": now + timedelta(milliseconds=len(messages)),
                }
            )
        return self.get_session_screen(campaign_id)
