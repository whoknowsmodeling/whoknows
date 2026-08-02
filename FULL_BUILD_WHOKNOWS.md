# WhoKnows Models — FULL SYSTEM BUILD & AUDIT REPORT

> **Version:** 38.0.0 (Archives Redesign, Admin Dark-Theme Fix, Image Delivery Overhaul)
> **Intelligence:** Dual-Engine Sync (OpenAI GPT-4o Persona + Gemini 2.0 Flash Scale)
> **Identity:** International Modelling Agency Digital Twin
> **Developer:** Indo Design Website Scaffold indodesign.website | bali.technology
> **Status:** ✅ LOCKED & HARDENED — v38.0.0 Production Build Pass (Cloudflare Images subscription pending — see §8)

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
| **Carousel** | Embla Carousel 8.6 | Optimized talent discovery with Trackpad support |
| **Intelligence** | OpenAI 4o + Gemini 2.0 | Persona-Sync Protocol v36.0.0 |

---

## 3. Platform Architecture (Route Map)

### 🌐 Public Frontend
- **`/` (Landing Page)**: Hero navigation + FACES (Trackpad Optimized) + Archives.
- **`/archives`**: Unified talent portal with strictly balanced **W-M-W** pattern, rendered as an auto-fit masonry grid (each card sized to its own photo's natural aspect ratio — no forced crop).
- **`/women` / `/men`**: Dedicated gender-specific rosters.
- **`/model/[slug]`**: Portfolio profiles with new **Booking Modal System**.
- **`/apply` / `/contact`**: Real-time talent submission and contact portals.

### 🔒 Administrative Suite (`/admin`)
- **Dashboard**: Industrial overview with API Heartbeat Monitor.
- **Models Management**: CMS for all talent. The `.dark` theme scope is now actually activated for the whole `/admin` route (v38.0.0) — earlier "hardened white text" styling had silently fallen back to light-theme defaults on several components (e.g. the Portfolio Images role buttons rendered invisible white-on-white) because the `dark` class itself was never applied anywhere in the app.
- **Applications**: Review and management portal for new submissions.
- **Activity Logs**: Global audit trail of all administrative actions.

---

## 4. Key Milestone Features (v36.1.0)

### 🌐 Domain Migration & SEO Maximization
- **Primary Domain**: Domain fallbacks and alternates changed to `whoknowsmodels.com`.
- **Structured Data (JSON-LD)**: Synchronized Organization and LocalBusiness schemas with the official footer information.
- **Geo-Location**: Injected HTML header meta tags (`geo.region`, `geo.position`, `ICBM`) and coordinates mapping to boost Bali visibility.

### 🎟️ Booking Modal System
The platform now features a professional inquiry system on every model profile.
- **Modal Logic**: Scrollable dialog containing inquiry form and direct WhatsApp/Email links.
- **Form Fields**: Name, Email, Subject, Message.
- **Triggers**: Click "Available for Booking" or the primary "Book [Name]" CTA.

### 📐 Grid Intelligence (W-M-W Pattern)
Automated interleaving logic in the `edge-data` layer ensures that the Archives grid always follows a **Woman | Man | Woman** pattern across 3 columns, maximizing visual balance.

### 🖱️ Trackpad Master Protocol
Engine-level horizontal scroll listener added to the Faces carousel, allowing MacBook users to swipe through talent lists with natural momentum.

---

## 5. Performance Mastery
- **WebP-First Architecture**: 100% of core branding and talent assets migrated to WebP.
- **Priority Rendering**: Critical headings and above-the-fold images use `priority` markers.
- **Edge Data Fetching**: Optimized Supabase queries with server-side interleaving logic.

---

## 6. Deployment & Build Manifest
**Build Command:** `npx prisma generate && npm run build`
**Database Sync:** `node scripts/restore-data.mjs`
**Edge Mandate:** All dynamic routes MUST include `export const runtime = 'edge'`.
**Build Verified:** 44 static pages (v38.0.0)

---

## 7. Admin Dashboard — Comprehensive Operational Guide

> **Access URL:** `https://whoknowsmodels.com/admin/login`
> **Login Email:** `whoknowsmodeling@gmail.com`
> **Authentication:** Auth.js (NextAuth v5) Credential Provider, Edge-compatible session management.

This section is the **complete operational manual** for the WhoKnows Models admin dashboard. Every panel, tool, button, and workflow is documented to enable an admin to fully manage the platform without developer assistance.

---

### 7.0 Login & Authentication

**Route:** `/admin/login`

| Element | Description |
|---------|-------------|
| **Email Address** | Enter the registered admin email (`whoknowsmodeling@gmail.com`). |
| **Password** | Enter the admin password. Use the **Show/Hide** toggle to verify input. |
| **Login to Dashboard** | Submit credentials. On success, you are redirected to `/admin`. |
| **Back to Website** | Returns to the public homepage. |

**Important Notes:**
- Admin users are stored in the `AdminUser` table in Supabase.
- Sessions are managed server-side with Auth.js and are Edge-runtime compatible.
- Invalid credentials will show a red toast notification: *"Invalid credentials"*.
- After successful login, a green toast: *"Welcome back, Admin"* appears.

---

### 7.1 Dashboard — Workspace Overview

**Route:** `/admin`

This is the main landing page after login. It provides a bird's-eye view of all platform activity.

#### 7.1.1 Stats Cards (Top Row)

| Card | Description | Color |
|------|-------------|-------|
| **Men Models** | Total number of male models in the roster. Trend indicator (e.g., "+2 this month"). | 🔵 Blue |
| **Women Models** | Total number of female models in the roster. Trend indicator (e.g., "+5 this month"). | 🩷 Pink |
| **Live Campaigns** | Total number of active campaigns/jobs. | 🟡 Amber |
| **Pending Applications** | Count of unprocessed talent submissions from the `/apply` form. | 🟢 Emerald |

#### 7.1.2 Recent Activity Feed

- Displays the **5 most recent** admin actions (create, update, delete).
- Each row shows: **Action type**, **Entity**, **Details**, **Time elapsed**, and **Admin email**.
- Click **"View All Activity →"** to navigate to the full Activity Logs page.

#### 7.1.3 Quick Actions

| Button | Action |
|--------|--------|
| **Add New Model** | Navigates to `/admin/models/women/new` to create a new talent profile. |
| **Create Campaign** | Navigates to `/admin/campaigns` to set up a new job/campaign. |
| **Update Page Content** | Navigates to `/admin/content` for text content editing. |

#### 7.1.4 API Connection Overview (Heartbeat Monitor)

Displays real-time connection status for all integrated infrastructure services:

| Service | Status Indicators |
|---------|-------------------|
| **Supabase Database** | `CONNECTED` (green) / `ERROR` (red) + latency in ms. |
| **Gemini AI Engine** | `CONNECTED` (green) / `ERROR` (red) + latency in ms. |
| **Formspree API** | `CONNECTED` (green) / `ERROR` (red) + latency in ms. |
| **Cloudflare Edge** | `STABLE` (green) / `ERROR` (red) + latency in ms. |

- Click the **🔄 Refresh** button to re-check all services manually.
- The footer reads: *"All systems operational at WhoKnows Edge v3.0.4"*.

---

### 7.2 Applications Panel

**Route:** `/admin/applications`

This panel displays all talent submissions from the public `/apply` page.

#### Panel Layout

| Element | Description |
|---------|-------------|
| **Header** | Title: *"Model Applications"* with a *"Real-time Submissions"* indicator badge. |
| **Application Cards** | Each application is displayed as a full-width card with the following details. |

#### Application Card Details

| Field | Description |
|-------|-------------|
| **Name** | Full name of the applicant. |
| **Email** | Email address provided. |
| **Location** | City and country (e.g., "Bali, Indonesia"). |
| **Status** | Current processing status (e.g., `pending`, `reviewed`, `accepted`). |
| **Height** | Physical height measurement (if provided). |
| **Photo Grid** | Up to 3 preview photos submitted by the applicant (aspect ratio 3:4). |
| **🗑️ Delete Button** | Opens a confirmation dialog: *"Delete Application?"* → irreversible, deletes all associated photos. |

#### Pagination
- Applications are loaded in batches of **20**.
- Click **"Load More Applications"** to fetch the next batch.

---

### 7.3 Contact Messages Panel

**Route:** `/admin/contacts`

Displays all inquiries submitted from the public `/contact` page.

#### Message Card Details

| Field | Description |
|-------|-------------|
| **Sender Avatar** | Circle icon with a user silhouette. |
| **Name** | Full name of the sender. |
| **Email** | Email address with a mail icon. |
| **Date** | Submission date (formatted as *"June 9, 2026"*). |
| **Subject** | The inquiry subject (displayed as a label inside the message body). |
| **Message Body** | Full text of the message, preserving line breaks. |

#### Actions

| Button | Description |
|--------|-------------|
| **Reply** | Opens your default email client (`mailto:`) pre-filled with the sender's email. |
| **🗑️ Delete** | Opens a confirmation dialog: *"Delete Message?"* → irreversible deletion from database. |

---

### 7.4 Models Management (Men / Women)

**Routes:** `/admin/models/men` and `/admin/models/women`

This is the core talent management system. Each gender has a dedicated panel.

#### 7.4.1 Models Grid View

| Element | Description |
|---------|-------------|
| **Header** | Title: *"Models: men"* or *"Models: women"* with the total count. |
| **+ Add Model** | Button to create a new model → navigates to `/admin/models/{gender}/new`. |
| **Model Cards** | 4-column grid of model cards showing profile image, name, location, and badges. |

#### Model Card Actions (Hover Overlay)

| Button | Description |
|--------|-------------|
| **✏️ Edit** | Navigate to the edit page: `/admin/models/{gender}/{id}/edit`. |
| **🔗 View Live** | Open the model's public portfolio page `/model/{slug}` in a new tab. |
| **🗑️ Delete** | Permanently delete the model and all associated images. Confirmation required. |

**Badge Indicators:**
- `Featured` — White badge, appears when the talent is marked as featured on the website.

---

#### 7.4.2 Model Form (Create / Edit)

**Routes:** `/admin/models/{gender}/new` and `/admin/models/{gender}/{id}/edit`

The model form is divided into three sections:

##### Section A — Profile Information

| Field | Type | Description |
|-------|------|-------------|
| **Full Name** | Text (required) | The talent's display name. A URL-friendly slug is auto-generated. |
| **Location** | Text | Origin/base city (e.g., "Bali", "London", "New York"). |
| **Biography** | Textarea | Free-text biography (supports multi-line). |
| **Featured Talent** | Toggle (Switch) | When ON, the model appears in the "Featured" section on the frontend. |

##### Section B — Physical Attributes

| Field | Placeholder | Description |
|-------|-------------|-------------|
| **Height** | 5'10" | Body height (free format). |
| **Chest/Bust** | 32 | Chest measurement. |
| **Waist** | 24 | Waist measurement. |
| **Hips** | 34 | Hip measurement. |
| **Hair** | Brown | Hair color description. |
| **Eyes** | Blue | Eye color description. |

##### Section C — Portfolio Images

The right column of the form contains the image portfolio manager.

| Element | Description |
|---------|-------------|
| **Existing Image Grid** | 2-column grid displaying all current portfolio images (aspect 3:4). |
| **Upload Zone** | Dashed border area. Click to open file picker (accepts `image/*`). Multiple files allowed. |
| **Auto-Optimization Note** | *"Images will be automatically optimized to WebP format."* |

**Image Hover Actions** (only visible when editing an existing model):

| Button | Function |
|--------|----------|
| **✅ Set Profile Primary** | Marks this image as the main profile image (shown in roster grids). Green when active. |
| **🗑️ Delete Image** | Permanently removes this image from the portfolio and storage. |
| **Add Face / In Faces** | Toggles whether this image appears in the Faces carousel (circular headshot slider on the homepage). |
| **Prime-All** | Sets this image as the "Prime" representative for the entire website homepage. Only ONE image can hold this role at a time. |
| **Prime-W** | Sets this image as the "Prime" representative for the Women's section on the homepage. Only ONE image at a time. |
| **Prime-M** | Sets this image as the "Prime" representative for the Men's section on the homepage. Only ONE image at a time. |

**Active Badge Indicators** (top-left corner of each image):

| Badge | Color | Meaning |
|-------|-------|---------|
| `Primary` | 🟢 Emerald | Main profile image for roster display. |
| `Face` | ⬜ White | Appears in Faces carousel circles. |
| `All` | 🔵 Blue | Prime representative for homepage (all). |
| `W-Prime` | 🩷 Pink | Prime representative for Women section. |
| `M-Prime` | 🟣 Indigo | Prime representative for Men section. |

---

#### 7.4.3 ⚠️ Photo Upload Specifications (CRITICAL)

> **Important:** Following these specifications is essential to maintain the "Instant Loading" performance of the WhoKnows Models website.

##### Portfolio / Profile Images (Roster Grid & Model Profile)

| Property | Specification |
|----------|---------------|
| **Aspect Ratio** | **3:4** (Portrait orientation) |
| **Recommended Dimensions (Max)** | **1200 × 1600 px** |
| **Recommended Dimensions (Min)** | **900 × 1200 px** |
| **File Format (Best)** | **WebP** (automatically converted by server) |
| **File Format (Accepted)** | JPG / JPEG (quality 80%+), PNG (not recommended — large file size) |
| **Max File Size** | **500 KB** per image (optimal: **100–200 KB**) |
| **Color Profile** | sRGB recommended |
| **Background** | Clean studio backgrounds or natural environments preferred |

##### Faces Carousel Circle (Homepage Headshot Slider)

| Property | Specification |
|----------|---------------|
| **Aspect Ratio** | **1:1** (Square — circular crop applied automatically) |
| **Recommended Dimensions** | **600 × 600 px** |
| **Framing** | Tight headshot — face should fill 70-80% of the frame |
| **Max File Size** | **200 KB** per image |
| **Notes** | The circular mask on the frontend will crop to center. Ensure the face is centered in the frame. |

##### Hero Slide Images (Full-width Homepage Banners)

| Property | Specification |
|----------|---------------|
| **Aspect Ratio** | **16:9** (Landscape, cinematic) |
| **Recommended Dimensions** | **1920 × 1080 px** |
| **File Format** | WebP or high-quality JPEG |
| **Max File Size** | **800 KB** (optimal: **300–500 KB**) |

##### Campaign Cover Assets

| Property | Specification |
|----------|---------------|
| **Aspect Ratio** | **3:4** (Portrait, same as portfolio) |
| **Recommended Dimensions** | **1200 × 1600 px** |
| **Video Support** | `.mp4` or `.webm` accepted. Auto-loops silently on the campaign card. |
| **Max File Size (Image)** | **500 KB** |
| **Max File Size (Video)** | **5 MB** recommended |

##### Brand Partner Logos

| Property | Specification |
|----------|---------------|
| **Aspect Ratio** | **16:9** (Landscape container, image is `object-contain`) |
| **Format (Best)** | **SVG** or **Transparent PNG** |
| **Recommended Dimensions** | **400 × 200 px** |
| **Background** | Transparent required — displayed on dark background with brightness filter |
| **Max File Size** | **100 KB** |

##### Compression Tools (Recommended)

| Tool | URL | Notes |
|------|-----|-------|
| **Squoosh** | squoosh.app | Google's browser-based tool. Best for WebP conversion. |
| **TinyPNG** | tinypng.com | Excellent for PNG/JPEG batch compression. |
| **Photoshop Export** | — | Use "Export As" → WebP at 80% quality. |
| **Figma Export** | — | Export at 2x with WebP format for retina-ready assets. |

---

#### 7.4.4 Image Visibility Role Matrix

This table explains where each role makes the model's image appear on the public website:

| Role | Where It Appears | Max Count | Visual Behavior |
|------|-----------------|-----------|-----------------|
| **isPrimary** | Roster grid cards (`/women`, `/men`, `/archives`), Admin model list | 1 per model | Full card cover image (3:4) |
| **isFace** | Homepage FACES horizontal carousel (circular headshots) | Multiple allowed | Circular mask, centered headshot |
| **isPrimeAll** | Homepage hero/Prime representative area (covers all genders) | 1 system-wide | Full-bleed showcase image |
| **isPrimeWomen** | Homepage Women section hero cover | 1 system-wide | Feature cover for the Women category |
| **isPrimeMen** | Homepage Men section hero cover | 1 system-wide | Feature cover for the Men category |

**How to assign roles:**
1. Navigate to the Model Edit page (`/admin/models/{gender}/{id}/edit`).
2. Hover over any portfolio image to reveal the overlay controls.
3. Click the desired role button. Active roles show a **filled white** style.
4. **Prime** roles are exclusive — assigning `Prime-All` to a new image automatically removes it from the previous holder.

---

### 7.5 Archive Panel

**Route:** `/admin/campaigns`
**Sidebar label:** "Archive" (renamed from "Campaigns (Jobs)" in v38.0.0 — reframed as a brand-shoot portfolio for client viewing, e.g. Whispertone, Gucci, rather than an internal campaign-management tool. Framing/copy only — data model and `/admin/campaigns` route are unchanged.)

Manages editorial, commercial, and fashion campaign showcases displayed on the `/jobs` page.

#### 7.5.1 Campaign Grid View

Displays all campaigns as 3-column cards with cover images/videos, client name, year, title, and tagged model badges.

**Card Overlays (Hover):**

| Element | Description |
|---------|-------------|
| **Featured** badge | Blue badge, visible when the campaign is featured on the homepage. |
| **Private** badge | Red badge, visible when the campaign is set to inactive/hidden. |
| **✏️ Edit** | Opens the edit dialog for this campaign. |
| **🗑️ Delete** | Deletes the campaign. Confirmation required. |

#### 7.5.2 Create / Edit Campaign Dialog

Click **"+ New Entry"** to open the campaign creation form, or hover a card and click Edit.

| Field | Description |
|-------|-------------|
| **Shoot Title / Campaign Name** | Required. The display name of the campaign (e.g., "Summer 2026 Editorial"). |
| **Client** | The brand or client name (e.g., "Dior", "Bali Vogue"). |
| **Year** | Campaign year (e.g., "2026"). |
| **Description** | Free-text description of the campaign. |
| **Visible on Website** | Toggle switch → when ON, the job appears on the public `/jobs` page. |
| **Featured on Home** | Toggle switch → when ON, the job appears in the Landing Page Featured section. |
| **Cover Asset (Image or Video)** | Click the 3:4 preview area to upload a cover image or video. Hover to reveal the upload icon. Accepts `image/*` and `video/*`. |
| **Tag Models** | A 6-column grid of all models. Click to select (white highlight). Hold multiple selections to tag multiple models to this campaign. |
| **Gallery Assets** | (Only on creation) Upload multiple images/videos for the campaign gallery. *"High-res files will be auto-transcoded to WebP/WebM."* |

**Buttons:**
- **Cancel** → Close the dialog without saving.
- **Add to Archive** / **Save Changes** → Submit the form.

---

### 7.6 Brand Partners Panel

**Route:** `/admin/clients`

Manages logos displayed in the "Trusted by Leading Brands" section on the homepage.

#### 7.6.1 Partner Grid View

4-column grid of brand logo cards. Logos display in grayscale and reveal color on hover.

| Card Element | Description |
|-------------|-------------|
| **Logo Preview** | Brand logo rendered with brightness filter for dark-theme compatibility. |
| **Brand Name** | Text below the logo. |
| **Order Index** | Determines the display order in the carousel. Lower = earlier. |
| **Inactive** badge | Red badge shown if the partner is hidden from the website. |

#### 7.6.2 Add / Edit Partner Dialog

Click **"+ Add Partner"** or hover a card and click Edit.

| Field | Description |
|-------|-------------|
| **Brand Name** | Required. The company name (e.g., "Nike", "Chanel"). |
| **Display Order** | Numeric value controlling the position in the brand carousel. |
| **Visible on Website** | Toggle switch → when ON, the logo appears on the landing page. |
| **Brand Logo** | Upload area (16:9 container). Click or hover to upload. **SVG or Transparent PNG preferred.** |

---

### 7.7 WK_Ai Assistant Panel

**Route:** `/admin/ai`

This is the built-in AI-powered Chief Operating Officer (COO) assistant. It is backed by the Gemini AI Engine (Oracle Engine) and provides real-time intelligence about the platform.

#### 7.7.1 Chat Interface

| Element | Description |
|---------|-------------|
| **Chat Window** | 400px scrollable area. AI messages on the left (violet avatar), admin messages on the right (grey avatar). |
| **Input Field** | Type your message and press **Enter** or click the **Send** button. |
| **Loading State** | Shows *"Analyzing intelligence streams..."* while waiting for AI response. |
| **Markdown Rendering** | AI responses support full Markdown (bold, lists, code blocks, etc.). |
| **Timestamps** | Each message shows the exact time (HH:mm:ss format). |

**Example Prompts:**
- "How many new applications came in this week?"
- "Summarize the current talent roster stats."
- "What campaigns are currently active?"

#### 7.7.2 Immutable AI Audit Vault

Below the chat is a **read-only audit log table** (TanStack Table) that records every AI interaction.

| Column | Description |
|--------|-------------|
| **Timestamp** | Exact date and time of the AI interaction. |
| **Actor** | Who initiated it: `WK_AI`, `ADMIN_LENNY`, `ADMIN_BUNNY`, or `SYSTEM_CRON` (color-coded). |
| **Action** | The action type (green for success, red for errors). |
| **Payload Preview** | Truncated JSON preview of the interaction data. |

- Click **🔄 Refresh** to reload the audit log.
- This log is **permanent and immutable** — no deletion capability.

---

### 7.8 Blog Engine Panel

**Route:** `/admin/blog`

The Blog Engine is an Oracle-powered programmatic SEO content pipeline that auto-generates blog articles optimized for search engines.

#### 7.8.1 Header Actions

| Button | Description |
|--------|-------------|
| **🔄 Refresh** | Reload the article list from the database. |
| **+ Create Manual** | Opens a prompt for the article title, then creates a blank draft and opens the editor. |
| **✨ Generate with Oracle** | Triggers the AI engine (`/api/cron/generate-blog`) to auto-generate a new SEO-optimized blog article as a DRAFT. |

#### 7.8.2 Stats Row

Three stat cards showing:
- **Total Articles** — All articles (drafts + published).
- **Published** — Articles visible on the public `/blog` page.
- **Drafts** — Articles awaiting review/publication.

#### 7.8.3 Articles Table (TanStack Table)

| Column | Description |
|--------|-------------|
| **Title** | Article title + URL slug (`/slug-name`). |
| **Status** | `DRAFT` (amber) or `PUBLISHED` (green with ✅ icon). |
| **Target Keyword** | The SEO keyword this article targets (violet monospace). |
| **Created** | Date the article was generated. |
| **Actions** | Row action buttons (see below). |

**Row Actions:**

| Button | Description |
|--------|-------------|
| **Publish** (green) | Immediately publish a DRAFT article. Only visible for drafts. |
| **🔗 View Live** | Open the published article on the public website in a new tab. Only visible for published articles. |
| **✏️ Edit** | Open the full-screen Markdown editor. |
| **🗑️ Delete** | Permanently delete the article. Confirmation required. |

#### 7.8.4 Full-Screen Markdown Editor

When you click Edit on any article, a full-screen editor modal opens:

| Element | Description |
|---------|-------------|
| **Title Input** | Editable article title at the top. |
| **Target Keyword** | Displayed below the title (read-only, set during generation). |
| **Editor / Preview Toggle** | Switch between raw Markdown editing and rendered preview. |
| **Markdown Textarea** | Full monospace code editor for writing/editing article content. |
| **Preview Pane** | Rendered HTML preview of the Markdown content (prose-invert styled). |
| **SEO Sidebar** (desktop) | Right panel (272px) showing: Meta Title, Meta Description, Target Keyword, OG Description. |

**Editor Buttons:**

| Button | Description |
|--------|-------------|
| **Edit / Preview** | Toggle between edit mode (raw text) and preview mode (rendered). |
| **Save Draft** | Save changes without publishing. |
| **Publish** | Save and publish the article (only for DRAFT articles). |
| **✕ Close** | Exit the editor. |

**Workflow: AI-Generated Article Pipeline:**
1. Click **"✨ Generate with Oracle"** → Oracle generates a full article with SEO metadata as a DRAFT.
2. Click **✏️ Edit** on the new draft to open the full-screen editor.
3. Review and refine the content. Check the SEO sidebar for keyword targeting.
4. Use **Preview** mode to verify the rendered output.
5. Click **Publish** when satisfied.

---

### 7.9 Cluster Engine Panel

**Route:** `/admin/services`

The Cluster Engine manages programmatic SEO landing pages that target specific industrial niches (e.g., "Fashion Photography Bali", "Model Casting Indonesia").

#### 7.9.1 Header Area

| Element | Description |
|---------|-------------|
| **Title** | *"Cluster Engine"* with a violet accent bar. |
| **Description** | *"Programmatic SEO Infrastructure for targeting industrial niches."* |
| **Filter Input** | Search field to filter pages by title or category. |
| **🔄 Refresh** | Reload the cluster page list. |
| **+ Generate Cluster** | Trigger AI to generate a new cluster of SEO landing pages. |

#### 7.9.2 Cluster Pages Table (TanStack Table)

| Column | Description |
|--------|-------------|
| **Landing Page** | Page title + full URL path (`Services /{clusterSlug}/{slug}`). |
| **Category Cluster** | The parent category (e.g., "fashion-photography", "model-casting"). Displayed as a grey badge. |
| **Status** | `PUBLISHED` (green dot) or `DRAFT` (amber dot). |
| **Generated** | Date the page was created. |
| **Actions** | View live page (external link icon) + Settings button. |

#### 7.9.3 Industry Insights Footer

Three info cards explaining the Cluster Engine's capabilities:
- **SEO Integrity** — Semantic schema standards for discovery.
- **Persona Sync** — OpenAI-refined persona for conversion.
- **Dynamic Roster** — Live-synced talent data, zero dead-links.

---

### 7.10 Activity Logs Panel

**Route:** `/admin/logs`

A comprehensive audit trail of every administrative action performed on the platform.

#### Table Columns

| Column | Description |
|--------|-------------|
| **Time** | Date (formatted) + exact timestamp (HH:mm:ss). |
| **Admin** | The admin email who performed the action, with a user avatar icon. |
| **Action** | Color-coded badge: `create` (🟢 green), `update` (🔵 blue), `delete` (🔴 red). |
| **Entity** | The type of item affected (e.g., "model", "campaign", "blog") + truncated entity ID. |
| **Details** | Human-readable description of what changed (e.g., *"Created model: Jane Doe"*). |

**Header Badge:** Shows total count of recent actions (e.g., *"24 Recent Actions"*).

---

### 7.11 Page Content Manager

**Route:** `/admin/content`

Allows admin to update text content (titles, subtitles, descriptions) across all public pages without touching code.

#### Tab Navigation

Five tabs, one for each major public page:
- **Home** | **Women** | **Men** | **Contact** | **Apply**

#### Editable Sections Per Page

Each page tab contains two editable cards:

| Card | Fields | Description |
|------|--------|-------------|
| **Hero Section** | `Hero Title` (Input), `Hero Subtitle` (Textarea) | Controls the main heading and subheading text of the page hero area. |
| **Introduction Section** | `Section Heading` (Input), `Section Content` (Textarea) | Controls the intro/about text block below the hero. |

**How to Use:**
1. Select the page tab (e.g., "Home").
2. Edit the text fields as needed.
3. Click **"Save Changes"** (sticky bottom-right button).
4. The public page is automatically revalidated and updated.

---

### 7.12 Hero Slides Manager

**Route:** `/admin/hero`

Manages the large cinematic full-width slides on the homepage.

#### Slides List View

Each slide is displayed as a horizontal card with:
- **Preview Thumbnail** (16:9 aspect ratio, 256px wide).
- **Title** (or "Untitled Slide" if no title is set).
- **Subtitle / Link** (secondary text line).
- **Hidden** badge (red) if the slide is deactivated.

#### Actions Per Slide

| Button | Description |
|--------|-------------|
| **✏️ Edit** | Opens the edit dialog with pre-filled data. |
| **🗑️ Delete** | Permanently deletes the slide. Confirmation required. |

#### Add / Edit Slide Dialog

Click **"+ Add Slide"** to create a new hero slide.

| Field | Description |
|-------|-------------|
| **Title** (Optional) | Overlay text on the slide. |
| **Subtitle** (Optional) | Secondary text below the title. |
| **Link URL** | Where clicking the slide navigates to (e.g., `/models/women`). |
| **Slide Image** | Upload area with preview thumbnail. **Recommended: 1920×1080px WebP.** |
| **Active Slide** | Toggle switch. When OFF, the slide is hidden from the homepage. |

---

### 7.13 Sidebar Navigation Reference

The left sidebar contains all navigation links. Here is the complete reference:

| Menu Item | Route | Icon | Description |
|-----------|-------|------|-------------|
| **Dashboard** | `/admin` | 📊 | Workspace overview with stats, activity, and API health. |
| **Applications** | `/admin/applications` | 📄 | Review new talent submissions. |
| **Contact Messages** | `/admin/contacts` | 📄 | Read and reply to website inquiries. |
| **Models (Men)** | `/admin/models/men` | 👥 | Manage male model roster. |
| **Models (Women)** | `/admin/models/women` | 👥 | Manage female model roster. |
| **Archive** | `/admin/campaigns` | 🖼️ | Brand-shoot portfolio for client viewing (create/manage entries). |
| **Brand Partners** | `/admin/clients` | 🖼️ | Manage brand logos in the "Trusted By" section. |
| **WK_Ai Assistant** | `/admin/ai` | 🤖 | Chat with the AI COO and view audit logs. |
| **Blog Engine** | `/admin/blog` | ✨ | Oracle-powered SEO blog pipeline. |
| **Cluster Engine** | `/admin/services` | 📐 | Programmatic SEO landing page generator. |
| **Activity Logs** | `/admin/logs` | ⚙️ | Full audit trail of all admin actions. |

**Sidebar Features:**
- **Collapse/Expand** — Click the panel icon to toggle between full sidebar (272px) and icon-only mode (80px).
- **View Website** — Opens the public homepage in a new tab.
- **Sign Out** — Logs out the admin and redirects to the homepage.
- **Mobile Menu** — On mobile, use the ☰ hamburger menu in the top header to open the sidebar as an overlay.

---

### 7.14 Admin Workflow Cheat Sheet

#### Adding a New Model (Complete Workflow)

1. Navigate to **Models (Women)** or **Models (Men)**.
2. Click **"+ Add Model"**.
3. Fill in: Name, Location, Biography, and Physical Attributes.
4. Toggle **Featured Talent** if this model should appear on the homepage.
5. Upload portfolio images (3:4 ratio, WebP preferred, under 500 KB each).
6. Click **"Create Model"**.
7. Return to the model list → click **✏️ Edit** on the new model.
8. Hover over each image to assign roles:
   - Set one image as **Primary** (main roster image).
   - Set one image as **Face** (for the homepage circle carousel).
   - Optionally set **Prime-All/W/M** for homepage feature spots.
9. Click **"Save Changes"**.

#### Publishing a Blog Article (Complete Workflow)

1. Navigate to **Blog Engine**.
2. Click **"✨ Generate with Oracle"** (AI generates a draft) OR **"+ Create Manual"**.
3. Wait for the article to appear in the table with status `DRAFT`.
4. Click **✏️ Edit** to open the full-screen editor.
5. Review the title, content, and SEO metadata sidebar.
6. Toggle **Preview** to verify the rendered Markdown.
7. Make any necessary edits.
8. Click **"Publish"** to go live.

#### Managing Brand Partners

1. Navigate to **Brand Partners**.
2. Click **"+ Add Partner"**.
3. Enter Brand Name and Display Order.
4. Upload the logo (SVG or transparent PNG, 400×200px).
5. Ensure **"Visible on Website"** is toggled ON.
6. Click **"Create Partner"**.

---

## 8. v38.0.0 Update Log (2026-08-03)

Full task-by-task detail lives in `ANTIGRAVITY_PROMPT_REPORT.md`; summary here for continuity with this manual:

- Archives auto-fit masonry + broken-image fix, homepage Men/Women sections removed, "Campaigns (Jobs)" reframed as "Archive" (§7.5 above updated accordingly), Model Profile Page migrated to `next/image`.
- Image upload pipeline re-architected around the Cloudflare Images binding (`env.IMAGES`) instead of `sharp` directly — Cloudflare Workers cannot execute native binaries regardless of the configured Next.js runtime, so `sharp` now only serves as a non-Workers fallback.
- The 278 bundled static talent photos in `public/all-models/` were compressed in place (131MB → 28MB).
- Admin `.dark` theme scope fixed — it was declared in `globals.css` but never actually activated anywhere, causing several components (e.g. the Portfolio Images role buttons) to silently render with light-theme colors.
- **Open item:** production PageSpeed auditing showed `/_next/image` serve-time resizing is not actually active — the Cloudflare Images `IMAGES` binding cannot persist without an active paid Images subscription on the account, which was not yet completed as of this update. No further code changes are required for this; it is a Cloudflare account/dashboard step.

---

*Verified Build — WhoKnows3 Super Report v38.0.0*
