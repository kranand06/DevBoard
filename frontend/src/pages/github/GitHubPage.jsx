// src/pages/github/GitHubPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../components/Layout.jsx';
import BentoCard from '../../components/BentoCard.jsx';
import GitHubProfileCard from './GitHubProfileCard';
import LanguageBreakdown from './LanguageBreakdown';
import ContributionStats from './ContributionStats';
import ActivityHeatmap from './ActivityHeatmap';
import RepoCard from './RepoCard';
import { DevContext } from '../../context/DevContext.jsx';
// import { getGitHubProfile, getContributionHeatmap, getGitHubRepos } from '../../api/github.api';
// import Loader from '../../components/Loader';



export default function GitHubPage() {


    const { githubdata } = useContext(DevContext);


    const REPOS = githubdata?.topRepositories || [];

  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getContributionHeatmap()
  //     .then(setHeatmapData)
  //     .finally(() => setLoading(false));
  // }, []);

  // if (loading) return <Loader />;

  return (
    <Layout title="GitHub Workspace">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        {/* Row 1 */}
        <GitHubProfileCard  />
        <LanguageBreakdown languages={githubdata?.languages} />
        <ContributionStats contributions={githubdata?.contriCalendar?.total?.lastYear}/>

        {/* Heatmap */}
        <BentoCard className="md:col-span-12 p-6 overflow-x-auto">
          <ActivityHeatmap contributionCalendar={githubdata?.contriCalendar} title="Activity Heatmap" />
        </BentoCard>

        {/* Repos header */}
        <div className="md:col-span-12 flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-[#dae2fd] font-['Plus_Jakarta_Sans'] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c0c1ff]">folder_open</span>
            Top Repositories
          </h3>
          <a href={"https://github.com/"+githubdata?.username+"?tab=repositories"} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#c0c1ff] hover:text-[#e1e0ff] transition-colors font-['JetBrains_Mono']">
            View All →
          </a>
        </div>

        {/* Repo cards */}
        {REPOS.map((repo) => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>
    </Layout>
  );
}
