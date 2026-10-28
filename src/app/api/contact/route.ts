import { NextResponse } from "next/server";
import { saveStore } from "@/lib/store";
import { uid } from "@/lib/utils";

export async function POST(request: Request) {
  const form = await request.formData();
  const company = String(form.get("company") || "");
  if (company) return NextResponse.json({ ok: true });

  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const topic = String(form.get("topic") || "enquiry");
  const message = String(form.get("message") || "").trim();
  if (name.length < 2) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }
  if (!["collaboration", "submission", "enquiry"].includes(topic)) {
    return NextResponse.json({ ok: false, error: "Choose a topic." }, { status: 400 });
  }
  if (message.length < 20) {
    return NextResponse.json({ ok: false, error: "Message should be at least 20 characters." }, { status: 400 });
  }
  await saveStore((store) => {
    store.inquiries.unshift({
      id: uid("inq"),
      name,
      email,
      topic: topic as "collaboration" | "submission" | "enquiry",
      message,
      createdAt: new Date().toISOString(),
      status: "new",
    });
  });
  return NextResponse.json({ ok: true });
}
