// src/pages/leetcode/RecentSolvedQuestions.jsx
import { CheckCircle2, ExternalLink, Clock3 } from 'lucide-react';
import BentoCard from '../../Components/BentoCard.jsx';

function formatSolvedDate(timestamp) {
  if (!timestamp) return 'Recently solved';

  return new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function RecentActivity({
  questions = [],
}) {
  return (
    <BentoCard className="md:col-span-8 p-6 flex flex-col justify-between relative overflow-hidden group min-h-[200px]">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#dae2fd]">
            Recently Solved
          </h3>

          <p className="mt-1 text-xs text-[#c7c4d7]">
            Your latest accepted LeetCode problems
          </p>
        </div>

        <span className="rounded-lg bg-[#4edea3]/10 px-2.5 py-1 text-xs font-medium text-[#4edea3]">
          last 20 questions
        </span>
      </div>

      {questions.length === 0 ? (
        <p className="text-sm text-[#c7c4d7]">
          No recent solved questions available.
        </p>
      ) : (
        <div
          className="max-h-[320px] space-y-2 overflow-y-auto pr-2
                     [-ms-overflow-style:none] [scrollbar-width:none]
                     [&::-webkit-scrollbar]:hidden"
        >
          {questions.map((question) => (
            <a
              key={`${question.titleSlug}-${question.timestamp}`}
              href={`https://leetcode.com/problems/${question.titleSlug}/`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-lg border border-[#464554]/60 bg-[#222a3d]/50 px-3 py-3 transition-colors hover:border-[#4edea3]/50 hover:bg-[#4edea3]/5"
            >
              <div className="flex min-w-0 items-center gap-3">
                

                <CheckCircle2
                  size={18}
                  className="shrink-0 text-[#4edea3]"
                />

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#dae2fd]">
                    {question.title}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-[#c7c4d7]">
                    <Clock3 size={12} />
                    {formatSolvedDate(question.timestamp)}
                  </div>
                </div>
              </div>

              <ExternalLink
                size={16}
                className="ml-3 shrink-0 text-[#c7c4d7] transition-colors group-hover:text-[#4edea3]"
              />
            </a>
          ))}
        </div>
      )}
    </BentoCard>
  );
}