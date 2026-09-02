// src/pages/dashboard/GoalsCard.jsx
import React from 'react';
import BentoCard from '../../Components/BentoCard';

const goals = [
  { label: 'Master Dynamic Programming',   status: 'In Progress',        dot: '#4edea3' },
  { label: 'System Design Interview Prep', status: 'Starting Next Week', dot: '#c0c1ff' },
  { label: 'Solve 100 LeetCode Problems',  status: '52 / 100 done',      dot: '#ffb95f' },
];

export default function GoalsCard() {
  return (
    <BentoCard className="md:col-span-6 p-8 flex flex-col min-h-[300px]">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-[#4edea3]">flag</span>
        <h3 className="text-[18px] font-semibold text-[#dae2fd] font-['Plus_Jakarta_Sans']">Active Goals</h3>
      </div>

      <div className="space-y-6 flex-1">
        {goals.map((g) => (
          <div key={g.label} className="flex items-start gap-4">
            <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: g.dot }} />
            <div>
              <span className="text-[14px] font-medium text-[#dae2fd] block">{g.label}</span>
              <span className="text-[10px] text-[#c7c4d7] font-['JetBrains_Mono'] mt-0.5 block">{g.status}</span>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
