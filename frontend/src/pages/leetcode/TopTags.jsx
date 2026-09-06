// src/pages/leetcode/TopTags.jsx
import BentoCard from '../../Components/BentoCard.jsx';

const categoryStyles = {
  fundamental: {
    label: 'Fundamental',
    badge: 'border-[#4edea3]/30 bg-[#4edea3]/10 text-[#4edea3]',
  },
  intermediate: {
    label: 'Intermediate',
    badge: 'border-[#c0c1ff]/30 bg-[#c0c1ff]/10 text-[#c0c1ff]',
  },
  advanced: {
    label: 'Advanced',
    badge: 'border-[#ffa116]/30 bg-[#ffa116]/10 text-[#ffa116]',
  },
};

export default function TopTags({ tagProblemCounts = {} }) {
  const topTags = Object.entries(tagProblemCounts)
    .flatMap(([category, categoryTags]) =>
      (categoryTags || []).map((tag) => ({
        ...tag,
        category,
      }))
    )
    .sort((a, b) => b.problemsSolved - a.problemsSolved);

  const tags = Object.values(tagProblemCounts).flat();
  return (
    <BentoCard className="p-6 md:col-span-4">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#dae2fd]">
            Top Tags
          </h3>

          <p className="mt-1 text-xs text-[#c7c4d7]">
            {tags.length} problem categories practised
          </p>
        </div>

        <span className="rounded-lg bg-[#4edea3]/10 px-2.5 py-1 text-xs font-medium text-[#4edea3]">
          Top {topTags.length}
        </span>
      </div>

      {topTags.length === 0 ? (
        <p className="text-sm text-[#c7c4d7]">
          No tag-solving data available.
        </p>
      ) : (
        <div className="max-h-[250px] space-y-3 overflow-y-auto pr-2 [-ms-overflow-style:none] [scrollbar-width:none]
             [&::-webkit-scrollbar]:hidden">
          {topTags.map((tag, index) => {
            const category =
              categoryStyles[tag.category] || categoryStyles.fundamental;

            return (
              <div
                key={tag.tagSlug}
                className="flex items-center justify-between rounded-lg border border-[#464554]/60 bg-[#222a3d]/50 px-3 py-2.5 transition-colors hover:border-[#4edea3]/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="w-4 text-xs font-semibold text-[#c7c4d7]">
                    {index + 1}
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#dae2fd]">
                      {tag.tagName}
                    </p>

                    <span
                      className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${category.badge}`}
                    >
                      {category.label}
                    </span>
                  </div>
                </div>

                <div className="ml-3 text-right">
                  <p className="text-lg font-semibold text-[#dae2fd]">
                    {tag.problemsSolved}
                  </p>

                  <p className="text-[10px] text-[#c7c4d7]">
                    solved
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </BentoCard>
  );
}