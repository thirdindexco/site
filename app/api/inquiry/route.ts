import { NextResponse } from "next/server";
import { Resend } from "resend";

// RESEND_API_KEY must be set in .env.local (or the deployment env).
// RESEND_FROM should be a verified sender on your Resend domain —
// e.g. "inquiries@thirdindex.co". Falls back to Resend's dev sender
// which only delivers to the account owner's verified email.
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM ?? "onboarding@resend.dev";
const TO = "hello@thirdindex.co";

type Payload = {
  name?: string;
  email?: string;
  projectType?: string;
  timeline?: string;
  description?: string;
};

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "email service not configured" },
      { status: 503 },
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { name, email, projectType, timeline, description } = body;

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json(
      { error: "name and email required" },
      { status: 400 },
    );
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    `Project type: ${projectType || "—"}`,
    `Timeline: ${timeline || "—"}`,
    "",
    "Description:",
    description || "—",
  ].join("\n");

  try {
    const result = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `inquiry from ${name}`,
      text,
    });

    if (result.error) {
      console.error("resend error:", result.error);
      return NextResponse.json({ error: "failed to send" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch (err) {
    console.error("inquiry error:", err);
    return NextResponse.json({ error: "failed to send" }, { status: 500 });
  }
}
