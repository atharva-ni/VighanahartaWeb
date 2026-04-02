import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validateInput({ name, email, message }) {
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return "Name, email, and message are required.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please provide a valid email address.";
  }

  return null;
}

export async function POST(request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const validationError = validateInput(body || {});

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { name, email, message } = body;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const to = process.env.RESEND_TO_EMAIL || "vihanahartaengineers@gmail.com";

    await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New website inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(
        email
      )}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form send failed", error);
    return NextResponse.json(
      { error: "Unable to send message right now. Please try again later." },
      { status: 500 }
    );
  }
}
