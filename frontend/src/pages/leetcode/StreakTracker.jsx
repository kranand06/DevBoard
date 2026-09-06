// src/pages/leetcode/StreakTracker.jsx
import { CalendarCheck2, Flame, Trophy } from 'lucide-react';
import BentoCard from '../../Components/BentoCard.jsx';

function parseSubmissionCalendar(submissionCalendar) {
  try {
    return typeof submissionCalendar === 'string'
      ? JSON.parse(submissionCalendar)
      : submissionCalendar || {};
  } catch {
    return {};
  }
}

function getCurrentStreak(submissionCalendar) {
  const calendar = parseSubmissionCalendar(submissionCalendar);
  const oneDay = 86400;

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  let timestamp = Math.floor(today.getTime() / 1000);

  // If there are no submissions today, the streak can still continue from yesterday.
  if (Number(calendar[timestamp] || 0) === 0) {
    timestamp -= oneDay;
  }

  let currentStreak = 0;

  while (Number(calendar[timestamp] || 0) > 0) {
    currentStreak += 1;
    timestamp -= oneDay;
  }

  return currentStreak;
}

export default function StreakTracker({ userCalendar }) {
  const currentStreak = getCurrentStreak(
    userCalendar?.submissionCalendar
  );

  // LeetCode's provided `streak` value is the maximum streak.
  const maxStreak = userCalendar?.streak || 0;
  const activeDays = userCalendar?.totalActiveDays || 0;
  const activeYears = userCalendar?.activeYears || [];

  return (
    <BentoCard className="p-6 md:col-span-4">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#dae2fd]">
            Consistency
          </h3>

          <p className="mt-1 text-xs text-[#c7c4d7]">
            Your LeetCode activity overview
          </p>
        </div>

        <div className="rounded-lg bg-[#ffa116]/10 p-2">
          <Flame size={20} className="text-[#ffa116]" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-[#ffa116]/20 bg-[#ffa116]/5 p-3">
          <div className="flex items-center gap-3">
            <Flame size={18} className="text-[#ffa116]" />

            <div>
              <p className="text-xs text-[#c7c4d7]">Current Streak</p>
              <p className="text-sm font-medium text-[#dae2fd]">
                Consecutive active days
              </p>
            </div>
          </div>

          <span className="text-2xl font-bold text-[#ffa116]">
            {currentStreak}
            <span className="ml-1 text-xs font-normal text-[#c7c4d7]">
              days
            </span>
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-[#4edea3]/20 bg-[#4edea3]/5 p-3">
          <div className="flex items-center gap-3">
            <Trophy size={18} className="text-[#4edea3]" />

            <div>
              <p className="text-xs text-[#c7c4d7]">Maximum Streak</p>
              <p className="text-sm font-medium text-[#dae2fd]">
                Your personal best
              </p>
            </div>
          </div>

          <span className="text-2xl font-bold text-[#4edea3]">
            {maxStreak}
            <span className="ml-1 text-xs font-normal text-[#c7c4d7]">
              days
            </span>
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-[#c0c1ff]/20 bg-[#c0c1ff]/5 p-3">
          <div className="flex items-center gap-3">
            <CalendarCheck2 size={18} className="text-[#c0c1ff]" />

            <div>
              <p className="text-xs text-[#c7c4d7]">Total Active Days</p>
              <p className="text-sm font-medium text-[#dae2fd]">
                Days with submissions
              </p>
            </div>
          </div>

          <span className="text-2xl font-bold text-[#c0c1ff]">
            {activeDays}
          </span>
        </div>
      </div>

      {activeYears.length > 0 && (
        <p className="mt-5 text-center text-[10px] font-['JetBrains_Mono'] text-[#c7c4d7]">
          Activity recorded: {activeYears.join(', ')}
        </p>
      )}
    </BentoCard>
  );
}