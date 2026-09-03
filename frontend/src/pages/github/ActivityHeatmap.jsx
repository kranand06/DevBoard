import { CalendarDays } from 'lucide-react';

const LEVEL_COLORS = [
  'bg-[#222a3d]',
  'bg-[#0e4429]',
  'bg-[#006d32]',
  'bg-[#26a641]',
  'bg-[#39d353]',
];

const DAY_LABELS = ['Sun', '', 'Tue', '', 'Thu', '', 'Sat'];

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function createWeeks(contributions = []) {
  if (!contributions.length) return [];

  const sortedContributions = [...contributions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const firstDate = new Date(`${sortedContributions[0].date}T00:00:00`);

  // Adds empty cells before the first date so every column starts on Sunday.
  const cells = [
    ...Array(firstDate.getDay()).fill(null),
    ...sortedContributions,
  ];

  // Completes the final week.
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks = [];

  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }

  return weeks;
}

export default function ActivityHeatmap({ contributionCalendar }) {
  const contributions = contributionCalendar?.contributions || [];
  const totalContributions = contributionCalendar?.total?.lastYear || 0;
  const weeks = createWeeks(contributions);

  return (
    <section className="rounded-xl border border-[#464554] bg-[#0b1326] p-5 transition-colors hover:border-[#c0c1ff]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-[#c0c1ff]" />

          <div>
            <h3 className="text-sm font-semibold text-[#dae2fd]">
              GitHub Activity
            </h3>

            <p className="mt-0.5 text-xs text-[#c7c4d7]">
              {totalContributions} contributions in the last year
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="mr-1 text-xs text-[#c7c4d7]">Less</span>

          {LEVEL_COLORS.map((color, index) => (
            <span
              key={index}
              className={`h-3 w-3 rounded-sm ${color}`}
            />
          ))}

          <span className="ml-1 text-xs text-[#c7c4d7]">More</span>
        </div>
      </div>

      {!contributions.length ? (
        <p className="text-sm text-[#c7c4d7]">
          No contribution data available.
        </p>
      ) : (
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
                      return (
                        <span
                          key={dayIndex}
                          className="h-3 w-3"
                        />
                      );
                    }

                    const level = Math.min(Math.max(cell.level || 0, 0), 4);

                    return (
                      <span
                        key={cell.date}
                        title={`${formatDate(cell.date)}: ${cell.count} contribution${cell.count === 1 ? '' : 's'}`}
                        className={`h-3 w-3 rounded-sm transition-opacity hover:opacity-70 ${LEVEL_COLORS[level]}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}