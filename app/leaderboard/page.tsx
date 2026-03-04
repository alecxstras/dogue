import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LeaderboardTable } from "@/components/LeaderboardTable";

export const revalidate = 0; // personalized per viewer (block list)

export default async function LeaderboardPage() {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const blockedUserIds = currentUserId
    ? await prisma.block
        .findMany({ where: { blockerId: currentUserId }, select: { blockedId: true } })
        .then((blocks) => blocks.map((b) => b.blockedId))
    : [];

  const topGuessers = await prisma.guess.groupBy({
    by: ["userId"],
    where: blockedUserIds.length ? { userId: { notIn: blockedUserIds } } : undefined,
    _sum: { pointsEarned: true },
    orderBy: { _sum: { pointsEarned: "desc" } },
    take: 10,
  });

  const userIds = topGuessers.map((guesser) => guesser.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, name: true, username: true, image: true },
  });

  const leaderboard = topGuessers.map((entry, index) => {
    const user = users.find((u) => u.id === entry.userId);
    return {
      rank: index + 1,
      userId: entry.userId,
      name: user?.username ?? user?.name ?? "Anonymous",
      image: user?.image,
      totalPoints: entry._sum.pointsEarned ?? 0,
    };
  });

  return (
    <main className="container mx-auto px-4 py-8 pb-24 max-w-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
      <p className="text-sm text-gray-500 mb-8">Top pet name guessers</p>
      <LeaderboardTable entries={leaderboard} currentUserId={currentUserId} />
    </main>
  );
}
