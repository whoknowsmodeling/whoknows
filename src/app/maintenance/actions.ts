"use server";

import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";
import { compare } from "bcrypt-ts";

export async function unlockWebsite(password: string) {
  try {
    // 1. Fetch website settings from DB
    const { data: settings, error } = await supabaseAdmin
      .from("website_settings")
      .select("website_password_hash, allow_admin_password")
      .eq("id", "default")
      .single();

    if (error || !settings) {
      return { success: false, error: "Settings not found." };
    }

    let isMatch = false;

    // 2. Check website access password
    if (settings.website_password_hash) {
      isMatch = await compare(password, settings.website_password_hash);
    }

    // 3. Check admin passwords if allowed and not matched yet
    if (!isMatch && settings.allow_admin_password) {
      const { data: admins, error: adminError } = await supabaseAdmin
        .from("AdminUser")
        .select("password");

      if (!adminError && admins) {
        for (const admin of admins) {
          if (admin.password) {
            const adminMatch = await compare(password, admin.password);
            if (adminMatch) {
              isMatch = true;
              break;
            }
          }
        }
      }
    }

    if (!isMatch) {
      return { success: false, error: "Password salah." };
    }

    // 4. Set bypass cookie
    // Cookie token: SHA-256 of (website_password_hash + AUTH_SECRET)
    const secret = process.env.AUTH_SECRET || "default_secret";
    const passwordHash = settings.website_password_hash || "";
    
    const msgUint8 = new TextEncoder().encode(passwordHash + secret);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const token = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    const cookieStore = await cookies();
    cookieStore.set("whoknows_maintenance_bypass", token, {
      path: "/",
      maxAge: 60 * 60 * 24, // 24 jam
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return { success: true };
  } catch (err: any) {
    console.error("Unlock error:", err);
    return { success: false, error: "Terjadi kesalahan sistem." };
  }
}
