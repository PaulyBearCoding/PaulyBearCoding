.PHONY: help install dev build test e2e clean docker-up docker-down db-migrate db-seed db-studio

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	pnpm install

dev: ## Start development server
	pnpm dev

build: ## Build for production
	pnpm build

test: ## Run all tests
	pnpm test

e2e: ## Run end-to-end tests
	pnpm e2e

lint: ## Lint code
	pnpm lint

format: ## Format code
	pnpm format

typecheck: ## Type check
	pnpm typecheck

clean: ## Clean build artifacts
	rm -rf .next dist build node_modules/.cache

docker-up: ## Start Docker services
	docker compose up -d

docker-down: ## Stop Docker services
	docker compose down

docker-logs: ## View Docker logs
	docker compose logs -f

db-migrate: ## Run database migrations
	pnpm db:migrate

db-migrate-prod: ## Deploy migrations to production
	pnpm db:migrate:prod

db-seed: ## Seed database
	pnpm db:seed

db-studio: ## Open Prisma Studio
	pnpm db:studio

db-reset: ## Reset database (WARNING: destroys data)
	pnpm db:migrate reset --force

setup: install docker-up db-migrate db-seed ## Full setup (install, docker, migrate, seed)
	@echo 'Setup complete! Run "make dev" to start the server'

demo: ## Run demo script
	./scripts/demo.sh

check: lint typecheck test ## Run all checks before commit
