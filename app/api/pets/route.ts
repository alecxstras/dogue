import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cloudinary } from "@/lib/cloudinary";

// GET /api/pets — returns one random pet the user hasn't guessed and doesn't own
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const [guessedPetIds, blockedUserIds] = await Promise.all([
    prisma.guess
      .findMany({ where: { userId }, select: { petId: true } })
      .then((guesses) => guesses.map((g) => g.petId)),
    prisma.block
      .findMany({ where: { blockerId: userId }, select: { blockedId: true } })
      .then((blocks) => blocks.map((b) => b.blockedId)),
  ]);

  const where = {
    ownerId: { not: userId, notIn: blockedUserIds },
    id: { notIn: guessedPetIds },
  };

  const totalEligible = await prisma.pet.count({ where });

  if (totalEligible === 0) {
    return NextResponse.json({ pet: null });
  }

  const skip = Math.floor(Math.random() * totalEligible);

  const pet = await prisma.pet.findFirst({
    where,
    select: {
      id: true,
      ownerId: true,
      imageUrl: true,
      guessCount: true,
      correctGuessCount: true,
      owner: { select: { name: true, username: true, image: true } },
      // 'name' (pet name) intentionally excluded
    },
    skip,
  });

  return NextResponse.json({ pet });
}

// POST /api/pets — upload a new pet
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const petName = (formData.get("name") as string | null)?.trim();

  if (!file || !petName) {
    return NextResponse.json({ error: "Missing file or name" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult = await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "dogue", resource_type: "image" },
          (err, result) => {
            if (err || !result) return reject(err ?? new Error("Upload failed"));
            resolve(result as { secure_url: string });
          }
        )
        .end(buffer);
    }
  );

  const pet = await prisma.pet.create({
    data: {
      name: petName,
      imageUrl: uploadResult.secure_url,
      ownerId: session.user.id,
    },
  });

  return NextResponse.json(
    { pet: { id: pet.id, imageUrl: pet.imageUrl } },
    { status: 201 }
  );
}
