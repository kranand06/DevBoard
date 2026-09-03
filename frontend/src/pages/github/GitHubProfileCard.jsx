import { Users, BookMarked } from 'lucide-react';
import { useContext } from 'react';
import { DevContext } from '../../context/DevContext';


export default function GitHubProfileCard() {


  const { githubdata } = useContext(DevContext);
  const { name, username, bio, avatarUrl, totalRepos, followers } = githubdata || {};


  return (
    <div className="bg-[#0b1326] border border-[#464554] rounded-xl hover:border-[#c0c1ff] transition-colors p-6 md:col-span-4 flex flex-col items-center justify-center gap-4">
      {/* ── Avatar ─────────────────────────────────────────────────────── */}
      <div className="relative">
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className="w-24 h-24 rounded-full object-cover"
          style={{ border: '2px solid #c0c1ff' }}
          onError={(e) => {
            // Fallback to initials if avatar fails to load
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* ── Identity ───────────────────────────────────────────────────── */}
      <div className="text-center">
        <p className="text-base font-bold" style={{ color: '#dae2fd' }}>{name}</p>
        <p className="text-sm mt-0.5" style={{ color: '#c0c1ff' }}>@{username}</p>
        <p className="text-sm mt-0.5" style={{ color: '#c0c1ff' }}>{bio}</p>
      </div>

      {/* ── Stats Row ──────────────────────────────────────────────────── */}
      <div
        className="flex items-center w-full border-t pt-4 mt-1 gap-4"
        style={{ borderColor: '#464554' }}
      >
        {/* Repos */}
        <div className="flex-1 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            <BookMarked size={14} style={{ color: '#c0c1ff' }} />
            <span className="text-lg font-bold" style={{ color: '#dae2fd' }}>
              {totalRepos}
            </span>
          </div>
          <span className="text-xs" style={{ color: '#dae2fd', opacity: 0.5 }}>Repos</span>
        </div>

        {/* Vertical divider */}
        <div className="w-px h-8" style={{ backgroundColor: '#464554' }} />

        {/* Followers */}
        <div className="flex-1 flex flex-col items-center gap-1">
          <div className="flex items-center gap-1.5">
            <Users size={14} style={{ color: '#4edea3' }} />
            <span className="text-lg font-bold" style={{ color: '#dae2fd' }}>
              {followers}
            </span>
          </div>
          <span className="text-xs" style={{ color: '#dae2fd', opacity: 0.5 }}>Followers</span>
        </div>
      </div>
    </div>
  );
}
