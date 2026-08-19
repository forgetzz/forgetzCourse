import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
    const { captcha } = await req.json();

        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                   secret: process.env.TURNSTILE_SECRET_KEY!,
                response: captcha
            })



        })

        const data = await response.json();

        return NextResponse.json({
            success: data.success,
        });
    } catch {
        return NextResponse.json({ success: false }, { status: 500 })
    }


}