import { useContext, useState } from 'react';
import { RefreshCw, Bell, Menu } from 'lucide-react';
import { UserContext } from '../context/UserContext';

function getInitials(name = '') {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Header({ title, subtitle }) {

  const { user } = useContext(UserContext);
  const [syncing, setSyncing] = useState(false);
  const [hasNotifications] = useState(true);

  const displayName = user?.name || user?.login || 'Developer';
  const initials = getInitials(displayName);
  const resolvedSubtitle = subtitle || 'Overview of your workspace';

  /** Simulate a sync action with a brief spinner state */
  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1800);
  };

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 py-3
                 border-b border-[#464554] backdrop-blur-md"
      style={{ backgroundColor: 'rgba(11,19,38,0.80)' }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="min-w-0">
          <h1
            className="text-base md:text-lg font-semibold truncate leading-tight"
            style={{ color: '#dae2fd' }}
          >
            {title}
          </h1>
          {resolvedSubtitle && (
            <p
              className="text-xs truncate leading-tight"
              style={{ color: '#dae2fd', opacity: 0.5 }}
            >
              {resolvedSubtitle}
            </p>
          )}
        </div>
      </div>

      {/* ── Right: actions + user identity ────────────────────────────── */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 ml-4">
        {/* Sync button */}
        <button
          onClick={handleSync}
          className="flex items-center justify-center w-9 h-9 rounded-lg
                     text-[#dae2fd] hover:bg-[#222a3d] transition-colors"
          aria-label="Sync data"
          title="Sync all platforms"
        >
          <RefreshCw
            size={17}
            className={syncing ? 'animate-spin' : ''}
            style={{ color: '#4edea3' }}
          />
        </button>

        {/* Notification bell with red-dot badge */}
        {/* <button
          className="relative flex items-center justify-center w-9 h-9 rounded-lg
                     text-[#dae2fd] hover:bg-[#222a3d] transition-colors"
          aria-label="Notifications"
        >
          <Bell size={17} style={{ color: '#dae2fd' }} />
          {hasNotifications && (
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full ring-2"
              style={{ backgroundColor: '#ffb4ab', ringColor: '#0b1326' }}
            />
          )}
        </button> */}

        {/* Vertical divider */}
        <div
          className="hidden md:block w-px h-6 mx-1 flex-shrink-0"
          style={{ backgroundColor: '#464554' }}
        />

        {/* Avatar + username */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Avatar circle with initials */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center
                       text-xs font-bold flex-shrink-0 select-none"
            style={{ backgroundColor: '#c0c1ff20', color: '#c0c1ff' }}
          >
            {initials}
          </div>
          <span
            className="text-sm font-medium truncate max-w-[120px]"
            style={{ color: '#dae2fd' }}
          >
            {displayName}
          </span>
        </div>
      </div>
    </header>
  );
}


// export default function Header({
//   title = 'Dashboard',
//   subtitle = '',
//   userName = 'Developer',
// }) {
//   return (
//     <header
//       className="flex items-center justify-between border-b border-[#464554] px-6 py-4"
//       style={{ backgroundColor: '#0b1326' }}
//     >
//       <div>
//         <h1 className="text-xl font-semibold text-[#dae2fd]">
//           {title}
//         </h1>

//         {subtitle && (
//           <p className="mt-1 text-sm text-[#c7c4d7]">
//             {subtitle}
//           </p>
//         )}
//       </div>

//       <div className="flex items-center gap-3">
//         <div
//           className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
//           style={{ backgroundColor: '#c0c1ff20', color: '#c0c1ff' }}
//         >
//           {userName.charAt(0).toUpperCase()}
//         </div>

//         <span className="text-sm font-medium text-[#dae2fd]">
//           {userName}
//         </span>
//       </div>
//     </header>
//   );
// }