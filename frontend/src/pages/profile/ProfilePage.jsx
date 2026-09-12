// src/pages/profile/ProfilePage.jsx
import React, { useContext, useState } from 'react';
import Layout from '../../components/Layout';
import ProfileCard from './ProfileCard';
import EditProfileForm from './EditProfileForm';
import { LogOut } from 'lucide-react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { DevContext } from '../../context/DevContext';


export default function ProfilePage() {
  const { user, logout } = useContext(UserContext)
  const { handle } = useContext(DevContext)
  // const [showEdit, setShowEdit] = useState(false); this state variable will be used to update personal info.
  const [showHandleEdit, setShowHandleEdit] = useState(false);

  const nav = useNavigate();

  const handleLogout = async () => {
    await logout();
    nav('/')
  }
  


  const formatedate =(date)=>{
    const dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  })
  return formattedDate;
  }

  return (
    <Layout title="Profile Settings">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-[1400px] mx-auto">
        {/* Left: Profile card */}
        <div className="md:col-span-4">
          <ProfileCard onEdit={() => setShowHandleEdit(true)} />
        </div>

        {/* Right: Settings sections */}
        <div className="md:col-span-8 space-y-6">
          {/* Account Info section */}
          <div className="bento-card p-6">
            <h3 className="text-[18px] font-semibold text-[#dae2fd] font-['Plus_Jakarta_Sans'] mb-4">Account Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', value: user?.name },
                { label: 'Username', value: `@${user?.username}` },
                { label: 'Email', value: user?.email },
                { label: 'Member Since', value:formatedate(user?.createdAt) },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-[10px] text-[#908fa0] uppercase tracking-wider font-['JetBrains_Mono'] block mb-1">
                    {f.label}
                  </label>
                  <p className="text-[14px] text-[#dae2fd]">{f.value}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowHandleEdit(true)}
              className="mt-4 text-[14px] text-[#c0c1ff] hover:text-[#e1e0ff] transition-colors"
            >
              Edit personal information →
            </button>
          </div>

          {/* Platform Handles */}
          <div className="bento-card p-6">
            <h3 className="text-[18px] font-semibold text-[#dae2fd] font-['Plus_Jakarta_Sans'] mb-4">Platform Handles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'LeetCode', value: handle?.leetcodeHandle, icon: 'code', color: '#ffb95f' },
                { label: 'CodeChef', value: handle?.codechefHandle, icon: 'military_tech', color: '#ffb95f' },
                { label: 'GitHub', value: handle?.githubHandle, icon: 'terminal', color: '#dae2fd' },
                { label: 'Codeforces', value: handle?.codeforcesHandle, icon: 'trending_up', color: '#ffb4ab' },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-3 p-3 bg-[#131b2e] rounded-lg border border-[#464554]">
                  <span className="material-symbols-outlined text-base flex-shrink-0" style={{ color: p.color }}>{p.icon}</span>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#908fa0] font-['JetBrains_Mono'] block">{p.label}</span>
                    <span className="text-[14px] text-[#dae2fd] font-['JetBrains_Mono'] truncate block">@{p.value ?? '—'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bento-card p-6 border-[#ffb4ab]/20">
            <h3 className="text-[18px] font-semibold text-[#ffb4ab] font-['Plus_Jakarta_Sans'] mb-4">Danger Zone</h3>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#ffb4ab]/10 border border-[#ffb4ab]/30 text-[#ffb4ab] px-4 py-2.5 rounded-lg hover:bg-[#ffb4ab]/20 transition-colors text-[14px] font-medium"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {showHandleEdit && <EditProfileForm onClose={() => setShowHandleEdit(false)} />}
    </Layout>
  );
}
