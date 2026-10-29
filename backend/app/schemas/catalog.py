from pydantic import BaseModel

from app.schemas.common import ORMBase


class CategoryRead(ORMBase):
    id: int
    name: str
    slug: str
    description: str | None = None
    parent_id: int | None = None


class ProductRead(ORMBase):
    id: int
    name: str
    slug: str
    description: str
    price: float
    stock: int
    rating: float
    image_url: str | None = None
    is_active: bool
    category_id: int


class ProductListResponse(BaseModel):
    items: list[ProductRead]
    total: int
