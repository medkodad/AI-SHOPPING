from fastapi import APIRouter

router = APIRouter()


@router.get("/api-status")
def api_status() -> dict[str, str]:
    return {"status": "healthy"}
