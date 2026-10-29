from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class AssistantRequest(BaseModel):
    message: str


@router.post("/assistant")
def assistant(payload: AssistantRequest) -> dict:
    text = payload.message.lower()
    if "under" in text or "budget" in text:
        intent = "recommendation"
    elif "compare" in text:
        intent = "comparison"
    elif "order" in text or "tracking" in text:
        intent = "order"
    else:
        intent = "support"
    return {
        "intent": intent,
        "answer": "AI routing is wired and ready for the next phase of agent logic.",
    }
