import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = 'edge';

export async function GET() {
  const results: Record<string, { ok: boolean; count?: number; error?: string }> = {};

  // Test Model table
  const modelResult = await supabaseAdmin.from("Model").select("*", { count: "exact", head: true });
  results.Model = modelResult.error
    ? { ok: false, error: modelResult.error.message }
    : { ok: true, count: modelResult.count ?? 0 };

  // Test ModelImage table + isFace column
  const faceResult = await supabaseAdmin.from("ModelImage").select("*", { count: "exact", head: true }).eq("isFace", true);
  results.ModelImage_isFace = faceResult.error
    ? { ok: false, error: faceResult.error.message }
    : { ok: true, count: faceResult.count ?? 0 };

  // Test isPrimeWomen column
  const womenPrimeResult = await supabaseAdmin.from("ModelImage").select("*", { count: "exact", head: true }).eq("isPrimeWomen", true);
  results.ModelImage_isPrimeWomen = womenPrimeResult.error
    ? { ok: false, error: womenPrimeResult.error.message }
    : { ok: true, count: womenPrimeResult.count ?? 0 };

  // Test isPrimeMen column
  const menPrimeResult = await supabaseAdmin.from("ModelImage").select("*", { count: "exact", head: true }).eq("isPrimeMen", true);
  results.ModelImage_isPrimeMen = menPrimeResult.error
    ? { ok: false, error: menPrimeResult.error.message }
    : { ok: true, count: menPrimeResult.count ?? 0 };

  // Test Campaign table
  const campaignResult = await supabaseAdmin.from("Campaign").select("*", { count: "exact", head: true });
  results.Campaign = campaignResult.error
    ? { ok: false, error: campaignResult.error.message }
    : { ok: true, count: campaignResult.count ?? 0 };

  // Test HeroSlide table
  const heroResult = await supabaseAdmin.from("HeroSlide").select("*", { count: "exact", head: true });
  results.HeroSlide = heroResult.error
    ? { ok: false, error: heroResult.error.message }
    : { ok: true, count: heroResult.count ?? 0 };

  // Test Client table
  const clientResult = await supabaseAdmin.from("Client").select("*", { count: "exact", head: true });
  results.Client = clientResult.error
    ? { ok: false, error: clientResult.error.message }
    : { ok: true, count: clientResult.count ?? 0 };

  const allOk = Object.values(results).every((r) => r.ok);

  return NextResponse.json(
    { status: allOk ? "ok" : "error", tables: results },
    { status: allOk ? 200 : 500 }
  );
}
