"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { hash } from "bcrypt-ts";

export async function resetAdminPasswordAction() {
  const adminEmail = "whoknowsmodeling@gmail.com";

  try {
    // 1. Check if the admin exists in DB
    const { data: admin, error: fetchError } = await supabaseAdmin
      .from("AdminUser")
      .select("id")
      .eq("email", adminEmail)
      .single();

    if (fetchError || !admin) {
      return { success: false, error: "Akun admin tidak ditemukan." };
    }

    // 2. Generate random temporary password (format: WK-XXXXXX)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomPart = "";
    for (let i = 0; i < 6; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const tempPassword = `WK-${randomPart}`;

    // 3. Hash temporary password
    const hashedPassword = await hash(tempPassword, 10);

    // 4. Update password in database
    const { error: updateError } = await supabaseAdmin
      .from("AdminUser")
      .update({ password: hashedPassword })
      .eq("email", adminEmail);

    if (updateError) {
      console.error("Reset password DB update error:", updateError);
      return { success: false, error: "Gagal memperbarui kata sandi di database." };
    }

    // 5. Send password to Formspree endpoint to email it to whoknowsmodeling@gmail.com
    const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL || "https://formspree.io/f/mjgpzrky";
    
    try {
      const response = await fetch(formspreeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          subject: "WHO KNOWS MODELS - ADMIN PASSWORD RESET",
          email: adminEmail,
          message: `Permintaan reset kata sandi admin telah diproses.\n\nKata sandi baru sementara Anda adalah:\n${tempPassword}\n\nSilakan segera masuk ke Dashboard Admin dan ganti kata sandi ini di menu Website Settings > Security demi keamanan.`,
        }),
      });

      if (!response.ok) {
        console.error("Formspree reset password send failed:", await response.text());
        return { success: false, error: "Gagal mengirimkan email melalui penyedia layanan." };
      }
    } catch (sendError) {
      console.error("Error sending email via Formspree:", sendError);
      return { success: false, error: "Gagal menghubungkan ke layanan email." };
    }

    return { success: true };
  } catch (err: any) {
    console.error("resetAdminPasswordAction error:", err);
    return { success: false, error: err.message || "Terjadi kesalahan sistem." };
  }
}
