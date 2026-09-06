// src/pages/leetcode/GlobalRank.jsx
import React from 'react';
import BentoCard from '../../Components/BentoCard.jsx';

export default function GlobalRank({ rank }) {
  return (
    <BentoCard className="md:col-span-4 p-6 flex flex-col justify-center items-center text-center min-h-[200px]">
      <div className="w-16 h-16 rounded-full bg-[#222a3d] flex items-center justify-center mb-4 border border-[#464554]">
        <span className="material-symbols-outlined text-[#4edea3] text-3xl">public</span>
      </div>
      <h3 className="text-[18px] text-[#c7c4d7] font-['Plus_Jakarta_Sans'] mb-2">Global Ranking</h3>
      <p className="text-[32px] font-semibold text-[#dae2fd] font-['Plus_Jakarta_Sans']">{rank.toLocaleString('en-IN')}</p>
      {/* <p className="text-[12px] text-[#4edea3] mt-2 flex items-center gap-1 font-['JetBrains_Mono']">
        <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
        Top 99.9%
      </p> */}
    </BentoCard>
  );
}
