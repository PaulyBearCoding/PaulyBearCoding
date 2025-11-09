# GJYL - Chat, Feed, and Live

A privacy-respecting, modern social platform combining real-time chat, short-form video feed, and live streaming.

## Features

### Chat
- **One-to-one messaging** with typing indicators and read receipts
- **Group Spaces** with channels and role-based permissions
- **Rich media support** including images, files, voice clips, and video messages
- **Message reactions** and threading
- **Real-time presence** (online/idle/offline status)

### Friends
- Send and manage friend requests
- View online presence
- Block and report users
- Search by handle or email

### Feed
- **Short-form video** content with endless scroll
- Like, comment, and share posts
- Follow creators
- Algorithmic "For You" feed
- Upload videos with captions and tags

### Live Streaming
- Start live streams with RTMP
- Real-time chat for viewers
- Viewer count and moderation tools
- HLS playback

### Additional Features
- Email magic link authentication
- OAuth support (Google, GitHub)
- Dark/light theme
- Comprehensive settings and privacy controls
- Mobile-responsive design

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Zustand** for state management
- **React Query** for server state
- **Framer Motion** for animations

### Backend
- **Next.js API Routes** for REST/tRPC endpoints
- **NextAuth** for authentication
- **Prisma** ORM with PostgreSQL
- **Socket.IO** for real-time features
- **BullMQ** for background jobs
- **Redis** for caching and queues

### Infrastructure
- **PostgreSQL** database
- **Redis** for caching and jobs
- **MinIO** S3-compatible object storage
- **nginx-rtmp** for live streaming
- **FFmpeg** for media processing
- **Docker Compose** for local development

## Prerequisites

- Node.js 18+ and pnpm 8+
- Docker and Docker Compose
- Git

## Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd PaulyBearCoding
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your local configuration. The defaults should work for local development.

### 4. Start Docker services

```bash
docker compose up -d
```

This starts:
- PostgreSQL on port 5432
- Redis on port 6379
- MinIO on ports 9000 (API) and 9001 (Console)
- nginx-rtmp on port 1935 (RTMP) and 8080 (HLS)
- MailHog on ports 1025 (SMTP) and 8025 (Web UI)

### 5. Run database migrations

```bash
pnpm db:migrate
```

### 6. Seed the database

```bash
pnpm db:seed
```

This creates:
- Two demo users (alice@gjyl.local and bob@gjyl.local)
- A friendship between them
- A DM conversation with sample messages
- A demo Space
- 5 demo feed posts
- Sample notifications

### 7. Start the development server

```bash
pnpm dev
```

The app will be available at:
- **Web app**: http://localhost:3000
- **MailHog UI**: http://localhost:8025 (for viewing magic link emails)
- **MinIO Console**: http://localhost:9001 (login: gjyl_minio / gjyl_minio_secret_key_2024)

## Environment Variables

### Required for Local Development

```env
DATABASE_URL="postgresql://gjyl:gjyl_password@localhost:5432/gjyl?schema=public"
REDIS_URL="redis://localhost:6379"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
EMAIL_SERVER="smtp://localhost:1025"
EMAIL_FROM="noreply@gjyl.local"
```

### S3/MinIO Configuration

```env
S3_ENDPOINT="http://localhost:9000"
S3_ACCESS_KEY="gjyl_minio"
S3_SECRET_KEY="gjyl_minio_secret_key_2024"
S3_BUCKET="gjyl-uploads"
S3_REGION="us-east-1"
```

### Optional OAuth Providers

```env
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### Brand Configuration

```env
NEXT_PUBLIC_BRAND_NAME="GJYL"
NEXT_PUBLIC_BRAND_TAGLINE="Chat, Create, Connect"
NEXT_PUBLIC_SUPPORT_EMAIL="support@gjyl.local"
```

## Available Scripts

### Root Level

```bash
pnpm dev              # Start development server
pnpm build            # Build all apps
pnpm test             # Run all tests
pnpm e2e              # Run Playwright e2e tests
pnpm lint             # Lint all packages
pnpm format           # Format code with Prettier
pnpm typecheck        # Type check all packages
```

### Database

```bash
pnpm db:migrate       # Run Prisma migrations
pnpm db:migrate:prod  # Deploy migrations to production
pnpm db:seed          # Seed database with demo data
pnpm db:studio        # Open Prisma Studio
pnpm db:generate      # Generate Prisma client
```

### Docker

```bash
pnpm docker:up        # Start Docker services
pnpm docker:down      # Stop Docker services
pnpm docker:logs      # View Docker logs
```

## Development Workflow

### 1. Creating a new feature

```bash
git checkout -b feature/my-feature
# Make your changes
pnpm lint
pnpm typecheck
pnpm test
git commit -m "feat: add my feature"
```

### 2. Testing authentication

1. Visit http://localhost:3000
2. Click "Get started"
3. Enter an email (e.g., test@example.com)
4. Check MailHog at http://localhost:8025 for the magic link
5. Click the link to sign in

### 3. Using demo accounts

In development mode, you can sign in as demo users:
- alice@gjyl.local
- bob@gjyl.local

Use the magic link flow or add `?demoUser=1` to bypass email verification.

### 4. Testing live streaming

```bash
# Start a test stream with FFmpeg
docker exec -it gjyl-ffmpeg ffmpeg -re -i /fixtures/sample.mp4 \
  -c:v libx264 -preset veryfast -b:v 3000k \
  -c:a aac -b:a 128k \
  -f flv rtmp://nginx-rtmp:1935/live/test-stream-key
```

Then visit the Live page in the app to view the stream.

## Project Structure

```
PaulyBearCoding/
├── apps/
│   └── web/              # Next.js application
│       ├── src/
│       │   ├── app/      # App Router pages
│       │   ├── components/ # React components
│       │   ├── lib/      # Utilities and config
│       │   └── hooks/    # Custom React hooks
│       └── package.json
├── infra/
│   ├── docker/           # Docker configurations
│   │   └── nginx-rtmp/   # RTMP server config
│   └── prisma/           # Database schema and migrations
│       ├── schema.prisma
│       └── seed.ts
├── scripts/              # Utility scripts
│   └── demo.sh          # Demo testing script
├── fixtures/             # Sample media files
├── docker-compose.yml    # Docker services
├── package.json          # Root package.json
└── turbo.json           # Turbo build config
```

## Testing

### Unit Tests

```bash
pnpm test
```

### E2E Tests

```bash
# Start services
docker compose up -d
pnpm db:migrate
pnpm db:seed

# Run tests
pnpm e2e
```

### Manual Testing

Use the demo script to test core flows:

```bash
./scripts/demo.sh
```

This script:
1. Verifies all services are running
2. Creates test data
3. Tests authentication
4. Tests friend requests
5. Tests messaging
6. Tests feed uploads
7. Tests live streaming

## Deployment

### Prerequisites

- PostgreSQL database
- Redis instance
- S3-compatible object storage
- SMTP server for emails

### Build for production

```bash
pnpm build
```

### Environment setup

Set all required environment variables for production:

```env
NODE_ENV=production
DATABASE_URL="your-production-database-url"
REDIS_URL="your-production-redis-url"
NEXTAUTH_SECRET="generate-a-secure-secret"
NEXTAUTH_URL="https://your-domain.com"
EMAIL_SERVER="your-smtp-server"
S3_ENDPOINT="your-s3-endpoint"
# ... etc
```

### Deploy

The app can be deployed to:
- **Vercel** (easiest for Next.js)
- **Railway** (includes database and Redis)
- **AWS** (EC2, RDS, ElastiCache, S3)
- **Self-hosted** (with Docker)

## Architecture Decisions

See [docs/decisions.md](docs/decisions.md) for detailed explanations of:
- Why NextAuth vs Supabase Auth
- tRPC vs REST
- PostgreSQL schema design
- Real-time architecture
- Media processing pipeline
- Scaling considerations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run linting and type checking
6. Submit a pull request

## License

MIT

## Support

- **Email**: support@gjyl.local
- **Documentation**: See `/docs` folder
- **Issues**: GitHub Issues

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth](https://next-auth.js.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
