// src/pages/codeforces/ProfileHeader.jsx
import React, { useState } from 'react';
import BentoCard from '../../Components/BentoCard';

export default function ProfileHeader({ codeforcesdata }) {

  function formatUnixTimestamp(timestamp) {
  return new Date(Number(timestamp) * 1000).toLocaleString('en-IN', {
    // timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    // timeStyle: 'medium',
  });
}
  const [stats,setStats]=useState(null);
  return (
    <BentoCard className="glass-panel rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden mb-6">
      {/* Bg glow */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#8083ff] rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none" />

      {/* Avatar
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl border border-[#464554] bg-[#222a3d] flex items-center justify-center flex-shrink-0 relative z-10">
        <span className="material-symbols-outlined text-5xl text-[#c0c1ff]">person</span>
      </div> */}

      {/* Info */}
      <div className="flex-1 text-center md:text-left relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#222a3d] border border-[#464554] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#6ffbbe]" />
          <span className="text-[10px] text-[#dae2fd] uppercase tracking-wider font-['JetBrains_Mono']">
            {codeforcesdata?.rank}
          </span>
        </div>
        <h2 className="text-[48px] font-bold text-[#dae2fd] font-['Plus_Jakarta_Sans'] leading-tight">
          @{codeforcesdata?.handle}
        </h2>
        <p className="text-[16px] text-[#c7c4d7] mt-2">Competitive Programmer | Registered on {formatUnixTimestamp(codeforcesdata?.registrationTimeSeconds)}</p>

        <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
          {[
            { label: 'Rating',       value: codeforcesdata?.rating, color: '#6ffbbe' },
            { label: 'Max Rating',   value: codeforcesdata?.maxRating, color: '#c0c1ff' },
            { label: 'Contribution', value: codeforcesdata?.contribution, color: '#dae2fd' },
          ].map((s) => (
            <React.Fragment key={s.label}>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#908fa0] uppercase font-['JetBrains_Mono'] tracking-wider">{s.label}</span>
                <span className="text-[24px] font-bold font-['Plus_Jakarta_Sans']" style={{ color: s.color }}>{s.value}</span>
              </div>
              <div className="w-px h-10 bg-[#464554] hidden md:block" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
