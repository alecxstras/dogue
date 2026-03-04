import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const VALID_REASONS = [
  "Inappropriate content",
  "Offensive image",
  "Spam",
  "Harassment",
  "Other",
];

// POST /api/report — report a pet or user
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { petId, reportedUserId, reason } = await req.json();

  if (!reason || !VALID_REASONS.includes(reason)) {
    return NextResponse.json({ error: "Invalid reason" }, { status: 400 });
  }
  if (!petId && !reportedUserId) {
    return NextResponse.json(
      { error: "Must provide petId or reportedUserId" },
      { status: 400 }
    );
  }

  await prisma.report.create({
    data: {
      reporterId: session.user.id,
      reportedPetId: petId ?? null,
      reportedUserId: reportedUserId ?? null,
      reason,
    },
  });

  return NextResponse.json({ ok: true });
}
