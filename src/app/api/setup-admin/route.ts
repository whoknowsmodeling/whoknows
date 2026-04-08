import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { hash } from "bcrypt-ts";

export const runtime = 'edge';
export async function GET() {
  // Security Hardening: Only allow setup if explicitly enabled via environment variable
  if (process.env.ADMIN_SETUP_ENABLED !== "true") {
    return NextResponse.json({
      success: false,
      message: "Admin setup is disabled in production for security. Set ADMIN_SETUP_ENABLED=true to initialize.",
    }, { status: 403 });
  }

  try {
    const email = process.env.ADMIN_EMAIL || "whoknowsmodeling@gmail.com";
    const password = process.env.ADMIN_PASSWORD || "Car4sale123!";
    const hashedPassword = await hash(password, 10);

    // Use Edge-native Supabase SDK for setup
    const { data: admin, error } = await supabaseAdmin
      .from("AdminUser")
      .upsert({
        email,
        password: hashedPassword,
        name: "Super Admin",
        role: "admin",
      }, { onConflict: "email" })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Admin account initialized successfully",
      user: admin.email,
    });
  } catch (error: any) {
    console.error("Setup error:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to initialize Admin account",
      error: error.message,
    }, { status: 500 });
  }
}
