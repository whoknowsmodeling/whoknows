# WhoKnows Models — FULL SYSTEM BUILD & AUDIT REPORT

> **Version:** 35.0.0 (Oracle Intelligence Release)
> **Intelligence:** Dual-Engine Sync (OpenAI GPT-4o Persona + Gemini 1.5 Data)
> **Identity:** International Modelling Agency Digital Twin
> **Developer:** Indo Design Website Scaffold indodesign.website | bali.technology
> **Status:** ✅ LOCKED & STABILIZED — Final Production Build Pass

---

## 1. System Vision & Purpose
WhoKnows Models is a premium, industrial-grade modelling agency platform designed for high-performance talent management and editorial showcasing. It bridges the gap between minimalist high-fashion aesthetics and technical industrial media processing, delivering an "Instant Loading" experience for a global audience.

---

## 2. Core Technology Stack
| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 15+ (App Router) | Core application routing and logic |
| **Runtime** | Cloudflare Edge Runtime | Low-latency global execution |
| **Database** | Supabase (PostgreSQL) | Scalable production data storage |
| **Auth** | Auth.js (NextAuth v5 Beta) | Secure Edge-native session management |
| **Styling** | Tailwind CSS 4 + Shadcn UI | Minimalist, responsive industrial design |
| **Animations** | Framer Motion | Smooth, premium micro-interactions |
| **Processing** | Sharp + FFmpeg (Admin) | Automated WebP/Webm media pipelines |
| **Intelligence** | OpenAI 4o + Gemini 1.5 | Dual-Engine Persona Sync Protocol |

---

## 3. Platform Architecture (Route Map)

### 🌐 Public Frontend
- **`/` (Landing Page)**: Hero navigation with "Home" link.
- **`/models`**: Unified mixed-gender talent roster (Hardened Interleaving logic).
- **`/women`**: Dedicated female talent gallery.
- **`/men`**: Dedicated male talent gallery.
- **`/jobs`**: Editorial and commercial campaign engine.
- **`/model/[slug]`**: Cinematic portfolio profile (with Priority Loading).
- **`/apply`**: Real-time portal for talent submissions.
- **`/contact`**: Split-layout contact interface.
- **`/about`, `/terms`, `/privacy`, `/under-18`**: Information & Compliance pages.

### 🔒 Administrative Suite (`/admin`)
- **Dashboard**: Industrial overview with API Heartbeat Monitor.
- **Applications**: Review and management portal for new submissions.
- **Models Management**: CMS for all gender-based talent data.
- **Campaign Management**: editorial CMS for commercial works.
- **Brand Partners**: Production-synced client logo management.
- **Activity Logs**: Global audit trail of all administrative actions.

---

## 4. Database Schema (Supabase)

| Table | Key Responsibility |
|-------|--------------------|
| **`Model`** | Core talent data (name, slug, gender, location, measurements). |
| **`ModelImage`** | portfolio asset map (supports `isPrimary` tagging). |
| **`Campaign`** | Commercial job entries with client, year, and video assets. |
| **`CampaignImage`** | Gallery assets specifically for commercial jobs. |
| **`CampaignModel`** | Many-to-many relationship mapping talent to jobs. |
| **`Client`** | Brand logos for the "Trusted by Leading Brands" section. |
| **`Application`** | Staging table for new talent submissions. |
| **`AdminLog`** | Security audit trail for administrative mutations. |

---

## 5. Industrial Media Engine
The platform uses a standardized directory structure to ensure 100% image resolution on the Edge:
- **Talent Assets**: `/public/all-models/[GENDER]/[ID]/`
- **Campaign Assets**: `/public/campaigns/`
- **Normalization**: Automatic `normalize-production-assets.ts` script ensures no path naming conflicts (`ALL MODELS` → `all-models`).

---

## 6. Environmental Configuration (Hardened & Redacted)

```bash
# == DATABASE ==
# Supabase Pooled Connection (Port 6543)
DATABASE_URL="postgresql://postgres.vonnnlywftnpmkgrcsfb:XXXXXXXXXXXX@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.vonnnlywftnpmkgrcsfb:XXXXXXXXXXXX@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"

# == SUPABASE API ==
NEXT_PUBLIC_SUPABASE_URL="https://vonnnlywftnpmkgrcsfb.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.XXXXXXX.XXXXXXX"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.XXXXXXX.XXXXXXX"

# == AUTHENTICATION ==
ADMIN_EMAIL="whoknowsmodeling@gmail.com"
ADMIN_PASSWORD="XXXXXXXXXXXX"
AUTH_SECRET="f6c5e8d5a8b7c4d3e2f1a0b9c8d7e6f5"
AUTH_TRUST_HOST=true

# == COMMUNICATIONS ==
NEXT_PUBLIC_FORMSPREE_URL="https://formspree.io/f/XXXXXXX"
NEXT_PUBLIC_FORMSPREE_CONTACT_URL="https://formspree.io/f/XXXXXXX"

# == INTELLIGENCE ==
GEMINI_API_KEY="AIzaSyA7e4U1nLI0IUyTNyJelY_XXXXXXXXXXXX"
OPENAI_API_KEY="sk-proj-XXXXXXXXXXXX"
```

---

## 7. Performance Mastery
- **Instant Page Protocol**: Aggressive link prefetching prepares data before the user clicks.
- **Hero Priority**: Video posters and landing page logos use `next/image` with `priority` markers.
- **Edge Caching**: Assets use `public, max-age=31536000, immutable` for zero-latency repeats.

---

## 8. Deployment & Build Manifest (Cloudflare)
**Build Command:** `npx prisma generate && npm run build`
**Edge Mandate:** All dynamic routes MUST include `export const runtime = 'edge'`.
**VCS Target:** `origin main`

---

*Verified Build — WhoKnows3 Super Report v30.0.0*
