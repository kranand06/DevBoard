// src/pages/dashboard/GoalsCard.jsx
import React, { useContext } from 'react';
import BentoCard from '../../components/BentoCard.jsx';
import { ProductivityContext } from '../../context/ProductivityContext.jsx';

export default function GoalsCard() {

const { goals } =useContext(ProductivityContext)
const safeGoals = goals || [];

  return (
    <BentoCard className="md:col-span-6 p-8 flex flex-col min-h-[300px]">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-[#4edea3]">flag</span>
        <h3 className="text-[18px] font-semibold text-[#dae2fd] font-['Plus_Jakarta_Sans']">Active Goals</h3>
      </div>

      <div className="space-y-6 flex-1">
        {safeGoals.map((g) => (
          <div key={g._id} className="flex items-start gap-4">
            <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#ffb95f" }} />
            <div>
              <span className="text-[14px] font-medium text-[#dae2fd] block">{g.goal}</span>
              <span className="text-[10px] text-[#c7c4d7] font-['JetBrains_Mono'] mt-0.5 block">{g.date}</span>
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
