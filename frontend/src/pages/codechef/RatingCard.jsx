// src/pages/codechef/RatingCard.jsx
import React from 'react';
import BentoCard from '../../Components/BentoCard';

export default function RatingCard({ title, value, subtitle, icon, badge }) {
  return (
    <BentoCard className="md:col-span-4 p-6 flex flex-col justify-between min-h-[160px]">
      <div className="flex justify-between items-start">
        <span className="text-[12px] text-[#c7c4d7] uppercase tracking-wider font-['JetBrains_Mono']">{title}</span>
        <span className="material-symbols-outlined text-[#ffb95f]">{icon}</span>
      </div>
      <div>
        <div className="text-[32px] font-semibold text-[#dae2fd] font-['Plus_Jakarta_Sans'] leading-tight flex items-baseline gap-2">
          {value}
          {badge && (
            <span className="text-[10px] text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded border border-[#4edea3]/20 font-['JetBrains_Mono']">
              {badge}
            </span>
          )}
        </div>
        <div className="text-[14px] text-[#c7c4d7] mt-1">{subtitle}</div>
      </div>
    </BentoCard>
  );
}
