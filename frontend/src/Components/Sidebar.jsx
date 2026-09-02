import { useLocation, useNavigate } from 'react-router-dom';

/* ─── Navigation link definitions ───────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Dashboard',      path: '/dashboard',   icon: 'dashboard' },
  { label: 'GitHub',         path: '/github',      icon: 'terminal' },
  { label: 'LeetCode',       path: '/leetcode',    icon: 'code' },
  { label: 'CodeChef',       path: '/codechef',    icon: 'military_tech' },
  { label: 'Codeforces',     path: '/codeforces',  icon: 'trending_up' },
  { label: 'Tasks',          path: '/tasks',       icon: 'checklist' },
  { label: 'Notes',          path: '/notes',       icon: 'description' },
  { label: 'Profile Settings', path: '/profile',   icon: 'settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <aside
      className="hidden md:flex flex-col w-[260px] h-screen sticky left-0 top-0 z-50
                 border-r border-[#464554]"
      style={{ backgroundColor: '#0b1326' }}
    >
      {/* ── Logo / Header ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-[#464554]">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-lg"
          style={{ backgroundColor: '#c0c1ff20' }}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ color: '#c0c1ff' }}
          >
            terminal
          </span>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-base font-bold" style={{ color: '#c0c1ff' }}>
            DevBoard
          </span>
          <span className="text-[11px]" style={{ color: '#dae2fd', opacity: 0.45 }}>
            v2.4.0
          </span>
        </div>
      </div>

      {/* ── Navigation links ───────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {NAV_LINKS.map(({ label, path, icon }) => {
          const active = isActive(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={[
                'w-full flex items-center gap-3 py-3 px-4 rounded-lg text-sm font-medium',
                'transition-colors duration-150 text-left',
                active
                  ? 'border-l-2 border-[#c0c1ff] bg-[#c0c1ff]/10 text-[#c0c1ff]'
                  : 'border-l-2 border-transparent text-[#c7c4d7] hover:bg-[#222a3d]',
              ].join(' ')}
              aria-current={active ? 'page' : undefined}
            >
              <span
                className="material-symbols-outlined text-[20px] leading-none flex-shrink-0"
                style={active ? { color: '#c0c1ff' } : { color: '#c7c4d7' }}
              >
                {icon}
              </span>
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </nav>

      {/* ── Footer / Support ───────────────────────────────────────────── */}
      <div className="px-2 py-4 border-t border-[#464554]">
        <button
          onClick={() => {/* TODO: open support modal */}}
          className="w-full flex items-center gap-3 py-3 px-4 rounded-lg text-sm
                     text-[#c7c4d7] hover:bg-[#222a3d] transition-colors duration-150"
        >
          <span className="material-symbols-outlined text-[20px] leading-none" style={{ color: '#c7c4d7' }}>
            help
          </span>
          <span>Support</span>
        </button>
      </div>
    </aside>
  );
}
