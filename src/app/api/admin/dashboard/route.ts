import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getStore, saveStore } from "@/lib/store";

export async function GET() {
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const store = await getStore();
  return NextResponse.json({ count: store.dashboardPoints.length, sample: store.dashboardPoints.slice(0, 8) });
}

export async function PUT(request: Request) {
  const user = await getSession();
  if (!user || user.role !== "administrator") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await request.json();
  if (!body.point) return NextResponse.json({ error: "Missing point" }, { status: 400 });
  const p = body.point;
  await saveStore((s) => {
    const i = s.dashboardPoints.findIndex(
      (x) =>
        x.indicatorId === p.indicatorId &&
        x.state === p.state &&
        x.year === Number(p.year) &&
        x.residence === p.residence &&
        x.sex === p.sex &&
        x.age === p.age &&
        x.ses === p.ses,
    );
    if (i >= 0) s.dashboardPoints[i].value = Number(p.value);
    else
      s.dashboardPoints.push({
        indicatorId: p.indicatorId,
        state: p.state,
        year: Number(p.year),
        residence: p.residence,
        sex: p.sex,
        age: p.age,
        ses: p.ses,
        value: Number(p.value),
      });
  });
  return NextResponse.json({ ok: true });
}
