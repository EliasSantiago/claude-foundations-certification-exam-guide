import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { progress } from "@/lib/db/schema";
import { progressItemSchema } from "@/lib/validations";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const rows = await db
    .select({ itemKey: progress.itemKey })
    .from(progress)
    .where(eq(progress.userId, session.user.id));

  return NextResponse.json({ items: rows.map((r) => r.itemKey) });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida" }, { status: 400 });
  }

  const parsed = progressItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const { itemKey, completed } = parsed.data;
  const userId = session.user.id;

  if (completed) {
    await db
      .insert(progress)
      .values({ userId, itemKey })
      .onConflictDoNothing();
  } else {
    await db
      .delete(progress)
      .where(and(eq(progress.userId, userId), eq(progress.itemKey, itemKey)));
  }

  return NextResponse.json({ ok: true });
}
