import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { UsernameForm } from "@/components/UsernameForm";
import { DeleteAccountButton } from "@/components/DeleteAccountButton";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const userId = session.user.id;

  const [user, pointsAgg, guessCount, correctCount, pets] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { username: true } }),
    prisma.guess.aggregate({ where: { userId }, _sum: { pointsEarned: true } }),
    prisma.guess.count({ where: { userId } }),
    prisma.guess.count({ where: { userId, isCorrect: true } }),
    prisma.pet.findMany({
      where: { ownerId: userId },
      orderBy: { uploadedAt: "desc" },
      select: { id: true, name: true, imageUrl: true, guessCount: true, correctGuessCount: true },
    }),
  ]);

  const totalPoints = pointsAgg._sum.pointsEarned ?? 0;
  const accuracy = guessCount > 0 ? Math.round((correctCount / guessCount) * 100) : 0;
  const displayName = user?.username ?? session.user.name ?? "Anonymous";

  return (
    <main className="container mx-auto px-4 py-8 pb-24 max-w-lg space-y-8">
      {/* User header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center flex-shrink-0">
          {session.user.image ? (
            <Image src={session.user.image} alt="Profile" width={64} height={64} className="object-cover" />
          ) : (
            <span className="text-2xl font-bold text-orange-500">
              {displayName[0]?.toUpperCase() ?? "?"}
            </span>
          )}
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">{displayName}</h1>
          <p className="text-sm text-gray-500">{session.user.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-orange-50 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-orange-500">{totalPoints}</p>
          <p className="text-xs text-gray-500 mt-1">Points</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-500">{correctCount}</p>
          <p className="text-xs text-gray-500 mt-1">Correct</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-green-500">{accuracy}%</p>
          <p className="text-xs text-gray-500 mt-1">Accuracy</p>
        </div>
      </div>

      {/* Display name */}
      <UsernameForm currentUsername={user?.username ?? null} />

      {/* Uploaded pets */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">My Pets ({pets.length})</h2>
        {pets.length === 0 ? (
          <p className="text-gray-500 text-sm">You haven&apos;t uploaded any pets yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {pets.map((pet) => (
              <div key={pet.id} className="rounded-2xl overflow-hidden border bg-white shadow-sm">
                <div className="relative aspect-square">
                  <Image src={pet.imageUrl} alt={pet.name} fill className="object-cover" sizes="50vw" />
                </div>
                <div className="p-3">
                  <p className="font-semibold text-gray-900 truncate">{pet.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {pet.guessCount} guesses · {pet.correctGuessCount} correct
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Danger zone */}
      <DeleteAccountButton />
    </main>
  );
}
