import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useTheme();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="px-4 py-2 rounded-lg font-medium bg-app-primary text-white shadow-sm transition-opacity hover:opacity-90"
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
