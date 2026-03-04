import { BlockButton } from "./BlockButton";

type Entry = {
  rank: number;
  userId: string;
  name: string;
  image?: string | null;
  totalPoints: number;
};

const MEDALS = ["🥇", "🥈", "🥉"];

export function LeaderboardTable({
  entries,
  currentUserId,
}: {
  entries: Entry[];
  currentUserId?: string;
}) {
  if (entries.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No scores yet — start guessing to appear here!
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <div
          key={entry.rank}
          className="flex items-center gap-4 p-4 rounded-2xl border bg-white shadow-sm"
        >
          <span className="text-2xl w-8 text-center">
            {MEDALS[entry.rank - 1] ?? `#${entry.rank}`}
          </span>
          <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden bg-orange-100 flex items-center justify-center">
            {entry.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={entry.image} alt={entry.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-orange-600 font-bold text-sm">
                {entry.name[0]?.toUpperCase()}
              </span>
            )}
          </div>
          <span className="flex-1 font-medium text-gray-800">{entry.name}</span>
          <span className="font-bold text-orange-500 text-lg">{entry.totalPoints} pts</span>
          {currentUserId && entry.userId !== currentUserId && (
            <BlockButton userId={entry.userId} />
          )}
        </div>
      ))}
    </div>
  );
}
