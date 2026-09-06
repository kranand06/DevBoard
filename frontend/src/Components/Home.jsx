// src/pages/Home.jsx
import {
  ArrowRight,
  BarChart3,
  Code2,
  
  Layers3,
  Terminal,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Code2,
    title: 'Platform Insights',
    description: 'Bring GitHub, LeetCode, Codeforces, and more into one view.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Track solved problems, activity streaks, ratings, and stats.',
  },
  {
    icon: Layers3,
    title: 'One Developer Hub',
    description: 'A focused workspace built for your developer journey.',
  },
];

export default function Home() {
  return (
    <main
      className="min-h-screen overflow-hidden text-[#dae2fd]"
      style={{ backgroundColor: '#0b1326' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 50% -5%, rgba(128, 131, 255, 0.23), transparent 72%)',
        }}
      />

      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c0c1ff]/10">
            <Terminal size={20} className="text-[#c0c1ff]" />
          </div>

          <span className="text-lg font-bold text-[#c0c1ff]">
            DevBoard
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-[#dae2fd] transition-colors hover:bg-[#222a3d]"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-[#c0c1ff] px-4 py-2 text-sm font-semibold text-[#0b1326] transition-all hover:brightness-110"
          >
            Create account
          </Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-20 text-center md:pt-28">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#4edea3]/30 bg-[#4edea3]/10 px-3 py-1.5 text-xs font-medium text-[#4edea3]">
          <Code2 size={14} />
          Your developer command center
        </div>

        <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-bold leading-tight text-[#dae2fd] md:text-6xl">
          Track your coding journey
          <span className="block text-[#c0c1ff]">in one place.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#c7c4d7] md:text-lg">
          DevBoard brings your coding platforms together, turning your
          activity, skills, streaks, and contest performance into useful
          insights.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c0c1ff] px-6 py-3 text-sm font-semibold text-[#0b1326] transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Start for free
            <ArrowRight size={17} />
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center justify-center rounded-lg border border-[#464554] px-6 py-3 text-sm font-semibold text-[#dae2fd] transition-colors hover:bg-[#222a3d]"
          >
            Log in to DevBoard
          </Link>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-4 text-left md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-xl border border-[#464554] bg-[#222a3d]/70 p-5 transition-colors hover:border-[#c0c1ff]/60"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#c0c1ff]/10">
                  <Icon size={19} className="text-[#c0c1ff]" />
                </div>

                <h2 className="mt-4 text-base font-semibold text-[#dae2fd]">
                  {feature.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#c7c4d7]">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="relative z-10 border-t border-[#464554] px-6 py-5 text-center text-xs text-[#c7c4d7]">
        © {new Date().getFullYear()} DevBoard. Built for developers.
      </footer>
    </main>
  );
}