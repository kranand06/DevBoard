// src/pages/dashboard/CompetitiveProgrammingCard.jsx
import React, { useContext } from 'react';
import BentoCard from '../../Components/BentoCard';
import { DevContext } from '../../context/DevContext';

export default function CompetitiveProgrammingCard() {

    const { codechefdata, codeforcesdata } = useContext(DevContext);
  

  const codechef = {
    globalRank: codechefdata?.globalRank || 0,
    rating: codechefdata?.rating || 0,
    stars: codechefdata?.ratingStar.length || null,
  };
  
  const codeforces = {
    handle: codeforcesdata?.handle || 'username',
    rating: codeforcesdata?.rating || 0,
    rank: codeforcesdata?.rank || '',
  };



  return (
    <BentoCard className="md:col-span-12 p-8 min-h-[220px]">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-[#ffb95f]" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
        <h3 className="text-[18px] font-semibold text-[#dae2fd] font-['Plus_Jakarta_Sans']">Competitive Programming</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CodeChef */}
        <div className="bg-[#131b2e] rounded-xl p-6 border border-[#464554] flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[18px] font-semibold text-[#dae2fd] font-['Plus_Jakarta_Sans']">CodeChef</span>
              {codechef.stars > 0 && (
                <>
                  {Array.from({ length: codechef.stars }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[#ffb95f]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </>
              )}
            </div>
            <span className="text-[10px] text-[#c7c4d7] uppercase tracking-wider block">Global Rank: {codechef.globalRank.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-[48px] font-bold text-[#dae2fd] font-['Plus_Jakarta_Sans'] leading-tight">{codechef.rating}</span>
            <span className="block text-[10px] text-[#c7c4d7] uppercase tracking-wider">Rating</span>
          </div>
        </div>

        {/* Codeforces */}
        <div className="relative bg-[#131b2e] rounded-xl p-6 border border-[#464554] flex justify-between items-center overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#ffb4ab]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <span className="text-[18px] font-semibold text-[#ffb4ab] mb-1 block font-['Plus_Jakarta_Sans']">Codeforces</span>
            <span className="text-[10px] text-[#c7c4d7] uppercase tracking-wider block">@{codeforces.handle} • {codeforces.rank}</span>
          </div>
          <div className="text-right relative z-10">
            <span className="text-[48px] font-bold text-[#ffb4ab] font-['Plus_Jakarta_Sans'] leading-tight">{codeforces.rating}</span>
            <span className="block text-[10px] text-[#c7c4d7] uppercase tracking-wider">Rating</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}
