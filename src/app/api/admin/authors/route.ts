import { NextResponse } from "next/server";
import { canManageUsers, getSession } from "@/lib/auth";
import { getStore, saveStore } from "@/lib/store";
import type { Author } from "@/lib/types";
import { slugify, uid } from "@/lib/utils";

export async function GET() {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const store = await getStore();
  return NextResponse.json({ authors: store.authors });
}

export async function POST(request: Request) {
  const user = await getSession();
  if (!user || (!canManageUsers(user.role) && user.role !== "editor")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json();
  const name = String(body.name || "").trim();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });
  const author: Author = {
    id: uid("auth"),
    name,
    slug: slugify(name),
    role: String(body.role || "Guest contributor"),
    bio: String(body.bio || ""),
    affiliation: String(body.affiliation || "Independent"),
    email: String(body.email || ""),
    isGuest: Boolean(body.isGuest),
    isSample: false,
  };
  await saveStore((s) => {
    s.authors.push(author);
  });
  return NextResponse.json({ author });
}
