import { NextResponse } from "next/server";
import { admin, db } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      username,
      bank,
      password,
      rekening,
      whatsapp,
    } = await req.json();

    // Validasi
    if (
      !name ||
      !email ||
      !username ||
      !bank ||
      !password ||
      !rekening ||
      !whatsapp
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Mohon lengkapi semua data yang dibutuhkan.",
        },
        { status: 400 }
      );
    }

    // Cek username
    const usernameQuery = await db
      .collection("users")
      .where("username", "==", username)
      .limit(1)
      .get();

    if (!usernameQuery.empty) {
      return NextResponse.json(
        {
          success: false,
          message: "Username sudah digunakan.",
        },
        { status: 400 }
      );
    }

    // Buat akun Firebase Auth
const newUser = await admin.auth().createUser({
  email,
  password,
});

    const uid = newUser.uid;
    await db.collection("users").doc(uid).set({
      uid,
      name,
      email,
      username,
      bank,
      rekening,
      whatsapp,
       levelAccount: 1,
      createdAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registrasi berhasil.",
        uid,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("REGISTER ERROR:", err);

    // Email sudah terdaftar
    if (err?.code === "auth/email-already-exists") {
      return NextResponse.json(
        {
          success: false,
          message: "Email sudah terdaftar.",
        },
        { status: 400 }
      );
    }

    // Password Firebase terlalu lemah
    if (err?.code === "auth/password-does-not-meet-requirements") {
      return NextResponse.json(
        {
          success: false,
          message: "Password belum memenuhi persyaratan.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Registrasi gagal. Silakan coba lagi.",
      },
      { status: 500 }
    );
  }
}