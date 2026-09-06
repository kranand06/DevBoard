// // src/pages/leetcode/LeetCodeHeatmap.jsx
// import React from 'react';
// import BentoCard from '../../Components/BentoCard,jsx';
// import ActivityHeatmap from '../../components/common/ActivityHeatmap';
// import { generateHeatmapData } from '../../utils/mockData';

// export default function LeetCodeHeatmap() {
//   const data = generateHeatmapData();
//   return (
//     <BentoCard className="md:col-span-12 p-6 overflow-x-auto">
//       <ActivityHeatmap data={data} color="leetcode" title="Activity History" />
//       <p className="text-[10px] text-[#c7c4d7] mt-4 font-['JetBrains_Mono']">
//         Total submissions in the last year: 52
//       </p>
//     </BentoCard>
//   );
// }
import { CalendarDays, Flame } from 'lucide-react';
import BentoCard from '../../components/BentoCard';

// Orange Color
// const LEVEL_COLORS = [
//   'bg-[#222a3d]',
//   'bg-[#5a3514]',
//   'bg-[#8c4c16]',
//   'bg-[#c96b1b]',
//   'bg-[#ffa116]',
// ];

//Green Color
const LEVEL_COLORS = [
  'bg-[#222a3d]',
  'bg-[#0e4429]',
  'bg-[#006d32]',
  'bg-[#26a641]',
  'bg-[#39d353]',
];

const DAY_LABELS = ['Sun', '', 'Tue', '', 'Thu', '', 'Sat'];

function parseSubmissionCalendar(submissionCalendar) {
  try {
    return typeof submissionCalendar === 'string'
      ? JSON.parse(submissionCalendar)
      : submissionCalendar || {};
  } catch {
    return {};
  }
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function getLevel(count, maxCount) {
  if (!count) return 0;
  if (count <= Math.ceil(maxCount * 0.25)) return 1;
  if (count <= Math.ceil(maxCount * 0.5)) return 2;
  if (count <= Math.ceil(maxCount * 0.75)) return 3;
  return 4;
}

function createWeeks(submissions) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const firstDay = new Date(today);
  firstDay.setUTCDate(today.getUTCDate() - 364);

  const counts = Object.values(submissions).map(Number);
  const maxCount = Math.max(...counts, 1);

  const cells = [];

  // Add empty cells so the graph begins on Sunday.
  for (let index = 0; index < firstDay.getUTCDay(); index += 1) {
    cells.push(null);
  }

  for (let index = 0; index < 365; index += 1) {
    const date = new Date(firstDay);
    date.setUTCDate(firstDay.getUTCDate() + index);

    const timestamp = Math.floor(date.getTime() / 1000);
    const count = Number(submissions[timestamp] || 0);

    cells.push({
      date,
      count,
      level: getLevel(count, maxCount),
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks = [];

  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }

  return weeks;
}

export default function LeetCodeHeatmap({ userCalendar }) {
  const submissions = parseSubmissionCalendar(
    userCalendar?.submissionCalendar
  );

  const weeks = createWeeks(submissions);
  const totalActiveDays = userCalendar?.totalActiveDays || 0;
  const streak = userCalendar?.streak || 0;

  return (
    <BentoCard className="md:col-span-12 p-6 overflow-x-auto">
    <section className="rounded-xl border border-[#464554] bg-[#0b1326] p-5 transition-colors hover:border-[#ffa116]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-[#ffa116]" />

          <div>
            <h3 className="text-sm font-semibold text-[#dae2fd]">
              LeetCode Activity
            </h3>

            <p className="mt-0.5 text-xs text-[#c7c4d7]">
              {totalActiveDays} active days in the last year
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg bg-[#222a3d] px-3 py-1.5">
          <Flame size={15} className="text-[#ffa116]" />
          <span className="text-xs font-medium text-[#dae2fd]">
            {streak} day streak
          </span>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-end gap-1.5">
        <span className="mr-1 text-xs text-[#c7c4d7]">Less</span>

        {LEVEL_COLORS.map((color, index) => (
          <span key={index} className={`h-3 w-3 rounded-sm ${color}`} />
        ))}

        <span className="ml-1 text-xs text-[#c7c4d7]">More</span>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2">
          <div className="flex flex-col gap-1 pr-1">
            {DAY_LABELS.map((day, index) => (
              <span
                key={index}
                className="flex h-3 items-center text-[10px] text-[#c7c4d7]"
              >
                {day}
              </span>
            ))}
          </div>

          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((cell, dayIndex) => {
                  if (!cell) {
                    return <span key={dayIndex} className="h-3 w-3" />;
                  }

                  return (
                    <span
                      key={cell.date.toISOString()}
                      title={`${formatDate(cell.date)}: ${cell.count} submission${cell.count === 1 ? '' : 's'}`}
                      className={`h-3 w-3 rounded-sm transition-opacity hover:opacity-70 ${LEVEL_COLORS[cell.level]}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </BentoCard>
  );
}