import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getStore, saveStore } from "@/lib/store";

export async function GET() {
  const user = await getSession();
  if (!user || user.role === "contributor") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const store = await getStore();
  return NextResponse.json({ inquiries: store.inquiries });
}

export async function PUT(request: Request) {
  const user = await getSession();
  if (!user || user.role === "contributor") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json();
  await saveStore((s) => {
    const item = s.inquiries.find((i) => i.id === body.id);
    if (item) item.status = "read";
  });
  return NextResponse.json({ ok: true });
}
