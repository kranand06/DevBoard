// src/pages/codechef/RecentContests.jsx
import {
  CalendarDays,
  Minus,
  TrendingDown,
  TrendingUp,
  Trophy,
} from 'lucide-react';
import BentoCard from '../../Components/BentoCard.jsx';

function formatDate(dateString) {
  if (!dateString) return 'Unknown date';

  return new Date(dateString.replace(' ', 'T')).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function RecentContests({ contestHistory = [] }) {
  // Calculate rating changes in chronological order first.
  const contests = [...contestHistory]
    .sort(
      (a, b) =>
        new Date(a.endDate.replace(' ', 'T')) -
        new Date(b.endDate.replace(' ', 'T'))
    )
    .map((contest, index, history) => ({
      ...contest,
      ratingChange:
        index === 0 ? null : contest.rating - history[index - 1].rating,
    }))
    .reverse();

  const latestContest = contests[0];
  const latestRating = latestContest?.rating || 0;

  return (
    <BentoCard className="flex flex-col p-6 md:col-span-4">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#dae2fd]">
            Recent Contests
          </h3>

          <p className="mt-1 text-xs text-[#c7c4d7]">
            CodeChef rated-contest history
          </p>
        </div>

        <div className="rounded-lg bg-[#ffb95f]/10 p-2">
          <Trophy size={20} className="text-[#ffb95f]" />
        </div>
      </div>

      {/* {latestContest && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-[#ffb95f]/20 bg-[#ffb95f]/5 px-3 py-2.5">
          <span className="text-xs text-[#c7c4d7]">Latest Rating</span>

          <span className="text-xl font-bold text-[#ffb95f]">
            {latestRating}
          </span>
        </div>
      )} */}

      {contests.length === 0 ? (
        <p className="text-sm text-[#c7c4d7]">
          No contest history available.
        </p>
      ) : (
        <div
          className="max-h-[360px] flex-1 space-y-2 overflow-y-auto pr-2
                     [-ms-overflow-style:none] [scrollbar-width:none]
                     [&::-webkit-scrollbar]:hidden"
        >
          {contests.map((contest) => {
            const isPositive = contest.ratingChange > 0;
            const isNegative = contest.ratingChange < 0;

            return (
              <div
                key={contest.contestCode}
                className="flex items-center justify-between rounded-lg border border-transparent bg-[#222a3d]/50 p-3 transition-colors hover:border-[#464554] hover:bg-[#222a3d]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#dae2fd]">
                    {contest.contestName}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#c7c4d7]">
                    <CalendarDays size={12} />
                    {formatDate(contest.endDate)}
                  </div>
                </div>

                <div className="ml-3 flex shrink-0 items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#dae2fd]">
                      {contest.rating}
                    </p>

                    <p className="text-[10px] text-[#c7c4d7]">
                      Rating
                    </p>
                  </div>

                  <div className="min-w-[56px] text-right">
                    {contest.ratingChange === null ? (
                      <div className="flex items-center justify-end gap-1 text-[#c7c4d7]">
                        <Minus size={14} />
                        <span className="text-xs">—</span>
                      </div>
                    ) : (
                      <div
                        className="flex items-center justify-end gap-1 text-sm font-semibold"
                        style={{
                          color: isPositive
                            ? '#4edea3'
                            : isNegative
                              ? '#ffb4ab'
                              : '#c7c4d7',
                        }}
                      >
                        {isPositive ? (
                          <TrendingUp size={14} />
                        ) : isNegative ? (
                          <TrendingDown size={14} />
                        ) : (
                          <Minus size={14} />
                        )}

                        {isPositive ? '+' : ''}
                        {contest.ratingChange}
                      </div>
                    )}

                    <p className="mt-1 text-[10px] text-[#c7c4d7]">
                      Rank #{Number(contest.rank).toLocaleString()}
                    </p>
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