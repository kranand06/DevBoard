// src/pages/github/RepoCard.jsx
import React from 'react';
import { ExternalLink, Star, GitFork } from 'lucide-react';
import BentoCard from '../../components/BentoCard.jsx';

const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript:  '#3178c6',
  Python:      '#3776ab',
  'C++':       '#00599c',
  HTML:        '#e34c26',
  CSS:         '#563d7c',
};

export default function RepoCard({ repo }) {

  const { name, description, language, stars, forks, isPrivate ,htmlUrl} = repo;
  return (
    <BentoCard className="bento-card md:col-span-3 p-5 flex flex-col h-[200px] hover:border-[#c0c1ff] cursor-pointer group">
      <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
        <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-[#c0c1ff] text-[18px] flex-shrink-0">book</span>
          <span className="text-[14px] font-semibold text-[#c0c1ff] group-hover:underline truncate">{name}</span>
        </div>
        <span className="flex-shrink-0 ml-2 text-[10px] px-2 py-0.5 rounded-full border border-[#464554] text-[#c7c4d7] font-['JetBrains_Mono']">
          {isPrivate ? 'Private' : 'Public'}
        </span>
      </div>

      {/* Description */}
      <p className="text-[13px] h-[60%] text-[#c7c4d7] flex-1 line-clamp-3 leading-relaxed">{description||'No description provided.'}</p>

      {/* Footer */}
      <div className="flex bottom-0 items-center gap-4 mt-auto pt-3 border-t border-[#464554]/50">
        {language && (
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor:  '#908fa0' }} />
            <span className="text-[11px] text-[#c7c4d7] font-['JetBrains_Mono']">{language}</span>
          </div>
        )}
        {/* {stars > 0 && ( */}
          <div className="flex items-center gap-1 text-[#c7c4d7] hover:text-[#c0c1ff] transition-colors cursor-pointer">
            <Star size={12} />
            <span className="text-[11px] font-['JetBrains_Mono']">{stars}</span>
          </div>
        {/* )}
        {forks > 0 && ( */}
          <div className="flex items-center gap-1 text-[#c7c4d7]">
            <GitFork size={12} />
            <span className="text-[11px] font-['JetBrains_Mono']">{forks}</span>
          </div>
        {/* )} */}
        <ExternalLink size={12} className="ml-auto text-[#464554] group-hover:text-[#c0c1ff] transition-colors" />
      </div>
      </a>
    </BentoCard>
  );
}
