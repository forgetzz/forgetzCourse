import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";

export async function GET() {
    try {
        const cookieStore = await cookies();

        const sessionCookie =
            cookieStore.get("session")?.value;

        if (!sessionCookie) {
            return NextResponse.json(
                {
                    user: null,
                },
                { status: 401 }
            );
        }

        const decodedClaims =
            await adminAuth.verifySessionCookie(
                sessionCookie,
                true
            );

        return NextResponse.json({
            user: {
                uid: decodedClaims.uid,
                email: decodedClaims.email ?? null,
                name: decodedClaims.name ?? null,
                picture: decodedClaims.picture ?? null,
            },
        });
    } catch (error) {
        console.error("ME ERROR:", error);

        return NextResponse.json(
            {
                user: null,
            },
            { status: 401 }
        );
    }
}