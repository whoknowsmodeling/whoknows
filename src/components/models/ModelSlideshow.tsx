"use client";

import { useState, useEffect, useRef } from "react";
import { Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Solid white 1×1 placeholder ────────────────────────────────
const WHITE_BLUR =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==";

// ─── Custom SVG cursor arrows ────────────────────────────────────
const LEFT_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'%3E%3Cline x1='36' y1='22' x2='8' y2='22' stroke='%23111' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpolyline points='18,13 8,22 18,31' fill='none' stroke='%23111' stroke-width='1.5' stroke-linejoin='round' stroke-linecap='round'/%3E%3C/svg%3E") 22 22, w-resize`;

const RIGHT_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'%3E%3Cline x1='8' y1='22' x2='36' y2='22' stroke='%23111' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpolyline points='26,13 36,22 26,31' fill='none' stroke='%23111' stroke-width='1.5' stroke-linejoin='round' stroke-linecap='round'/%3E%3C/svg%3E") 22 22, e-resize`;

interface ModelImage {
  id: string;
  imageUrl: string;
  alt?: string | null;
  order: number;
}

interface Slide {
  images: ModelImage[];
  isDiptych: boolean;
}

interface ModelSlideshowProps {
  images: ModelImage[];
  modelName: string;
  measurements: { label: string; value: string }[];
  bio: string | null;
}

interface ImgDims {
  width: number;
  height: number;
  isLandscape: boolean;
}

function buildSlides(images: ModelImage[], dims: Record<string, ImgDims>): Slide[] {
  const slides: Slide[] = [];
  let i = 0;
  while (i < images.length) {
    const imgA = images[i];
    const isLandA = dims[imgA.id]?.isLandscape ?? false;
    if (!isLandA && i + 1 < images.length) {
      const imgB = images[i + 1];
      const isLandB = dims[imgB.id]?.isLandscape ?? false;
      if (!isLandB) {
        slides.push({ images: [imgA, imgB], isDiptych: true });
        i += 2;
        continue;
      }
    }
    slides.push({ images: [imgA], isDiptych: false });
    i += 1;
  }
  return slides;
}

export function ModelSlideshow({
  images,
  modelName,
  measurements,
  bio,
}: ModelSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);
  const [imgDims, setImgDims] = useState<Record<string, ImgDims>>({});
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const slides = buildSlides(images, imgDims);
  const total = slides.length;
  const safeSlide = Math.min(currentSlide, Math.max(0, total - 1));

  const goNext = () => setCurrentSlide((p) => (p + 1) % total);
  const goPrev = () => setCurrentSlide((p) => (p - 1 + total) % total);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    setHoverSide(e.clientX - left < width / 2 ? "left" : "right");
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't navigate if clicking interactive elements
    if ((e.target as HTMLElement).closest("a, button, [data-noclick]")) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    if (e.clientX - left < width / 2) goPrev();
    else goNext();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const handleImageLoad = (id: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    setImgDims((prev) => ({
      ...prev,
      [id]: { width: w, height: h, isLandscape: w > h },
    }));
  };

  // ─── PDF: Open a clean popup with only photo + name + stats ───
  const handleDownloadPDF = () => {
    const slide = slides[safeSlide];
    if (!slide) return;

    const firstImg = slide.images[0];
    const d = imgDims[firstImg?.id];
    const isLandscape = d?.isLandscape ?? false;

    const nameParts = modelName.trim().split(" ");
    const fn = nameParts[0] ?? "";
    const ln = nameParts.slice(1).join(" ").toUpperCase();

    const heightVal = measurements.find((m) => m.label.toLowerCase() === "height")?.value ?? "";
    const statsLine = measurements
      .filter((m) => ["height", "chest", "waist", "hips"].includes(m.label.toLowerCase()))
      .map((m) => `<span style="color:#888;font-size:8px;letter-spacing:0.15em;text-transform:uppercase;">${m.label}</span>&nbsp;<span style="font-size:9px;">${m.value}</span>`)
      .join("&nbsp;&nbsp;&nbsp;&nbsp;");

    const imagesHTML = slide.images
      .map(
        (img) => `
        <img src="${img.imageUrl}" alt="${modelName}"
          style="flex:1;max-height:${isLandscape ? "55%" : "72%"};width:${slide.images.length > 1 ? "48%" : "auto"};object-fit:cover;object-position:top;display:block;" />`
      )
      .join("");

    const pageOrientation = isLandscape ? "landscape" : "portrait";

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page { size: A4 ${pageOrientation}; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; height: 100%; background: #fff; }
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
  body {
    font-family: 'Playfair Display', Georgia, serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    padding: ${isLandscape ? "24px 32px" : "32px 24px"};
  }
  .photos {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    flex: 1;
  }
  .photos img {
    max-width: ${slide.images.length > 1 ? "49%" : "60%"};
    max-height: ${isLandscape ? "52vh" : "65vh"};
    object-fit: cover;
    object-position: top;
    display: block;
  }
  .name {
    margin-top: 20px;
    text-align: center;
    font-size: ${isLandscape ? "32px" : "40px"};
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.01em;
    color: #000;
  }
  .name em { font-style: italic; text-transform: uppercase; }
  .ig {
    margin-top: 8px;
    text-align: center;
    font-family: Arial, sans-serif;
    font-size: 9px;
    color: #888;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .stats {
    margin-top: 10px;
    text-align: center;
    font-family: Arial, sans-serif;
    font-size: 9px;
    color: #333;
    letter-spacing: 0.12em;
  }
  .stats .label { color: #888; text-transform: uppercase; }
  .divider {
    width: 40px;
    height: 1px;
    background: #e5e5e5;
    margin: 12px auto;
  }
</style>
</head>
<body>
  <div class="photos">
    ${imagesHTML}
  </div>
  <div class="name">${fn} <em>${ln}</em></div>
  <div class="ig">@${modelName.toLowerCase().replace(/\s+/g, ".")}</div>
  ${measurements.length > 0 ? `
  <div class="divider"></div>
  <div class="stats">
    ${measurements
      .filter((m) => ["height", "chest", "waist", "hips"].includes(m.label.toLowerCase()))
      .map((m) => `<span class="label">${m.label}</span>&nbsp;${m.value}`)
      .join("&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;")}
  </div>` : ""}
  <script>
    window.addEventListener('load', function() {
      setTimeout(function() { window.print(); }, 800);
    });
  </script>
</body>
</html>`;

    const pw = window.open("", "_blank", `width=${isLandscape ? 1122 : 794},height=${isLandscape ? 794 : 1122}`);
    if (!pw) {
      alert("Pop-up diblokir browser. Izinkan pop-up untuk mengunduh PDF.");
      return;
    }
    pw.document.write(html);
    pw.document.close();
  };

  if (images.length === 0) return null;

  const nameParts = modelName.trim().split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");
  const igHandle = `@${modelName.toLowerCase().replace(/\s+/g, ".")}`;

  // Hero stats: Height + up to 2 more measurements
  const heightM = measurements.find((m) => m.label.toLowerCase() === "height");
  const heroStats = measurements.filter((m) =>
    ["height", "chest", "waist"].includes(m.label.toLowerCase())
  );

  const slide = total > 0 ? slides[safeSlide] : null;

  return (
    /*
      FULL-VIEWPORT-WIDTH cursor zone — cursor detection fires across the
      entire row. Interactive elements (a, button) override cursor locally.
    */
    <div
      className="relative w-full bg-white text-black"
      style={{
        cursor: hoverSide === "left" ? LEFT_CURSOR : hoverSide === "right" ? RIGHT_CURSOR : "default",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverSide(null)}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ─── PHOTO SLIDESHOW ──────────────────────────────────────── */}
      <div className="w-full flex items-center justify-center select-none overflow-hidden min-h-[65vh]">
        {slide && (
          <div
            className={cn(
              "flex items-start justify-center gap-2 w-full",
              // Very narrow horizontal padding so photos almost touch the edges
              // but photos are still centered. Max-width constrains just enough.
              slide.isDiptych ? "max-w-5xl px-2" : "max-w-xl px-2"
            )}
          >
            {slide.images.map((img, idx) => {
              const d = imgDims[img.id];
              const aspectRatio = d ? `${d.width} / ${d.height}` : slide.isDiptych ? "3 / 4" : "2 / 3";
              const isLandscape = d?.isLandscape ?? false;
              return (
                <div
                  key={img.id}
                  className="relative flex-1 bg-neutral-100 overflow-hidden"
                  style={{
                    aspectRatio,
                    maxHeight: isLandscape ? "58vh" : "84vh",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.imageUrl}
                    alt={img.alt || modelName}
                    loading={currentSlide === 0 && idx === 0 ? "eager" : "lazy"}
                    onLoad={(e) => handleImageLoad(img.id, e)}
                    className="w-full h-full object-cover object-top"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Slide counter */}
        {total > 1 && (
          <div className="absolute top-3 right-4 text-[10px] tracking-widest text-neutral-400 pointer-events-none z-10 font-light">
            {safeSlide + 1}&thinsp;/&thinsp;{total}
          </div>
        )}

        {/* Right-edge arrow indicator — exactly like IMG Models */}
        {total > 1 && (
          <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-10 text-neutral-300 text-sm select-none">
            →
          </div>
        )}
      </div>

      {/* ─── MODEL INFO — centered, no separator line ─────────────── */}
      <div className="w-full pt-6 pb-16 relative">
        {/* DOWNLOAD PDF — absolutely top-right */}
        <div className="absolute top-6 right-6 z-10">
          <button
            data-noclick="true"
            onClick={handleDownloadPDF}
            className="text-[9px] uppercase tracking-[0.28em] text-neutral-400 hover:text-black transition-colors font-sans"
            style={{ cursor: "pointer" }}
          >
            Download PDF
          </button>
        </div>

        {/* Name — CENTERED, large serif */}
        <div className="text-center px-4">
          <h1
            className="font-serif leading-none tracking-tight inline"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", fontWeight: 400 }}
          >
            <span style={{ fontStyle: "normal" }}>{firstName}</span>
            {lastName ? (
              <>
                {" "}
                <span style={{ fontStyle: "italic", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                  {lastName}
                </span>
              </>
            ) : null}
          </h1>
        </div>

        {/* Instagram handle — centered */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <Instagram className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <a
            href={`https://instagram.com/${igHandle.slice(1)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-500 hover:text-black transition-colors tracking-widest font-sans"
            style={{ cursor: "pointer" }}
          >
            {igHandle}
          </a>
        </div>

        {/* HEIGHT · WAIST — centered, small caps like IMG Models */}
        {heroStats.length > 0 && (
          <div className="flex items-center justify-center gap-6 mt-3 flex-wrap">
            {heroStats.map(({ label, value }) => (
              <span key={label} className="font-sans text-[10px] tracking-[0.18em] text-neutral-500">
                <span className="text-neutral-400 uppercase">{label}</span>
                {" "}
                <span className="text-neutral-700">{value}</span>
              </span>
            ))}
          </div>
        )}

        {/* Full measurements grid — small, centered */}
        {measurements.length > 0 && (
          <div className="mt-8 border-t border-neutral-100 pt-6 max-w-3xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {measurements.map(({ label, value }) => (
                <div key={label} className="text-center">
                  <span className="block text-[8px] uppercase tracking-[0.22em] text-neutral-400 font-sans mb-0.5">
                    {label}
                  </span>
                  <span className="block text-sm text-black font-light font-sans">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bio */}
        {bio && (
          <div className="mt-8 max-w-xl mx-auto px-6 text-center">
            <p className="text-sm leading-relaxed text-neutral-400 font-light font-sans">{bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
