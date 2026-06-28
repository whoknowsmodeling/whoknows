import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabase";
import { MaintenanceUnlockForm } from "@/components/forms/MaintenanceUnlockForm";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function MaintenancePage() {
  // Fetch settings directly from Supabase DB
  const { data: settings } = await supabaseAdmin
    .from("website_settings")
    .select("*")
    .eq("id", "default")
    .single();

  const title = settings?.maintenance_title || "Under Maintenance";
  const subtitle = settings?.maintenance_subtitle || "We'll be back shortly.";
  const description = settings?.maintenance_description || "The site is currently undergoing scheduled maintenance. Please check back soon.";
  const buttonText = settings?.button_text || "Enter";
  const placeholderText = settings?.password_placeholder || "Enter Password";
  const footerText = settings?.footer_text || "© WhoKnows Models. All Rights Reserved.";
  const logoUrl = settings?.logo;
  const bgImage = settings?.background_image;

  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center text-white bg-black p-6 font-sans">
      {/* Background Image with Dark Overlay */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="Background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
        </div>
      )}

      {/* Spacer / Header */}
      <div className="relative z-10 w-full flex justify-center py-6 lg:py-10">
        {logoUrl ? (
          <div className="relative h-12 w-48">
            <Image
              src={logoUrl}
              alt="Logo"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        ) : (
          <span className="font-serif text-2xl font-bold tracking-tight text-white">
            WhoKnows<span className="font-light">Models</span>
          </span>
        )}
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center my-auto px-4">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4 uppercase">
          {title}
        </h1>
        
        <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-neutral-400 mb-8 font-semibold">
          {subtitle}
        </p>
        
        <div className="h-[1px] w-20 bg-neutral-800 mb-8" />
        
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-lg mb-12">
          {description}
        </p>

        {/* Unlock Form */}
        <MaintenanceUnlockForm
          buttonText={buttonText}
          placeholderText={placeholderText}
        />
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-6 border-t border-white/5">
        <p className="text-neutral-500 text-[10px] lg:text-xs tracking-[0.15em] uppercase font-medium">
          {footerText}
        </p>
      </footer>
    </div>
  );
}
