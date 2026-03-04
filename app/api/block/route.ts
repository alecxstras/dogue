import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/block — block a user
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = await req.json();
  if (!userId || userId === session.user.id) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  try {
    await prisma.block.create({
      data: { blockerId: session.user.id, blockedId: userId },
    });
    return NextResponse.json({ ok: true });
  } catch {
    // Already blocked — idempotent, treat as success
    return NextResponse.json({ ok: true });
  }
}
