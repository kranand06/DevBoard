// src/pages/leetcode/SolvedWidget.jsx
import React from 'react';
import BentoCard from '../../Components/BentoCard.jsx';



export default function SolvedWidget({ total, allTimeStats }) {
  const totalSolved = total?.[0]?.count || 0;

  const difficulties = [
    { label: 'Easy', count: total && total[1] ? total[1].count : 0, pct: (total && total[1] ? (total[1].count / totalSolved * 100).toFixed(1) : 0), color: '#4edea3' },
    { label: 'Medium', count: total && total[2] ? total[2].count : 0, pct: (total && total[2] ? (total[2].count / totalSolved * 100).toFixed(1) : 0), color: '#ffb95f' },
    { label: 'Hard', count: total && total[3] ? total[3].count : 0, pct: (total && total[3] ? (total[3].count / totalSolved * 100).toFixed(1) : 0), color: '#ffb4ab' },
  ];


  return (
    <BentoCard className="md:col-span-8 p-6 flex flex-col justify-between relative overflow-hidden group min-h-[200px]">
      {/* Faint bg icon */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <span className="material-symbols-outlined text-[120px] text-[#4edea3]">emoji_events</span>
      </div>

      <div>
        <h3 className="text-[18px] text-[#c7c4d7] font-['Plus_Jakarta_Sans'] mb-1">Total Problems Solved</h3>
        <div className="flex items-baseline gap-3 mt-2">
          <span className="text-[48px] font-bold text-[#4edea3] font-['Plus_Jakarta_Sans'] leading-tight"
            style={{ textShadow: '0 0 10px rgba(78,222,163,0.3)' }}>
            {totalSolved}
          </span>
          <span className="text-[16px] text-[#c7c4d7]">/ {allTimeStats}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#464554]/50">
        {difficulties.map((d) => (
          <div key={d.label}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[12px] font-['JetBrains_Mono']" style={{ color: d.color }}>
                {d.label} {d.count}
              </span>
              <span className="text-[12px] font-['JetBrains_Mono'] text-[#c7c4d7]">({d.pct}%)</span>
            </div>
            <div className="h-1.5 w-full bg-[#2d3449] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
