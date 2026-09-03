// src/pages/github/ContributionStats.jsx
import React from 'react';
import BentoCard from '../../components/BentoCard';

export default function ContributionStats({contributions}) {
  return (
    <BentoCard className="md:col-span-4 p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
      <span
        className="material-symbols-outlined text-[96px] text-[#4edea3] mb-4 opacity-80"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        local_fire_department
      </span>
      <div className="text-[48px] font-bold text-[#dae2fd] font-['Plus_Jakarta_Sans'] leading-tight mb-1">{contributions}</div>
      <div className="text-[18px] font-semibold text-[#4edea3] font-['Plus_Jakarta_Sans'] mb-3">Contributions</div>
      <div className="text-[12px] text-[#c7c4d7] bg-[#222a3d] px-3 py-1 rounded-full border border-[#464554] font-['JetBrains_Mono']">
        Last 12 Months
      </div>
    </BentoCard>
  );
}
