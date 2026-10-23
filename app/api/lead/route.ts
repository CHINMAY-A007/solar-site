import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").replace(/\D/g, "");
  const email = String(body.email ?? "").trim();
  const city = String(body.city ?? "").trim();

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ ok: false, error: "Invalid name" }, { status: 400 });
  }
  if (phone.length < 10 || phone.length > 13) {
    return NextResponse.json({ ok: false, error: "Invalid phone" }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const lead = {
    name,
    phone,
    email: email || null,
    city: city || null,
    propertyType: body.propertyType ?? null,
    monthlyBill: body.monthlyBill ?? null,
    message: body.message ?? null,
    source: body.source ?? "unknown",
    timestamp: new Date().toISOString(),
  };

  // Demo only: append to a local file. Production should use a real database
  // and send an email or WhatsApp notification.
  try {
    const filePath = path.join(process.cwd(), "data", "leads.jsonl");
    fs.appendFileSync(filePath, JSON.stringify(lead) + "\n");
  } catch {
    // ignore write errors in demo
  }

  return NextResponse.json({ ok: true });
}
