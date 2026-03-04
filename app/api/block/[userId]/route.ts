import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// DELETE /api/block/[userId] — unblock a user
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.block.deleteMany({
    where: {
      blockerId: session.user.id,
      blockedId: params.userId,
    },
  });

  return NextResponse.json({ ok: true });
}
