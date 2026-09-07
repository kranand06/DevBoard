// src/pages/codeforces/RatingTimeline.jsx
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

function formatDate(timestamp) {
  return new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
    month: 'short',
    year: '2-digit',
  });
}

function formatFullDate(timestamp) {
  return new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function RatingTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const contest = payload[0].payload;
  const ratingChange = contest.newRating - contest.oldRating;
  const isPositive = ratingChange > 0;

  return (
    <div className="max-w-[260px] rounded-lg border border-[#464554] bg-[#222a3d] px-3 py-2.5 shadow-xl">
      <p className="text-xs font-medium text-[#dae2fd]">
        {contest.contestName}
      </p>

      <p className="mt-1 text-[11px] text-[#c7c4d7]">
        {contest.fullDate}
      </p>

      <div className="mt-2 flex justify-between gap-5 text-xs">
        <span className="text-[#c7c4d7]">Rating</span>
        <span className="font-semibold text-[#c0c1ff]">
          {contest.newRating}
        </span>
      </div>

      <div className="mt-1 flex justify-between gap-5 text-xs">
        <span className="text-[#c7c4d7]">Change</span>
        <span
          className="font-semibold"
          style={{ color: isPositive ? '#4edea3' : '#ffb4ab' }}
        >
          {isPositive ? '+' : ''}
          {ratingChange}
        </span>
      </div>

      <div className="mt-1 flex justify-between gap-5 text-xs">
        <span className="text-[#c7c4d7]">Rank</span>
        <span className="font-medium text-[#dae2fd]">
          #{Number(contest.rank).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default function RatingTimeline({ ratingData = [] }) {
  const [range, setRange] = useState('ALL');
  const ranges = ['6M', '1Y', 'ALL'];

  const chartData = useMemo(() => {
    return [...ratingData]
      .sort(
        (a, b) =>
          a.ratingUpdateTimeSeconds - b.ratingUpdateTimeSeconds
      )
      .map((contest) => ({
        ...contest,
        rating: contest.newRating,
        date: formatDate(contest.ratingUpdateTimeSeconds),
        fullDate: formatFullDate(contest.ratingUpdateTimeSeconds),
      }));
  }, [ratingData]);

  const filteredData = useMemo(() => {
    if (range === 'ALL' || chartData.length === 0) {
      return chartData;
    }

    const latestTimestamp =
      chartData[chartData.length - 1].ratingUpdateTimeSeconds;

    const cutoffDate = new Date(latestTimestamp * 1000);
    cutoffDate.setMonth(
      cutoffDate.getMonth() - (range === '6M' ? 6 : 12)
    );

    return chartData.filter(
      (contest) =>
        contest.ratingUpdateTimeSeconds >= cutoffDate.getTime() / 1000
    );
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
    <BentoCard className="flex min-h-[320px] flex-col p-6 md:col-span-12">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-[#dae2fd]">
            Rating Timeline
          </h3>

          <p className="mt-1 text-xs text-[#c7c4d7]">
            Your Codeforces contest-rating progression
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
                  ? 'border border-[#c0c1ff]/30 bg-[#c0c1ff]/10 text-[#c0c1ff]'
                  : 'bg-[#222a3d] text-[#c7c4d7] hover:bg-[#2d3449]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {latestContest && (
        <div className="mb-5 flex items-center justify-between rounded-lg border border-[#c0c1ff]/20 bg-[#c0c1ff]/5 px-3 py-2.5">
          <span className="text-xs text-[#c7c4d7]">Current Rating</span>

          <span className="text-xl font-bold text-[#c0c1ff]">
            {latestContest.newRating}
          </span>
        </div>
      )}

      {filteredData.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-sm text-[#c7c4d7]">
          No rating history available.
        </div>
      ) : (
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 12, left: -16, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="codeforcesRatingGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#c0c1ff"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor="#c0c1ff"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#464554"
                strokeDasharray="3 3"
                opacity={0.35}
                vertical={false}
              />

              <XAxis
                dataKey="date"
                stroke="#908fa0"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                minTickGap={35}
              />

              <YAxis
                domain={ratingDomain}
                stroke="#908fa0"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={42}
              />

              <Tooltip content={<RatingTooltip />} />

              <Area
                type="monotone"
                dataKey="rating"
                stroke="#c0c1ff"
                strokeWidth={2.5}
                fill="url(#codeforcesRatingGradient)"
                dot={{
                  fill: '#c0c1ff',
                  stroke: '#0b1326',
                  strokeWidth: 2,
                  r: 3,
                }}
                activeDot={{
                  fill: '#fff',
                  stroke: '#c0c1ff',
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