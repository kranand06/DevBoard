// src/pages/leetcode/LeetCodePage.jsx
import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../components/Layout';
// import Loader from '../../components/common/Loader';
import SolvedWidget from './SolvedWidget';
import GlobalRank from './GlobalRank';
import StreakTracker from './StreakTracker';
import LanguageProficiency from './LanguageProficiency';
import TopTags from './TopTags';
import RecentActivity from './RecentActivity';
import LeetCodeHeatmap from './LeetCodeHeatmap';
// import { getLeetCodeStats } from '../../api/leetcode.api';
import toast from 'react-hot-toast';
import { DevContext } from '../../context/DevContext';
import ContestStats from './ContestStats';

export default function LeetCodePage() {
  // const [stats, setStats] = useState(null);

  const {leetcodedata} = useContext(DevContext);
  
  // console.log("LeetCode Data:", leetcodedata);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getLeetCodeStats()
  //     .then(setStats)
  //     .catch(() => toast.error('Failed to load LeetCode data'))
  //     .finally(() => setLoading(false));
  // }, []);

  // if (loading) return <Loader />;

  return (
    <Layout title="LeetCode">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-[48px] font-bold text-[#dae2fd] font-['Plus_Jakarta_Sans'] flex items-center gap-3 leading-tight">
            LeetCode Overview
            <span className="text-[10px] bg-[#4edea3]/15 text-[#4edea3] px-2 py-1 rounded border border-[#4edea3]/30 align-middle font-['JetBrains_Mono']">
              PRO
            </span>
          </h2>
          <p className="text-[16px] text-[#c7c4d7] mt-2">Tracking progress and daily streaks for @{leetcodedata?.username ?? 'user'}.</p>
        </div>
        <a href='https://leetcode.com/problemset/' target='_blank' className="bg-[#4edea3] text-[#003824] text-[14px] font-semibold px-4 py-2 rounded-lg hover:bg-[#6ffbbe] transition-colors flex items-center gap-2 w-fit">
          <span className="material-symbols-outlined text-sm">play_arrow</span>
          Start Session
        </a>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <SolvedWidget total={leetcodedata?.submitStats?.acSubmissionNum} allTimeStats={leetcodedata?.allQuestionsCount?.[0].count} />
        <GlobalRank rank={leetcodedata?.profile?.ranking ?? 0} />
        <RecentActivity questions={leetcodedata?.recentSolvedQuestions} />
        <ContestStats contestRanking={leetcodedata?.contestRanking} />
        <StreakTracker userCalendar={leetcodedata?.userCalendar}  />
        <LanguageProficiency languageProblemCount={leetcodedata?.languageProblemCount} />
        <TopTags tagProblemCounts={leetcodedata?.tagProblemCounts} />
        <LeetCodeHeatmap userCalendar={leetcodedata?.userCalendar} />
      </div>
    </Layout>
  );
}
