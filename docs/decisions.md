# Architecture Decisions

This document explains the major technical choices made in building GJYL and provides guidance for future modifications.

## Authentication: NextAuth vs Supabase Auth

### Decision: NextAuth

**Rationale:**
- More flexibility for custom auth flows
- Works seamlessly with Next.js App Router
- Easy to swap providers (email, OAuth, custom)
- No vendor lock-in
- Self-hosted by default

**How to swap to Supabase Auth:**

1. Install Supabase client:
```bash
pnpm add @supabase/supabase-js @supabase/auth-helpers-nextjs
```

2. Replace `lib/auth.ts` with Supabase configuration:
```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

3. Update authentication flows in components
4. Migrate user session handling

## API Layer: tRPC vs REST

### Decision: Prepared for tRPC (currently REST-like)

**Current state:** Using Next.js API routes with type-safe patterns

**Why tRPC makes sense:**
- End-to-end type safety
- No code generation needed
- Great DX with autocomplete
- Built-in validation with Zod

**Implementation path:**

1. Install tRPC:
```bash
pnpm add @trpc/server @trpc/client @trpc/react-query @trpc/next
```

2. Create `lib/trpc/router.ts` with procedures
3. Set up context with session
4. Add tRPC provider to app
5. Replace API routes with tRPC procedures

## Database: PostgreSQL with Prisma

### Decision: PostgreSQL + Prisma ORM

**Rationale:**
- Relational data fits our use case (users, friends, conversations)
- ACID guarantees for critical operations
- Excellent query performance with proper indexing
- Prisma provides great DX with migrations and type safety

**Schema highlights:**

- **Soft deletes** for messages (isDeleted flag)
- **JSON fields** for flexible metadata
- **Enums** for status fields (type safety)
- **Indexes** on frequently queried fields
- **Unique constraints** to prevent duplicates

**Alternative: Supabase (PostgreSQL + Auth + Realtime)**

If you want to simplify infrastructure:
1. Sign up for Supabase
2. Use their hosted PostgreSQL
3. Replace NextAuth with Supabase Auth
4. Use Supabase Realtime instead of Socket.IO

## Real-time: Socket.IO vs WebSockets

### Decision: Socket.IO

**Rationale:**
- Automatic reconnection
- Room-based broadcasting (perfect for chat)
- Fallback to long-polling
- Built-in namespaces

**Server implementation:**
- Namespace for DMs, Spaces, Live chat
- Redis adapter for horizontal scaling
- Authenticated connections only

**Alternative: Supabase Realtime or Pusher**
- Less control but easier to set up
- No need to manage WebSocket server
- Good for smaller apps

## Media Storage: S3 vs Local

### Decision: S3-compatible (MinIO in dev, AWS S3 in prod)

**Rationale:**
- Scalable and durable
- CDN-friendly
- Signed URLs for secure access
- Standard interface (works with any S3-compatible service)

**Local development:** MinIO in Docker
**Production options:**
- AWS S3
- Cloudflare R2
- Backblaze B2
- DigitalOcean Spaces

## Media Processing: FFmpeg

### Decision: FFmpeg via BullMQ jobs

**Workflow:**
1. User uploads video
2. Store original in S3
3. Queue transcoding job
4. FFmpeg creates HLS playlist (240p, 480p)
5. Generate thumbnail and poster frame
6. Store derivatives in S3
7. Update post status to READY

**Why BullMQ:**
- Reliable job processing
- Retry logic
- Job prioritization
- Redis-backed (already in stack)

**Scaling:**
- Run multiple workers
- Use dedicated transcoding servers
- Consider AWS MediaConvert for large scale

## Live Streaming: nginx-rtmp + HLS

### Decision: nginx-rtmp for ingest, HLS for playback

**Rationale:**
- Battle-tested RTMP server
- HLS widely supported
- Low latency with short fragments
- Simple to self-host

**Workflow:**
1. Creator gets stream key from database
2. OBS/streaming software pushes to rtmp://server/live/{key}
3. nginx-rtmp transcodes to HLS
4. HLS playlist served via Next.js API (with auth)
5. Client plays with Video.js or native player

**Production considerations:**
- Use CDN for HLS delivery
- Consider AWS MediaLive or Mux for scale
- Implement DVR functionality
- Add adaptive bitrate

## State Management: Zustand vs Redux

### Decision: Zustand

**Rationale:**
- Simpler API than Redux
- No boilerplate
- Works well with React 18
- Good for UI state (modals, theme, etc.)

**When to use Redux Toolkit:**
- Very complex state logic
- Time-travel debugging needed
- Large team with Redux experience

**Server state:** React Query
- Caching and invalidation
- Automatic refetching
- Optimistic updates

## Styling: Tailwind CSS

### Decision: Tailwind + shadcn/ui

**Rationale:**
- Utility-first rapid development
- Small production bundle
- shadcn/ui provides accessible components
- Easy to customize

**Theme system:**
- CSS variables for colors
- Dark mode with class strategy
- Consistent spacing scale

## Testing Strategy

### Unit Tests: Vitest
- Fast and modern
- Compatible with Vite ecosystem
- Great for utils and hooks

### E2E Tests: Playwright
- Cross-browser testing
- API testing capabilities
- Video recording for debugging

### Coverage goals:
- Utils: 80%+
- API routes: 70%+
- E2E: Critical paths (auth, chat, upload)

## Security Considerations

### Rate Limiting
- Implement per-user and per-IP limits
- Use Redis for distributed rate limiting
- Limit friend requests, messages, uploads

### Input Validation
- Zod schemas for all inputs
- Sanitize user content
- Validate file types and sizes

### Authentication
- HTTP-only cookies for sessions
- CSRF protection
- Secure password reset flow

### Content Moderation
- Profanity filter for chat
- Report system for abuse
- Admin moderation queue

## Scaling Path

### Phase 1: Single server (0-1k users)
- Current architecture works fine
- Vertical scaling (bigger server)

### Phase 2: Horizontal scaling (1k-10k users)
- Multiple app servers behind load balancer
- Redis sentinel for HA
- PostgreSQL read replicas
- CDN for static assets and media

### Phase 3: Microservices (10k+ users)
- Separate media processing service
- Dedicated live streaming infrastructure
- Message queue for all async work
- Database sharding by user ID

### Phase 4: Global scale
- Multi-region deployment
- Edge computing for media
- Dedicated real-time infrastructure
- ML-based recommendations

## Future Enhancements

### Short term:
- [ ] Progressive Web App (PWA)
- [ ] Push notifications via Web Push API
- [ ] Mobile apps (React Native)
- [ ] Voice/video calls (WebRTC)

### Medium term:
- [ ] Stories feature
- [ ] Group calls in Spaces
- [ ] Live stream co-hosting
- [ ] Analytics dashboard

### Long term:
- [ ] End-to-end encryption for DMs
- [ ] Blockchain-based content verification
- [ ] AI content moderation
- [ ] Federated protocol support

## Cost Optimization

### Development:
- Use Docker Compose (free)
- MinIO instead of S3 (free)
- MailHog instead of real SMTP (free)

### Production (estimated for 1k active users):
- Vercel Hobby: Free (with limits)
- PostgreSQL (Supabase free tier or $25/mo)
- Redis (Upstash free tier or $10/mo)
- S3 storage (Backblaze B2 $5/TB/mo)
- Total: ~$0-40/mo

### Scaling costs:
- 10k users: $200-500/mo
- 100k users: $2k-5k/mo
- 1M users: $20k-50k/mo

## Monitoring and Observability

### Recommended tools:
- **Logging**: Datadog, LogRocket, or self-hosted Loki
- **Metrics**: Prometheus + Grafana
- **Error tracking**: Sentry
- **Uptime**: BetterUptime or UptimeRobot
- **Analytics**: Plausible (privacy-friendly)

### Key metrics to track:
- Response time (p50, p95, p99)
- Error rate
- Active users
- Message throughput
- Video transcoding queue length
- Storage usage

## Questions?

If you need to make architectural changes or have questions about these decisions, please:

1. Check this document first
2. Review the codebase for examples
3. Open a discussion issue on GitHub
4. Contact the team at dev@gjyl.local

Last updated: {new Date().toISOString().split('T')[0]}
