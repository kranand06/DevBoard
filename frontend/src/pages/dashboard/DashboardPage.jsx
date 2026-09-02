// src/pages/dashboard/DashboardPage.jsx
import React from 'react';
import Layout from '../../Components/Layout';
import GitHubSummaryCard from './GitHubSummaryCard';
import LeetCodeSummaryCard from './LeetCodeSummaryCard';
import CompetitiveProgrammingCard from './CompetitiveProgrammingCard';
import TasksCard from './TasksCard';
import GoalsCard from './GoalsCard';

export default function DashboardPage() {
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <GitHubSummaryCard />
        <LeetCodeSummaryCard />
        <CompetitiveProgrammingCard />
        <TasksCard />
        <GoalsCard />
      </div>
    </Layout>
  );
}
