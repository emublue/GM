from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.chat import router as chat_router
from app.api.routes.session import router as session_router
from app.core.database import close_database, init_database
from app.repositories.campaign_repository import CampaignRepository


@asynccontextmanager
async def lifespan(_: FastAPI):
    database = init_database()
    repository = CampaignRepository(database)
    repository.ensure_indexes()
    repository.seed_initial_data()
    yield
    close_database()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(session_router)
app.include_router(chat_router)
