import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const AGENDA_LABELS: Record<string, string> = {
  general: "General Query",
  sponsorship: "Sponsorship & Partnership",
  events: "Events & Collaboration",
  media: "Media & Press",
  other: "Other",
};

// ── In-memory rate limiter (5 requests / 60 s per IP) ─────────────────────────
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// ── HTML escape to prevent XSS in email body ──────────────────────────────────
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  // CSRF: verify Origin matches our domain
  const origin = req.headers.get("origin") ?? "";
  const allowedOrigin =
    process.env.NODE_ENV === "development"
      ? true
      : origin.includes("awssbg-srmist.in");
  if (!allowedOrigin) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  const body = await req.json();
  const { name, email, subject, agenda, message, attachmentLink } = body;

  // Presence check
  if (!name || !email || !subject || !agenda || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  // Length + format validation
  if (
    typeof name !== "string" || name.length > 100 ||
    typeof email !== "string" || email.length > 200 || !email.includes("@") ||
    typeof subject !== "string" || subject.length > 200 ||
    typeof message !== "string" || message.length > 5000 ||
    (attachmentLink && (typeof attachmentLink !== "string" || attachmentLink.length > 500))
  ) {
    return NextResponse.json({ error: "Invalid field values." }, { status: 400 });
  }

  // Attachment must be https:// if provided
  if (attachmentLink && !String(attachmentLink).startsWith("https://")) {
    return NextResponse.json({ error: "Attachment link must be a secure https:// URL." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const agendaLabel = AGENDA_LABELS[agenda] ?? esc(agenda);

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;padding:32px;">
      <h2 style="margin:0 0 24px;font-size:22px;color:#111;">New Contact Form Submission</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Name</td><td style="padding:8px 0;font-weight:600;color:#111;">${esc(name)}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;color:#111;"><a href="mailto:${esc(email)}" style="color:#7c3aed;">${esc(email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Subject</td><td style="padding:8px 0;font-weight:600;color:#111;">${esc(subject)}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Agenda</td><td style="padding:8px 0;color:#111;">${agendaLabel}</td></tr>
        ${attachmentLink ? `<tr><td style="padding:8px 0;color:#6b7280;">Attachment</td><td style="padding:8px 0;"><a href="${esc(attachmentLink)}" style="color:#7c3aed;">${esc(attachmentLink)}</a></td></tr>` : ""}
      </table>
      <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e5e7eb;">
        <p style="margin:0 0 8px;color:#6b7280;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
        <p style="margin:0;color:#111;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(message)}</p>
      </div>
      <p style="margin-top:32px;font-size:12px;color:#9ca3af;">Sent via awssbg-srmist.in contact form</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"AWS SBG Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO,
    replyTo: esc(email),
    subject: `[${agendaLabel}] ${esc(subject)}`,
    html,
  });

  return NextResponse.json({ success: true });
}
