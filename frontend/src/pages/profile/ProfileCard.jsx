import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';


export default function ProfileCard({ onEdit }) {
  const { user } = useContext(UserContext)
  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="bento-card p-8 flex flex-col items-center text-center">
      {/* Avatar */}
      <div className="w-28 h-28 rounded-full border-2 border-[#c0c1ff] bg-[#c0c1ff]/10 flex items-center justify-center mb-4">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className="text-[32px] font-bold text-[#c0c1ff] font-['Plus_Jakarta_Sans']">{initials}</span>
        )}
      </div>

      <h2 className="text-[24px] font-bold text-[#dae2fd] font-['Plus_Jakarta_Sans']">{user.name}</h2>
      <p className="text-[14px] text-[#c7c4d7] mt-1">{user.email}</p>
      <span className="text-[12px] text-[#4edea3] font-['JetBrains_Mono'] mt-1">@{user.username}</span>

      {user.bio && (
        <p className="text-[14px] text-[#c7c4d7] mt-3 max-w-xs leading-relaxed">{user.bio}</p>
      )}

      <button
        onClick={onEdit}
        className="mt-6 w-full bg-[#c0c1ff]/10 border border-[#c0c1ff]/30 text-[#c0c1ff] font-semibold py-2.5 rounded-xl hover:bg-[#c0c1ff]/20 transition-colors text-[14px]"
      >
        Edit Handles
      </button>
    </div>
  );
}
