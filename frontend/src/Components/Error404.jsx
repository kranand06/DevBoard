// src/pages/Error404.jsx
import { ArrowLeft, Home, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      style={{ backgroundColor: '#0b1326' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(128, 131, 255, 0.18), transparent 70%)',
        }}
      />

      <section className="relative z-10 w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#c0c1ff]/10">
          <Terminal size={26} className="text-[#c0c1ff]" />
        </div>

        <p className="font-['JetBrains_Mono'] text-sm font-semibold tracking-[0.3em] text-[#4edea3]">
          ERROR 404
        </p>

        <h1 className="mt-4 text-4xl font-bold text-[#dae2fd] md:text-5xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#c7c4d7]">
          The page you are looking for does not exist, may have moved, or you
          may not have permission to access it.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c0c1ff] px-5 py-2.5 text-sm font-semibold text-[#0b1326] transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <Home size={16} />
            Back to dashboard
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#464554] px-5 py-2.5 text-sm font-semibold text-[#dae2fd] transition-colors hover:bg-[#222a3d]"
          >
            <ArrowLeft size={16} />
            Go back
          </button>
        </div>

        <div className="mt-10 rounded-lg border border-[#464554] bg-[#222a3d]/50 px-4 py-3 text-left font-['JetBrains_Mono'] text-xs text-[#c7c4d7]">
          <span className="text-[#4edea3]">devboard@system:~$</span>{' '}
          route_not_found
        </div>
      </section>
    </main>
  );
}