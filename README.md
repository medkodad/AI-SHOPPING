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

Fonctionnalités incluses
- Pages client : page d’accueil, produits, catégories, détails des produits, panier, paiement, liste de souhaits, profil, commandes, suivi des commandes, assistant IA, paramètres et notifications.
- Pages administrateur : tableau de bord, analyses, commandes, clients, produits, catégories, gestion des stocks, coupons de réduction, avis, journaux de l’IA, rapports et paramètres système.
- Entités backend et relations : utilisateurs, rôles, produits, catégories, commandes, articles de commande, articles du panier, listes de souhaits, avis, coupons, journaux de l’IA, notifications et expéditions.

Prochaines étapes
1. Améliorer le système de design et les composants UI réutilisables.
2. Ajouter l’authentification, les jetons de rafraîchissement (refresh tokens), le contrôle d’accès basé sur les rôles (RBAC) et les routes protégées.
3. Connecter React Query aux API du backend.
4. Intégrer Celery, Redis, la recherche vectorielle et les agents LangGraph.
