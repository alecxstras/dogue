import { prisma } from "@/lib/prisma";
import { LeaderboardTable } from "@/components/LeaderboardTable";

export const revalidate = 60;

export default async function LeaderboardPage() {
  const topGuessers = await prisma.guess.groupBy({
    by: ["userId"],
    _sum: { pointsEarned: true },
    orderBy: { _sum: { pointsEarned: "desc" } },
    take: 10,
  });

  const userIds = topGuessers.map((guesser) => guesser.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, name: true, image: true },
  });

  const leaderboard = topGuessers.map((entry, index) => {
    const user = users.find((u) => u.id === entry.userId);
    return {
      rank: index + 1,
      name: user?.name ?? "Anonymous",
      image: user?.image,
      totalPoints: entry._sum.pointsEarned ?? 0,
    };
  });

  return (
    <main className="container mx-auto px-4 py-8 pb-24 max-w-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
      <p className="text-sm text-gray-500 mb-8">Top pet name guessers</p>
      <LeaderboardTable entries={leaderboard} />
    </main>
  );
}
