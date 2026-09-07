// src/pages/codechef/RatingChart.jsx
import { useMemo, useState } from 'react';
import BentoCard from '../../Components/BentoCard.jsx';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function parseContestDate(dateString) {
  return new Date(dateString.replace(' ', 'T'));
}

function formatChartDate(date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: '2-digit',
  });
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const contest = payload[0].payload;
  const isPositive = contest.ratingChange > 0;
  const isNegative = contest.ratingChange < 0;

  return (
    <div className="rounded-lg border border-[#464554] bg-[#222a3d] px-3 py-2.5 shadow-xl">
      <p className="max-w-[200px] text-xs font-medium text-[#dae2fd]">
        {contest.contestName}
      </p>

      <p className="mt-1 text-[11px] text-[#c7c4d7]">
        {contest.fullDate}
      </p>

      <div className="mt-2 flex items-center justify-between gap-5">
        <span className="text-xs text-[#c7c4d7]">Rating</span>
        <span className="font-semibold text-[#ffb95f]">
          {contest.rating}
        </span>
      </div>

      <div className="mt-1 flex items-center justify-between gap-5">
        <span className="text-xs text-[#c7c4d7]">Change</span>
        <span
          className="text-xs font-semibold"
          style={{
            color: isPositive
              ? '#4edea3'
              : isNegative
                ? '#ffb4ab'
                : '#c7c4d7',
          }}
        >
          {contest.ratingChange === null
            ? '—'
            : `${isPositive ? '+' : ''}${contest.ratingChange}`}
        </span>
      </div>

      <div className="mt-1 flex items-center justify-between gap-5">
        <span className="text-xs text-[#c7c4d7]">Rank</span>
        <span className="text-xs font-medium text-[#dae2fd]">
          #{Number(contest.rank).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default function RatingChart({ contestHistory = [] }) {
  const [range, setRange] = useState('1Y');
  const ranges = ['6M', '1Y', 'ALL'];

  const chartData = useMemo(() => {
    return [...contestHistory]
      .map((contest) => ({
        ...contest,
        date: parseContestDate(contest.endDate),
      }))
      .filter((contest) => !Number.isNaN(contest.date.getTime()))
      .sort((a, b) => a.date - b.date)
      .map((contest, index, contests) => ({
        ...contest,
        dateLabel: formatChartDate(contest.date),
        fullDate: contest.date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        ratingChange:
          index === 0 ? null : contest.rating - contests[index - 1].rating,
      }));
  }, [contestHistory]);

  const filteredData = useMemo(() => {
    if (range === 'ALL' || chartData.length === 0) {
      return chartData;
    }

    const latestDate = chartData[chartData.length - 1].date;
    const cutoffDate = new Date(latestDate);

    cutoffDate.setMonth(
      cutoffDate.getMonth() - (range === '6M' ? 6 : 12)
    );

    return chartData.filter((contest) => contest.date >= cutoffDate);
  }, [chartData, range]);

  const latestContest = filteredData[filteredData.length - 1];

  const ratingDomain = useMemo(() => {
    if (!filteredData.length) return [0, 2000];

    const ratings = filteredData.map((contest) => contest.rating);
    const minimum = Math.min(...ratings);
    const maximum = Math.max(...ratings);

    return [
      Math.max(0, Math.floor((minimum - 100) / 100) * 100),
      Math.ceil((maximum + 100) / 100) * 100,
    ];
  }, [filteredData]);

  return (
    <BentoCard className="flex flex-col p-6 md:col-span-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[#dae2fd]">
            Rating Progression
          </h3>

          <p className="mt-1 text-xs text-[#c7c4d7]">
            Your CodeChef rating across rated contests
          </p>
        </div>

        <div className="flex gap-1.5">
          {ranges.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRange(item)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                range === item
                  ? 'border border-[#ffb95f]/30 bg-[#ffb95f]/10 text-[#ffb95f]'
                  : 'bg-[#222a3d] text-[#c7c4d7] hover:bg-[#2d3449]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* {latestContest && (
        <div className="mb-5 flex items-center justify-between rounded-lg border border-[#ffb95f]/20 bg-[#ffb95f]/5 px-3 py-2">
          <span className="text-xs text-[#c7c4d7]">
            Latest rating after {latestContest.contestName}
          </span>

          <span className="text-lg font-bold text-[#ffb95f]">
            {latestContest.rating}
          </span>
        </div>
      )} */}

      {filteredData.length === 0 ? (
        <div className="flex min-h-[260px] items-center justify-center text-sm text-[#c7c4d7]">
          No contest-rating history available.
        </div>
      ) : (
        <div className="min-h-[260px] flex-1">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 12, left: -16, bottom: 0 }}
            >
              <defs>
                <linearGradient id="codechefRatingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffb95f" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#ffb95f" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#464554"
                strokeDasharray="3 3"
                opacity={0.35}
                vertical={false}
              />

              <XAxis
                dataKey="dateLabel"
                stroke="#908fa0"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                domain={ratingDomain}
                stroke="#908fa0"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={42}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="rating"
                stroke="#ffb95f"
                strokeWidth={2.5}
                fill="url(#codechefRatingGradient)"
                dot={{
                  fill: '#ffb95f',
                  stroke: '#0b1326',
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{
                  fill: '#fff',
                  stroke: '#ffb95f',
                  strokeWidth: 3,
                  r: 5,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </BentoCard>
  );
}