import { NextResponse } from "next/server";
import { authenticate, setSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email || "");
  const password = String(body?.password || "");
  const user = authenticate(email, password);
  if (!user) {
    return NextResponse.json({ ok: false, error: "Unknown email or password." }, { status: 401 });
  }
  await setSession(user);
  return NextResponse.json({ ok: true, user });
}
