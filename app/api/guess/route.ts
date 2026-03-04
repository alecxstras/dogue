import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { POINTS_PER_CORRECT_GUESS, namesMatch } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { petId, guessedName } = await req.json();

  if (!petId || !guessedName?.trim()) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const userId = session.user.id;

  const existing = await prisma.guess.findUnique({
    where: { userId_petId: { userId, petId } },
  });
  if (existing) {
    return NextResponse.json({ error: "Already guessed" }, { status: 409 });
  }

  const pet = await prisma.pet.findUnique({ where: { id: petId } });
  if (!pet) {
    return NextResponse.json({ error: "Pet not found" }, { status: 404 });
  }
  if (pet.ownerId === userId) {
    return NextResponse.json({ error: "Cannot guess your own pet" }, { status: 403 });
  }

  const isCorrect = namesMatch(guessedName, pet.name);
  const pointsEarned = isCorrect ? POINTS_PER_CORRECT_GUESS : 0;

  await prisma.$transaction([
    prisma.guess.create({
      data: {
        userId,
        petId,
        guessedName: guessedName.trim(),
        isCorrect,
        pointsEarned,
      },
    }),
    prisma.pet.update({
      where: { id: petId },
      data: {
        guessCount: { increment: 1 },
        ...(isCorrect && { correctGuessCount: { increment: 1 } }),
      },
    }),
  ]);

  return NextResponse.json({
    isCorrect,
    pointsEarned,
    correctName: isCorrect ? pet.name : undefined,
  });
}
