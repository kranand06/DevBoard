import { useContext } from 'react';
import Layout from '../../components/Layout';
import ProfileHeader from './ProfileHeader';
import RatingTimeline from './RatingTimeline';
import RecentContests from './RecentContests';
import { DevContext } from '../../context/DevContext';

export default function CodeforcesPage() {

  const { codeforcesdata } = useContext(DevContext);

  return (
    <Layout title="Codeforces">
      {/* Ambient glow */}
      <div
        className="fixed top-10 right-10 w-[35vw] h-[35vw] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(128,131,255,0.07) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      <div className="relative z-10">
        <ProfileHeader codeforcesdata={codeforcesdata} />
        <div className="grid grid-cols-1 gap-6">
          <RatingTimeline ratingData={codeforcesdata?.ratingData} />
          <RecentContests ratingData={codeforcesdata?.ratingData} />
        </div>
      </div>
    </Layout>
  );
}
