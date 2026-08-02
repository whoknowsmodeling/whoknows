## Laporan Pengerjaan — ANTIGRAVITY_PROMPT.md

> Dikerjakan di repo `ANTIGRAVITY/WhoKnows3` (branch `main`, belum di-commit). Semua 5 poin selesai dari sisi kode. `npm run build` PASS (44 halaman, tanpa error).

---

### 1. Model Profile Page — layout ala IMG Models

**Status: sudah selesai sebelumnya, cuma diverifikasi (tidak ditimpa ulang).**

`ModelSlideshow.tsx` (dipakai oleh `src/app/model/[slug]/page.tsx`) ternyata sudah mengimplementasikan seluruh spec:
- Foto potrait otomatis dipasangkan 2-besar-bersisian per set; foto landscape tampil sendiri satu set — pakai rasio asli (`aspectRatio` dihitung dari `naturalWidth/naturalHeight`), tanpa crop paksa.
- Counter halaman `1 / N` ada.
- Navigasi kiri/kanan langsung di halaman via cursor kustom (bukan lightbox popup) + klik kiri/kanan + swipe touch + arrow key.
- Nama model: serif italic besar, IG handle di bawahnya.
- Measurements, bio, Booking CTA di sidebar tetap ada, tidak dihapus.
- Tidak ada tombol booking baru ditambahkan di dalam galeri.
- Header/nav WhoKnows tidak disentuh sama sekali.

Perubahan yang saya lakukan di sini murni bagian dari **Task 5** (lihat di bawah): mengganti `<img>` mentah jadi `next/image` supaya foto di halaman ini ikut kena resize otomatis di serve-time.

---

### 2. Home Page — Archives Section (auto-fit + fix broken-image icon)

**File:** `src/components/sections/ArchivesSection.tsx` — ditulis ulang.

- Grid 3-kolom fixed + `aspect-[3/4] object-cover` (crop paksa) diganti jadi **CSS masonry** (`columns-1 sm:columns-2 lg:columns-3`). Tiap card tingginya mengikuti rasio asli foto yang lagi tampil (dihitung dari `naturalWidth/naturalHeight` saat `onLoad`, sama seperti pola yang dipakai di `ModelSlideshow`). Carousel per-model (swipe antar foto) tetap jalan.
- Sumber ikon "tanda tanya biru" ditemukan: foto dengan `imageUrl` kosong/invalid tetap coba di-render oleh `next/image` → browser nampilin broken-image icon default. Fix:
  - Foto tanpa `imageUrl` di-filter duluan sebelum render.
  - Kalau foto gagal load (`onError`), diganti div putih polos (`bg-white`), bukan ikon error.

---

### 3. Admin Dashboard — rename "Campaigns (Jobs)" → "Archive"

**File:** `src/app/admin/layout.tsx`, `src/components/admin/CampaignManagement.tsx`

Murni ganti label/copy, tidak sentuh data/struktur DB:
- Sidebar: "Campaigns (Jobs)" → "Archive"
- Heading halaman → "Archive", subtitle → "Brand shoot portfolio — showcased to clients (Whispertone, Gucci, and more)."
- Tombol "New Job" → "New Entry", submit "Create Job" → "Add to Archive"
- Dialog title "Edit Job"/"Create New Job" → "Edit Archive Entry"/"Add Archive Entry"
- Label "Job Title / Campaign Name" → "Shoot Title / Campaign Name"
- Empty state "No commercial jobs found." → "No archive entries found."

---

### 4. Home Page — hapus section Men & Women

**File:** `src/app/page.tsx`

Section "MEN" dan "WOMEN" (`RosterSection`) dihapus dari homepage beserta fetching data yang cuma dipakai di situ (`menModels`/`womenModels`). `/men` dan `/women` **tidak disentuh** — masing-masing masih punya `RosterSection` independen sendiri.

---

### 5. PRIORITAS TERTINGGI — Kecepatan loading foto

Ini yang paling banyak temuan barunya. Ringkasan:

**a) Temuan arsitektur (mengubah pendekatan fix upload):**
Brief menduga fix-nya adalah pindah proses upload ke `runtime = 'nodejs'` supaya `sharp` jalan. Setelah dicek (`COMPREHENSIVE_REPORT.md`, `wrangler.jsonc`, riwayat commit "enable edge runtime for all dynamic routes to support cloudflare pages build"), **production app ini deploy ke Cloudflare Workers/Pages**. Di Cloudflare Workers, `sharp` (native binary) **tidak bisa jalan sama sekali**, apapun label runtime-nya — beda dengan Vercel. Jadi fix versi "pindah ke nodejs runtime" tidak akan benar-benar berhasil di production (cuma kelihatan berhasil di `next dev` lokal).

→ **Fix yang dipakai (dikonfirmasi ke user):** pakai **Cloudflare Images binding** (`env.IMAGES`, sudah dideklarasikan di `wrangler.jsonc` tapi belum pernah dipakai di kode). `src/lib/media-processor.ts` sekarang coba proses lewat Cloudflare Images dulu (native, benar-benar jalan di Workers), fallback ke `sharp` (untuk konteks Node.js non-Workers, mis. script lokal), fallback terakhir buffer asli — sama seperti sebelumnya.
`next.config.ts` ditambah `initOpenNextCloudflareForDev()` supaya binding ini juga bisa dites saat `next dev` lokal (lewat proxy Wrangler/Miniflare).

**b) Reprocess foto lama (`scripts/mass-compress.ts`):**
Disesuaikan ke target resmi (max 2000px, WebP q80, strip EXIF — sebelumnya 1200px/q65 tanpa strip EXIF). Dijalankan terhadap production Supabase: **hasilnya 0 dari 274 foto diproses** — bukan gagal, tapi karena **foto model production ternyata sama sekali tidak ada di Supabase Storage**.

**c) Temuan baru (di luar dugaan brief) — sumber utama loading lambat:**
274 baris `ModelImage` di DB semuanya menunjuk ke path statis (`/all-models/women/athina/...webp`), yaitu file yang di-bundle langsung di `public/all-models/` (278 file, **132MB total**, ada yang sampai 5.9MB per file) — sudah `.webp` tapi belum pernah di-resize/kompres. Ditambah `ModelSlideshow.tsx` (halaman utama showcase model) sengaja pakai `<img>` HTML mentah, bukan `next/image`, jadi tidak ada resize otomatis di serve-time juga.

Dikonfirmasi ke user, lalu dieksekusi:
- Script baru `scripts/compress-static-assets.ts` — resize semua file lokal (2000px/WebP q80/strip EXIF) langsung di `public/all-models/`.
- **Hasil: 131.40MB → 28.44MB (hemat ~103MB, 180 dari 278 file dikompres, 98 sudah optimal, 0 error).**
- `ModelSlideshow.tsx`: `<img>` mentah → `next/image` (`fill`, `priority` utk slide pertama, `quality=80`).

**d) Verifikasi Cloudflare Images binding di serve-time (poin 3 brief):**
Dicek dari source `@opennextjs/cloudflare` — `/_next/image` (dipakai `next/image`) **otomatis** di-proxy lewat `env.IMAGES` kalau binding-nya ada, tanpa perlu kode tambahan. Binding sudah dideklarasikan di `wrangler.jsonc` dan `next.config.ts` sudah punya config `images` yang benar → secara kode ini sudah terhubung. Yang tidak bisa saya verifikasi dari sini: apakah produk **Cloudflare Images sungguh aktif di dashboard/akun Cloudflare** kalian — itu perlu dicek langsung di Cloudflare dashboard atau lewat deployment live.

**e) Audit `next/image` (poin 4 brief):**
`ArchivesSection.tsx`, `FacesSection.tsx`, `ModelCard.tsx` — sudah konsisten (`priority`/`loading`/`quality`/`placeholder="blur"` sesuai posisi above/below-the-fold).
`ImageGallery.tsx` (dipakai di `/jobs/[slug]`) — grid thumbnail sebelumnya `loading="lazy"` untuk semua foto termasuk yang above-the-fold. Ditambahkan `priority`/`fetchPriority`/`placeholder="blur"` untuk 4 foto pertama, sama seperti pola di komponen lain.

---

## File yang berubah

```
next.config.ts                                  (+initOpenNextCloudflareForDev)
.gitignore                                       (+.wrangler local state)
src/lib/media-processor.ts                       (Cloudflare Images primary, sharp fallback)
scripts/mass-compress.ts                         (target disamakan: 2000px/q80/strip-EXIF)
scripts/compress-static-assets.ts                (BARU — compress public/all-models)
src/components/models/ModelSlideshow.tsx         (<img> → next/image)
src/components/sections/ArchivesSection.tsx      (masonry + broken-image fix)
src/components/models/ImageGallery.tsx           (priority/loading audit)
src/app/admin/layout.tsx                         (label sidebar)
src/components/admin/CampaignManagement.tsx      (copy/framing "Archive")
src/app/page.tsx                                 (hapus section Men/Women)
public/all-models/**/*.webp                      (180 file dikompres, -103MB)
```

---

## Yang belum / perlu tindakan dari kalian

1. **Verifikasi visual di browser** belum selesai — terhalang Maintenance Mode (password gate) yang sedang aktif di local dev, dan saya tidak punya kredensial admin. Saya sengaja tidak coba bypass gate-nya sendiri.
2. **Belum di-commit maupun di-deploy.** Perubahan `public/all-models/*.webp` (180 file, -103MB) baru berlaku di production setelah kalian commit + deploy.
3. **Cloudflare Images product** perlu dipastikan aktif di dashboard Cloudflare-nya (di luar jangkauan saya dari sini) supaya fix upload-time (poin 5a) beneran jalan di production, bukan cuma fallback ke `sharp`/buffer asli.
4. Belum menjalankan `scripts/mass-compress.ts` lagi setelah ini karena memang tidak relevan (Supabase Storage kosong dari foto model) — tapi tetap berguna untuk masa depan kalau suatu saat ada foto yang benar-benar masuk ke Supabase Storage.
