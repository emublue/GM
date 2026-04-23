from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    mongodb_uri: str = "mongodb://127.0.0.1:27017"
    mongodb_db_name: str = "mythos_gm"
    campaigns_collection_name: str = "campaign_sessions"
    chat_messages_collection_name: str = "campaign_chat_messages"
    world_events_collection_name: str = "campaign_world_events"
    npc_memories_collection_name: str = "campaign_npc_memories"


@lru_cache
def get_settings() -> Settings:
    return Settings()
