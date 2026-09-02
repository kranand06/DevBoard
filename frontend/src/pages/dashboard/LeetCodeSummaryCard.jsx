// src/pages/dashboard/LeetCodeSummaryCard.jsx
import React, { useContext } from 'react';
import BentoCard from '../../Components/BentoCard';
import { DevContext } from '../../context/DevContext';




  
  export default function LeetCodeSummaryCard() {


  const { leetcodedata } = useContext(DevContext);

  const submission = leetcodedata?.submitStats?.acSubmissionNum || [];
  const totalSolved = leetcodedata?.submitStats?.acSubmissionNum?.[0]?.count || 0;
  const bars = [
  { label: 'Easy',   count: submission[1]?.count || 0, pct: (submission[1]?.count / totalSolved * 100) || 0, color: '#4edea3' },
  { label: 'Medium', count: submission[2]?.count || 0, pct: (submission[2]?.count / totalSolved * 100) || 0, color: '#ffb95f' },
  { label: 'Hard',   count: submission[3]?.count || 0, pct: (submission[3]?.count / totalSolved * 100) || 0, color: '#ffb4ab' },
];



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
            <p className="text-[14px] text-[#c7c4d7]">{leetcodedata?.username || 'Not specified'}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-[#c7c4d7] uppercase tracking-wider block mb-1">Rank</span>
          <span className="text-[24px] font-bold text-[#dae2fd] font-['Plus_Jakarta_Sans']">{leetcodedata?.profile.ranking || 'Not specified'}</span>
        </div>
      </div>

      {/* Badges & Streak */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <span className="px-2.5 py-1 rounded text-xs font-medium bg-[#222a3d] text-[#dae2fd] border border-[#464554]">{leetcodedata?.languageProblemCount?.[0].languageName + ' (' + leetcodedata?.languageProblemCount?.[0].problemsSolved + ')' || 'Not specified'}</span>
          <span className="px-2.5 py-1 rounded text-xs font-medium bg-[#222a3d] text-[#dae2fd] border border-[#464554]">{leetcodedata?.languageProblemCount?.[1].languageName + ' (' + leetcodedata?.languageProblemCount?.[1].problemsSolved + ')' || 'Not specified'}</span>
        </div>
        <div className="flex items-center gap-1 text-[#ffb95f]">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          <span className="text-[10px] font-bold font-['JetBrains_Mono']">{leetcodedata?.userCalendar.streak+' Days' || 'Not specified'} </span>
        </div>
      </div>

      {/* Total */}
      <div className="text-center mb-6">
        <span className="block text-[48px] font-bold text-[#c0c1ff] font-['Plus_Jakarta_Sans'] leading-tight">{totalSolved}</span>
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
