// src/pages/codeforces/RecentContests.jsx
import { CalendarDays, Trophy, TrendingDown, TrendingUp } from 'lucide-react';
import BentoCard from '../../Components/BentoCard.jsx';

function formatDate(timestamp) {
  return new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function RecentContests({ ratingData = [] }) {
  const contests = [...ratingData]
    .sort(
      (a, b) =>
        b.ratingUpdateTimeSeconds - a.ratingUpdateTimeSeconds
    )
    .map((contest) => ({
      ...contest,
      ratingChange: contest.newRating - contest.oldRating,
    }));

  return (
    <BentoCard className="flex flex-col p-6 md:col-span-12">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#dae2fd]">
            Recent Contests
          </h3>

          <p className="mt-1 text-xs text-[#c7c4d7]">
            Your latest Codeforces rating changes
          </p>
        </div>

        <div className="rounded-lg bg-[#ffb95f]/10 p-2">
          <Trophy size={20} className="text-[#ffb95f]" />
        </div>
      </div>

      {contests.length === 0 ? (
        <p className="text-sm text-[#c7c4d7]">
          No contest history available.
        </p>
      ) : (
        <div
          className="max-h-[380px] flex-1 space-y-2 overflow-y-auto pr-2
                     [-ms-overflow-style:none] [scrollbar-width:none]
                     [&::-webkit-scrollbar]:hidden"
        >
          {contests.map((contest) => {
            const isPositive = contest.ratingChange >= 0;

            return (
              <div
                key={contest.contestId}
                className="group flex items-center justify-between rounded-lg border border-transparent bg-[#222a3d]/50 p-3 transition-colors hover:border-[#464554] hover:bg-[#222a3d]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#dae2fd] transition-colors group-hover:text-[#c0c1ff]">
                    {contest.contestName}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#c7c4d7]">
                    <CalendarDays size={12} />
                    <span>
                      Rank #{Number(contest.rank).toLocaleString()}
                    </span>
                    <span>•</span>
                    <span>{formatDate(contest.ratingUpdateTimeSeconds)}</span>
                  </div>
                </div>

                <div className="ml-4 flex shrink-0 items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#dae2fd]">
                      {contest.newRating}
                    </p>

                    <p className="text-[10px] text-[#c7c4d7]">
                      Rating
                    </p>
                  </div>

                  <div
                    className="flex min-w-[54px] items-center justify-end gap-1 text-sm font-bold"
                    style={{
                      color: isPositive ? '#4edea3' : '#ffb4ab',
                    }}
                  >
                    {isPositive ? (
                      <TrendingUp size={15} />
                    ) : (
                      <TrendingDown size={15} />
                    )}

                    {isPositive ? '+' : ''}
                    {contest.ratingChange}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </BentoCard>
  );
}