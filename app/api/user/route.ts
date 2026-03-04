import { NextRequest, NextResponse } from "next/server";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PATCH /api/user — update username
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { username } = await req.json();
  const trimmed = (username as string | undefined)?.trim();

  if (!trimmed) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }
  if (trimmed.length < 2 || trimmed.length > 30) {
    return NextResponse.json(
      { error: "Username must be 2–30 characters" },
      { status: 400 }
    );
  }
  if (!/^[a-zA-Z0-9_.-]+$/.test(trimmed)) {
    return NextResponse.json(
      { error: "Only letters, numbers, _, ., - allowed" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { username: trimmed },
      select: { username: true },
    });
    return NextResponse.json({ username: user.username });
  } catch {
    return NextResponse.json(
      { error: "Username already taken" },
      { status: 409 }
    );
  }
}

// DELETE /api/user — delete own account
export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.user.delete({ where: { id: session.user.id } });

  await signOut({ redirect: false });

  return NextResponse.json({ ok: true });
}
