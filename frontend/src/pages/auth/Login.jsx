/**
 * AuthPage.jsx
 * Login / Register page for DevBoard.
 * Features:
 *  - Radial-gradient ambient glow on dark background
 *  - Spotlight-hover glass card (max-w-[420px])
 *  - Sign In / Register tab switcher
 *  - Form validation + react-hot-toast feedback
 *  - Redirects to "/" on successful auth
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {
  Mail,
  Lock,
  User,
  AtSign,
  ArrowRight,
  Eye,
  EyeOff,
  Terminal,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { loginUser, registerUser } from '../../api/auth.api';

/* ─── Reusable styled input ─────────────────────────────────────────────── */
function FormInput({ icon: Icon, type = 'text', placeholder, value, onChange, rightSlot }) {
  return (
    <div className="relative flex items-center">
      {/* Leading icon */}
      <span className="absolute left-3 flex-shrink-0" style={{ color: '#c7c4d7' }}>
        <Icon size={16} />
      </span>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="glow-input w-full bg-[#131b2e] border border-[#464554] rounded-lg
                   pl-9 pr-10 py-2.5 text-sm text-[#dae2fd] placeholder-[#464554]
                   focus:border-[#c0c1ff] focus:outline-none transition-colors duration-200"
      />

      {/* Optional right slot (e.g. eye toggle) */}
      {rightSlot && (
        <span className="absolute right-3" style={{ color: '#c7c4d7' }}>
          {rightSlot}
        </span>
      )}
    </div>
  );
}

/* ─── Sign-In form ───────────────────────────────────────────────────────── */
function SignInForm({ onSuccess }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await loginUser({ email, password });
      toast.success(`Welcome back, ${user.name}!`, {
        style: { background: '#222a3d', color: '#dae2fd', border: '1px solid #4edea3' },
        iconTheme: { primary: '#4edea3', secondary: '#0b1326' },
      });
      onSuccess(user);
    } catch (err) {
      toast.error(err.message, {
        style: { background: '#222a3d', color: '#dae2fd', border: '1px solid #ffb4ab' },
        iconTheme: { primary: '#ffb4ab', secondary: '#0b1326' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 tab-content-enter">
      {/* Email */}
      <FormInput
        icon={Mail}
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password + show/hide toggle */}
      <FormInput
        icon={Lock}
        type={showPw ? 'text' : 'password'}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="focus:outline-none hover:text-[#c0c1ff] transition-colors"
          >
            {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        }
      />

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-3.5 h-3.5 rounded accent-[#c0c1ff] cursor-pointer"
          />
          <span className="text-xs" style={{ color: '#c7c4d7' }}>Remember me</span>
        </label>
        <button
          type="button"
          className="text-xs transition-colors hover:text-[#c0c1ff]"
          style={{ color: '#c0c1ff', opacity: 0.7 }}
        >
          Forgot password?
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg
                   font-semibold text-sm transition-all duration-200
                   disabled:opacity-60 disabled:cursor-not-allowed
                   hover:brightness-110 active:scale-[0.98]"
        style={{ backgroundColor: '#c0c1ff', color: '#0b1326' }}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-[#0b1326]/40 border-t-[#0b1326] rounded-full animate-spin" />
        ) : (
          <>
            Authenticate
            <ArrowRight size={15} />
          </>
        )}
      </button>
    </form>
  );
}

/* ─── Register form ──────────────────────────────────────────────────────── */
function RegisterForm({ onSuccess }) {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await registerUser({ name, email, username, password });
      toast.success('Account initialized! Welcome aboard.', {
        style: { background: '#222a3d', color: '#dae2fd', border: '1px solid #4edea3' },
        iconTheme: { primary: '#4edea3', secondary: '#0b1326' },
      });
      onSuccess(user);
    } catch (err) {
      toast.error(err.message, {
        style: { background: '#222a3d', color: '#dae2fd', border: '1px solid #ffb4ab' },
        iconTheme: { primary: '#ffb4ab', secondary: '#0b1326' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 tab-content-enter">
      <FormInput
        icon={User}
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormInput
        icon={Mail}
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        icon={AtSign}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormInput
        icon={Lock}
        type={showPw ? 'text' : 'password'}
        placeholder="Password (min. 8 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="focus:outline-none hover:text-[#c0c1ff] transition-colors"
          >
            {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg
                   font-semibold text-sm transition-all duration-200
                   disabled:opacity-60 disabled:cursor-not-allowed
                   hover:brightness-110 active:scale-[0.98]"
        style={{ backgroundColor: '#c0c1ff', color: '#0b1326' }}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-[#0b1326]/40 border-t-[#0b1326] rounded-full animate-spin" />
        ) : (
          <>
            Initialize Account
            <ArrowRight size={15} />
          </>
        )}
      </button>
    </form>
  );
}

/* ─── Main AuthPage component ─────────────────────────────────────────────── */
export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'register'

  /** After successful auth, store user in context and redirect */
  const handleSuccess = (user) => {
    login(user);
    navigate('/', { replace: true });
  };

  /* Track mouse position for spotlight on the card */
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: '#0b1326' }}
    >
      {/* Toaster */}
      <Toaster position="top-center" />

      {/* Radial ambient glow (top-center) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(128,131,255,0.20) 0%, transparent 70%)',
        }}
      />

      {/* ── Auth Card ──────────────────────────────────────────────────────── */}
      <div
        onMouseMove={handleMouseMove}
        className="relative z-10 w-full max-w-[420px] rounded-xl border border-[#464554]
                   glow-card spotlight-hover"
        style={{ backgroundColor: '#222a3d' }}
      >
        <div className="p-8">
          {/* ── Header ─────────────────────────────────────────────────────── */}
          <div className="flex flex-col items-center gap-3 mb-8">
            {/* Terminal icon badge */}
            <div
              className="flex items-center justify-center w-12 h-12 rounded-xl"
              style={{ backgroundColor: 'rgba(192,193,255,0.12)' }}
            >
              <Terminal size={22} style={{ color: '#c0c1ff' }} />
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold" style={{ color: '#c0c1ff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                DevBoard
              </h1>
              <p className="text-xs mt-0.5" style={{ color: '#c7c4d7' }}>
                Expert-Grade Operations
              </p>
            </div>
          </div>

          {/* ── Tab switcher ───────────────────────────────────────────────── */}
          <div
            className="flex rounded-lg p-1 mb-6"
            style={{ backgroundColor: '#131b2e' }}
          >
            {[
              { key: 'signin',   label: 'Sign In' },
              { key: 'register', label: 'Register' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={[
                  'flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  activeTab === key
                    ? 'bg-[#c0c1ff]/10 text-[#c0c1ff] border-b-2 border-[#c0c1ff]'
                    : 'text-[#c7c4d7] hover:text-[#dae2fd]',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ── Forms ──────────────────────────────────────────────────────── */}
          {activeTab === 'signin' ? (
            <SignInForm onSuccess={handleSuccess} />
          ) : (
            <RegisterForm onSuccess={handleSuccess} />
          )}
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        
      </div>
    </div>
  );
}
