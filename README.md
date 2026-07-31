# 🎙️ Miws — AI-Powered English Speaking Practice

Miws is a comprehensive English speaking practice platform powered by **Gemini AI**. It provides a complete learning journey: **Topic → Vocabulary → Record → AI Feedback → Progress Tracking → Personal Coaching**.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 9+

### 1. Clone & Install

```bash
cd miws
pnpm install
```

### 2. Setup Environment Variables

**For the web app** (`apps/web/.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=https://yqbvbcninytltzrgzzfo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**For the API** (`apps/api/.env`):
```env
PORT=3001
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://...  # from Supabase dashboard
DIRECT_URL=postgresql://...    # from Supabase dashboard
SUPABASE_URL=https://yqbvbcninytltzrgzzfo.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # from Supabase dashboard → API settings
JWT_SECRET=your-random-secret
GEMINI_API_KEY=your-gemini-api-key
```

**For database package** (`packages/database/.env`):
```env
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
```

### 3. Setup Supabase

1. Go to [supabase.com](https://supabase.com) → your project
2. Go to **Settings → API** and copy:
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
3. Go to **Settings → Database** and copy:
   - Connection string (Transaction pooler) → `DATABASE_URL`
   - Connection string (Direct) → `DIRECT_URL`
4. Go to **Authentication → Providers** → Enable **Google**
5. Go to **Storage** → Create a bucket named `recordings` (public)

### 4. Setup Database

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to Supabase
pnpm db:migrate

# Seed with initial data (categories, topics, vocabulary, achievements, roadmaps)
pnpm db:seed
```

### 5. Run Development

```bash
# Start both web and API
pnpm dev

# Or individually:
pnpm --filter @miws/web dev      # http://localhost:3000
pnpm --filter @miws/api dev      # http://localhost:3001
```

---

## 🏗️ Architecture

```
miws/
├── apps/
│   ├── web/          # Next.js 14 frontend
│   └── api/          # NestJS backend
└── packages/
    ├── database/     # Prisma schema + seed
    └── types/        # Shared TypeScript types
```

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, Tailwind CSS, Framer Motion |
| Backend | NestJS, Prisma |
| Database | PostgreSQL via Supabase |
| Auth | Supabase Auth (Google OAuth) |
| Storage | Supabase Storage |
| AI | Google Gemini 2.0 Flash (free tier) |
| Charts | Recharts |

## 🔑 API Keys Needed

1. **Gemini API** — [aistudio.google.com](https://aistudio.google.com) → Get API Key (free)
2. **Supabase** — From your project dashboard
   - Anon key (public) 
   - Service role key (private, server only)
   - Database connection strings

## 📱 Features

- ✅ Google OAuth login
- ✅ 11 categories with 100+ topics
- ✅ Vocabulary flip cards
- ✅ Audio recording with waveform
- ✅ Bilingual speaking (EN/ID) via Gemini
- ✅ AI speech analysis (pronunciation, grammar, fluency, confidence, vocabulary)
- ✅ Filler word & repetition detection
- ✅ Personal AI coaching messages
- ✅ Progress dashboard with charts
- ✅ Vocabulary tracker with status
- ✅ Learning roadmap (IELTS, Interview, Business, etc.)
- ✅ Achievement system with 18 badges
- ✅ Streak tracking

## 🔧 Commands

```bash
pnpm dev              # Start all apps
pnpm build            # Build all apps
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run database migrations
pnpm db:seed          # Seed initial data
pnpm db:studio        # Open Prisma Studio
```
