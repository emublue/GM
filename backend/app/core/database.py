from pymongo import MongoClient
from pymongo.database import Database

from app.core.config import get_settings

_client: MongoClient | None = None
_database: Database | None = None


def init_database() -> Database:
    global _client, _database

    if _database is not None:
        return _database

    settings = get_settings()
    _client = MongoClient(settings.mongodb_uri)
    _client.admin.command("ping")
    _database = _client[settings.mongodb_db_name]
    return _database


def get_database() -> Database:
    if _database is None:
        return init_database()
    return _database


def close_database() -> None:
    global _client, _database

    if _client is not None:
        _client.close()

    _client = None
    _database = None
