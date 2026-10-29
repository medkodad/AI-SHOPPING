# AI E-Commerce Shopping Agent

Production-oriented full-stack starter for an AI-powered commerce platform.

## Structure

- `frontend/`: Next.js 15 App Router storefront and admin UI
- `backend/`: FastAPI service with normalized commerce models and APIs
- `docker-compose.yml`: PostgreSQL, Redis, backend, and frontend wiring

## Run locally

1. Backend
   ```bash
   cd backend
   python -m venv .venv
   .venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

2. Frontend
   ```bash
   cd frontend
   $env:Path="C:\Users\SK_FRNE\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin;$env:Path"
   pnpm install
   pnpm dev
   ```

3. Infrastructure
   ```bash
   docker compose up -d postgres redis
   ```

## What is included

- Customer pages: landing, products, categories, product details, cart, checkout, wishlist, profile, orders, order tracking, AI assistant, settings, notifications
- Admin pages: dashboard, analytics, orders, customers, products, categories, inventory, coupons, reviews, AI logs, reports, system settings
- Backend entities with relationships: users, roles, products, categories, orders, order items, cart items, wishlist items, reviews, coupons, AI logs, notifications, shipments

## Next phases

1. Polish design system and reusable UI primitives.
2. Add auth, refresh tokens, RBAC, and protected routes.
3. Connect React Query to the backend APIs.
4. Add Celery, Redis, vector search, and LangGraph agents.
