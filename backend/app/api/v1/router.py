from fastapi import APIRouter

from app.api.v1.endpoints import ai, catalog, health

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(catalog.router, prefix="/catalog", tags=["catalog"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
