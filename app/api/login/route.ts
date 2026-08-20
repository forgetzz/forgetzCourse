import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { adminAuth } from "@/lib/firebase-admin";

const SESSION_EXPIRES_IN = 1000 * 60 * 60 * 24 * 5;

export async function POST(request: NextRequest) {
  try {
    const { username, password, captcha } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password harus diisi." },
        { status: 400 }
      );
    }

    if (!captcha) {
      return NextResponse.json(
        { error: "Captcha wajib diisi." },
        { status: 400 }
      );
    }

    // ==========================================
    // 1. VERIFIKASI CAPTCHA
    // ==========================================

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const captchaResponse = await fetch(`${baseUrl}/api/captcha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        captcha,
      }),
    });

    if (!captchaResponse.ok) {
      return NextResponse.json(
        { error: "Gagal verifikasi captcha." },
        { status: 400 }
      );
    }

    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return NextResponse.json(
        { error: "Captcha gagal diverifikasi." },
        { status: 400 }
      );
    }

    // ==========================================
    // 2. CARI USERNAME DI FIRESTORE
    // ==========================================

    const db = getFirestore();

    const snapshot = await db
      .collection("users")
      .where("username", "==", username)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: "Username atau password salah." },
        { status: 401 }
      );
    }

    const userData = snapshot.docs[0].data();

    if (!userData.email) {
      return NextResponse.json(
        { error: "Data user tidak memiliki email." },
        { status: 500 }
      );
    }

    // ==========================================
    // 3. LOGIN FIREBASE AUTH
    // ==========================================

    const firebaseResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const firebaseData = await firebaseResponse.json();

    if (!firebaseResponse.ok) {
      console.error("Firebase Auth error:", firebaseData);

      return NextResponse.json(
        { error: "Username atau password salah." },
        { status: 401 }
      );
    }

    const idToken = firebaseData.idToken;

    if (!idToken) {
      return NextResponse.json(
        { error: "Firebase tidak mengembalikan ID token." },
        { status: 500 }
      );
    }

    // ==========================================
    // 4. BUAT SESSION COOKIE
    // ==========================================

    const sessionCookie = await adminAuth.createSessionCookie(
      idToken,
      {
        expiresIn: SESSION_EXPIRES_IN,
      }
    );

    // ==========================================
    // 5. SET COOKIE
    // ==========================================

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_EXPIRES_IN / 1000,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat login.",
      },
      { status: 500 }
    );
  }
}