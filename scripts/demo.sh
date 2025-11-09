#!/bin/bash

# GJYL Demo Script
# Tests core functionality end-to-end

set -e

echo "🚀 GJYL Demo Script"
echo "=================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is running
echo "📋 Checking prerequisites..."
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker is running${NC}"

# Check if services are up
echo ""
echo "🐳 Checking Docker services..."
if ! docker compose ps | grep -q "running"; then
    echo -e "${YELLOW}⚠️  Services not running. Starting them now...${NC}"
    docker compose up -d
    echo "⏳ Waiting for services to be ready..."
    sleep 10
fi
echo -e "${GREEN}✅ All services are running${NC}"

# Check if database is accessible
echo ""
echo "🗄️  Checking database..."
if ! docker compose exec -T postgres pg_isready -U gjyl > /dev/null 2>&1; then
    echo -e "${RED}❌ Database is not ready${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Database is ready${NC}"

# Check if Redis is accessible
echo ""
echo "📦 Checking Redis..."
if ! docker compose exec -T redis redis-cli ping > /dev/null 2>&1; then
    echo -e "${RED}❌ Redis is not ready${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Redis is ready${NC}"

# Check if MinIO is accessible
echo ""
echo "🗃️  Checking MinIO..."
if ! curl -s http://localhost:9000/minio/health/live > /dev/null 2>&1; then
    echo -e "${RED}❌ MinIO is not ready${NC}"
    exit 1
fi
echo -e "${GREEN}✅ MinIO is ready${NC}"

echo ""
echo "=========================================="
echo "✅ All services are healthy!"
echo "=========================================="
echo ""

# Show service URLs
echo "🌐 Service URLs:"
echo "  • Web app:       http://localhost:3000"
echo "  • MailHog:       http://localhost:8025"
echo "  • MinIO Console: http://localhost:9001"
echo "  • Prisma Studio: (run 'pnpm db:studio')"
echo ""

# Show demo accounts
echo "👥 Demo Accounts:"
echo "  • alice@gjyl.local"
echo "  • bob@gjyl.local"
echo ""

echo "📝 Next Steps:"
echo "  1. Run 'pnpm dev' to start the development server"
echo "  2. Visit http://localhost:3000"
echo "  3. Click 'Get started' to sign in"
echo "  4. Check http://localhost:8025 for magic link emails"
echo ""

echo "🧪 Run E2E Tests:"
echo "  pnpm e2e"
echo ""

echo "📊 View Database:"
echo "  pnpm db:studio"
echo ""

echo -e "${GREEN}✨ Demo environment is ready!${NC}"
