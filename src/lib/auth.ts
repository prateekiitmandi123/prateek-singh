import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import type { SessionUser, UserRole } from "@/lib/types";

const SECRET = process.env.AUTH_SECRET || "dev-only-change-in-production-prateek-site";
const COOKIE = "ps_session";

export const demoUsers: Array<SessionUser & { password: string }> = [
  {
    id: "admin",
    name: "Site administrator",
    email: "admin@local",
    role: "administrator",
    password: "admin123",
  },
  {
    id: "editor",
    name: "Editor",
    email: "editor@local",
    role: "editor",
    password: "editor123",
  },
  {
    id: "contributor",
    name: "Contributor",
    email: "contributor@local",
    role: "contributor",
    password: "contrib123",
  },
];

function sign(payload: string) {
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function createToken(user: SessionUser) {
  const payload = Buffer.from(JSON.stringify(user), "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readToken(token: string): SessionUser | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SessionUser;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  return readToken(token);
}

export async function setSession(user: SessionUser) {
  const jar = await cookies();
  jar.set(COOKIE, createToken(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export function canPublish(role: UserRole) {
  return role === "administrator" || role === "editor";
}

export function canManageUsers(role: UserRole) {
  return role === "administrator";
}

export function canEditArticle(role: UserRole, authorIds: string[], userId: string) {
  if (role === "administrator" || role === "editor") return true;
  return authorIds.includes(userId) || authorIds.includes("prateek-singh");
}

export function authenticate(email: string, password: string) {
  const user = demoUsers.find((u) => u.email === email && u.password === password);
  if (!user) return null;
  const { password: _pw, ...session } = user;
  void _pw;
  return session;
}
