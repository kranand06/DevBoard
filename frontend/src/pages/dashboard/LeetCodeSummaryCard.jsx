// src/pages/dashboard/LeetCodeSummaryCard.jsx
import React from 'react';
import BentoCard from '../../Components/BentoCard';

const bars = [
  { label: 'Easy',   count: 38, pct: 73, color: '#4edea3' },
  { label: 'Medium', count: 12, pct: 23, color: '#ffb95f' },
  { label: 'Hard',   count: 2,  pct: 4,  color: '#ffb4ab' },
];

export default function LeetCodeSummaryCard() {
  return (
    <BentoCard className="md:col-span-4 p-8 flex flex-col min-h-[360px]">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#222a3d] flex items-center justify-center border border-[#464554]">
            <span className="material-symbols-outlined text-[20px] text-[#dae2fd]">code</span>
          </div>
          <div>
            <h3 className="text-[18px] font-semibold text-[#dae2fd] font-['Plus_Jakarta_Sans']">LeetCode</h3>
            <p className="text-[14px] text-[#c7c4d7]">@kranand6</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-[#c7c4d7] uppercase tracking-wider block mb-1">Rank</span>
          <span className="text-[24px] font-bold text-[#dae2fd] font-['Plus_Jakarta_Sans']">2.61M</span>
        </div>
      </div>

      {/* Badges & Streak */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <span className="px-2.5 py-1 rounded text-xs font-medium bg-[#222a3d] text-[#dae2fd] border border-[#464554]">C++ (49)</span>
          <span className="px-2.5 py-1 rounded text-xs font-medium bg-[#222a3d] text-[#dae2fd] border border-[#464554]">Java (4)</span>
        </div>
        <div className="flex items-center gap-1 text-[#ffb95f]">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          <span className="text-[10px] font-bold font-['JetBrains_Mono']">3 Days</span>
        </div>
      </div>

      {/* Total */}
      <div className="text-center mb-6">
        <span className="block text-[48px] font-bold text-[#c0c1ff] font-['Plus_Jakarta_Sans'] leading-tight">52</span>
        <span className="text-[10px] text-[#c7c4d7] uppercase tracking-wider">Total Solved</span>
      </div>

      {/* Difficulty bars */}
      <div className="flex-1 flex flex-col justify-end space-y-4">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="flex justify-between mb-1.5">
              <span className="text-[12px] font-['JetBrains_Mono']" style={{ color: b.color }}>{b.label}</span>
              <span className="text-[12px] font-['JetBrains_Mono'] text-[#dae2fd] font-medium">{b.count}</span>
            </div>
            <div className="h-1.5 w-full bg-[#222a3d] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${b.pct}%`, backgroundColor: b.color }} />
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
