// src/pages/leetcode/ContestStats.jsx
import { ChartNoAxesCombined, Medal, Trophy, Users } from 'lucide-react';
import BentoCard from '../../Components/BentoCard.jsx';

function formatRank(rank) {
  return rank ? `#${Number(rank).toLocaleString()}` : '—';
}

export default function ContestStats({ contestRanking }) {
  const rating = contestRanking?.rating
    ? Math.round(contestRanking.rating)
    : 0;

  const globalRanking = contestRanking?.globalRanking || 0;
  const topPercentage = contestRanking?.topPercentage || 0;
  const attendedContests = contestRanking?.attendedContestsCount || 0;

  return (
    <BentoCard className="p-6 md:col-span-4">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#dae2fd]">
            Contest Performance
          </h3>

          <p className="mt-1 text-xs text-[#c7c4d7]">
            Your LeetCode contest profile
          </p>
        </div>

        <div className="rounded-lg bg-[#c0c1ff]/10 p-2">
          <Trophy size={20} className="text-[#c0c1ff]" />
        </div>
      </div>

      <div className="mb-5 rounded-xl border border-[#c0c1ff]/20 bg-[#c0c1ff]/5 p-4">
        <div className="flex items-center gap-2 text-xs text-[#c7c4d7]">
          <ChartNoAxesCombined size={15} className="text-[#c0c1ff]" />
          Current Rating
        </div>

        <p className="mt-2 text-3xl font-bold text-[#dae2fd]">
          {rating || '—'}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-[#222a3d]/60 px-3 py-2.5">
          <div className="flex items-center gap-2 text-sm text-[#c7c4d7]">
            <Medal size={16} className="text-[#ffa116]" />
            Global Ranking
          </div>

          <span className="text-sm font-semibold text-[#dae2fd]">
            {formatRank(globalRanking)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-[#222a3d]/60 px-3 py-2.5">
          <div className="flex items-center gap-2 text-sm text-[#c7c4d7]">
            <Users size={16} className="text-[#4edea3]" />
            Top Percentage
          </div>

          <span className="text-sm font-semibold text-[#4edea3]">
            {topPercentage ? `Top ${topPercentage}%` : '—'}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-[#222a3d]/60 px-3 py-2.5">
          <span className="text-sm text-[#c7c4d7]">
            Contests Attended
          </span>

          <span className="text-sm font-semibold text-[#dae2fd]">
            {attendedContests}
          </span>
        </div>
      </div>
    </BentoCard>
  );
}