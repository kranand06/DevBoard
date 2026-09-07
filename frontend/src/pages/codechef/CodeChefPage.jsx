import { useState, useEffect, useContext } from 'react';
import Layout from '../../components/Layout';
import RatingCard from './RatingCard';
import RatingChart from './RatingChart';
import RecentContests from './RecentContests';
import { DevContext } from '../../context/DevContext';

export default function CodeChefPage() {
  const [stats, setStats] = useState(null);

  const { codechefdata } = useContext(DevContext);

  var ratingchange =codechefdata?.rating - codechefdata?.contestHistory?.at(-2).rating ;
  ratingchange = ratingchange > 0 ?  "+" + ratingchange :  "-" + ratingchange;


  return (
    <Layout title="CodeChef">
      {/* Ambient glow */}
      <div
        className="fixed top-1/4 right-10 w-[40vw] h-[40vw] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(202,129,0,0.05) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }}
      />

      <div className="relative z-10">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-[#ffb95f] text-3xl">military_tech</span>
              <h2 className="text-[48px] font-bold text-[#dae2fd] font-['Plus_Jakarta_Sans'] leading-tight">CodeChef</h2>
            </div>
            <div className="flex items-center gap-2 text-[#c7c4d7]">
              <span className="text-[12px] bg-[#171f33] px-2 py-1 rounded border border-[#464554] font-['JetBrains_Mono']">@{codechefdata?.username}</span>
              <span className="text-[14px] text-[#ffb95f]">{codechefdata?.ratingStar} <span className="text-[#c7c4d7] ml-1">{codechefdata?.ratingStar.length} Star</span></span>
            </div>
          </div>
          <a href={`https://www.codechef.com/users/${codechefdata?.username}`} target="_blank" className="self-start md:self-auto bg-[#171f33] border border-[#464554] hover:border-[#ffb95f] text-[#dae2fd] text-[14px] px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">open_in_new</span>
            View Profile
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <RatingCard title="Current Rating" value={codechefdata?.rating ?? 0} subtitle={codechefdata?.ratingStar} icon="trending_up"  badge={ratingchange} />
          <RatingCard title="Highest Rating" value={codechefdata?.highestRating ?? 0} subtitle={`Contest Attended: ${codechefdata?.totalContests}`} icon="emoji_events" />
          <RatingCard title="Global Rank" value={codechefdata?.globalRank?.toLocaleString() ?? '0'}  icon="public" />
          <RatingChart contestHistory={codechefdata?.contestHistory} />
          <RecentContests contestHistory={codechefdata?.contestHistory} />
        </div>
      </div>
    </Layout>
  );
}
