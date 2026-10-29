from fastapi import APIRouter, Query

router = APIRouter()

SAMPLE_CATEGORIES = [
    {"id": 1, "name": "Laptops", "slug": "laptops", "description": "Portable computing", "parent_id": None},
    {"id": 2, "name": "Monitors", "slug": "monitors", "description": "Displays for work", "parent_id": None},
    {"id": 3, "name": "Shoes", "slug": "shoes", "description": "Performance footwear", "parent_id": None},
]

SAMPLE_PRODUCTS = [
    {
        "id": 1,
        "name": "MacBook Air M3",
        "slug": "macbook-air-m3",
        "description": "Thin, fast, and efficient laptop for creators and professionals.",
        "price": 1099.0,
        "stock": 8,
        "rating": 4.8,
        "image_url": None,
        "is_active": True,
        "category_id": 1,
    },
    {
        "id": 2,
        "name": "Dell 27 4K Monitor",
        "slug": "dell-27-4k-monitor",
        "description": "Sharp display for programming and productivity.",
        "price": 499.0,
        "stock": 14,
        "rating": 4.6,
        "image_url": None,
        "is_active": True,
        "category_id": 2,
    },
]


@router.get("/categories")
def list_categories() -> list[dict]:
    return SAMPLE_CATEGORIES


@router.get("/products")
def list_products(
    q: str | None = None,
    category_id: int | None = None,
    min_price: float | None = Query(default=None, ge=0),
    max_price: float | None = Query(default=None, ge=0),
) -> dict:
    items = SAMPLE_PRODUCTS
    if q:
        items = [item for item in items if q.lower() in item["name"].lower() or q.lower() in item["description"].lower()]
    if category_id:
        items = [item for item in items if item["category_id"] == category_id]
    if min_price is not None:
        items = [item for item in items if item["price"] >= min_price]
    if max_price is not None:
        items = [item for item in items if item["price"] <= max_price]
    return {"items": items, "total": len(items)}
