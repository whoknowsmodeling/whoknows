import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const email = process.env.ADMIN_EMAIL || "whoknowsmodeling@gmail.com";
    const password = process.env.ADMIN_PASSWORD || "Car4sale123!";
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await db.adminUser.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: "admin",
      },
      create: {
        email,
        password: hashedPassword,
        name: "Super Admin",
        role: "admin",
      },
    });

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
