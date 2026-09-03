// src/pages/github/LanguageBreakdown.jsx
import React from 'react';
import BentoCard from '../../components/BentoCard';


export default function LanguageBreakdown({ languages }) {

  const languageColors = {
    JavaScript: '#f7df1e',
    Python: '#3776ab',
    TypeScript: '#3178c6',
    'C++': '#00599c',
    Other: '#464554',
  };

  const totalLanguageRepos = languages?.reduce(
    (total, item) => total + item.repo,
    0
  );

  const languageStats = languages?.map((item) => ({
    ...item,
    percentage: totalLanguageRepos
      ? Math.round((item.repo / totalLanguageRepos) * 100)
      : 0,
    color: languageColors[item.language] || languageColors.Other,
  }));

  return (
    <BentoCard className="md:col-span-4 p-6 flex flex-col min-h-[300px]">
      <h3 className="text-[18px] font-semibold text-[#dae2fd] font-['Plus_Jakarta_Sans'] mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#4edea3]">pie_chart</span>
        Language Ecosystem
      </h3>
      <div className="flex-1 flex flex-col justify-center gap-4">
        {languageStats?.map((l) => (
          <div key={l.language}>
            <div className="mb-1.5 flex items-center gap-3">
              <div
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: l.color }}
              />

              <span className="flex-1 text-[12px] font-['JetBrains_Mono'] text-[#dae2fd]">
                {l.language}
              </span>

              <span className="text-[12px] font-['JetBrains_Mono'] text-[#c7c4d7]">
                {l.percentage}%
              </span>
            </div>

            <div className="h-1 w-full overflow-hidden rounded-full bg-[#222a3d]">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${l.percentage}%`,
                  backgroundColor: l.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
