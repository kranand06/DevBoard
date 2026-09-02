import { useContext, useState } from 'react';
import {
    Mail,
    Lock,
    ArrowRight,
    Eye,
    EyeOff,
    Terminal,
} from 'lucide-react';
import FormInput from '../../Components/FormInput.jsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext.jsx';
import toast from 'react-hot-toast';

const Login = () => {

    const { login } = useContext(UserContext)
    const nav = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkValidation = () => {
        if (!username || !password) {
            toast.error("Enter all fields");
            return false;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!checkValidation()) return

        setLoading(true);
        login(username, password)
            .then((res) => {
                if (res.success) {
                    toast.success("Login successful!");
                    nav('/dashboard');
                } else {
                    toast.error(res.message);
                }

            })
            .catch((err) => {
                console.error("Login error:", err);
                toast.error("An error occurred. Please try again.");
            });
        // Simulate an API call
        setLoading(false);
    };

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

                    <form onSubmit={handleSubmit} className="space-y-4 tab-content-enter">
                        {/* Email */}
                        <FormInput
                            icon={Mail}
                            type="text"
                            placeholder="Username of Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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

                        <NavLink to="/signup"
                            type="button"
                            className="text-xs transition-colors hover:text-[#c0c1ff] "
                            style={{ color: '#c0c1ff', opacity: 0.7 }}
                        >
                            New Use? Signup
                        </NavLink>

                        {/* Submit */}
                        <button
                            disabled={loading}
                            className="w-full mt-5 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg
                   font-semibold text-sm transition-all duration-200
                   disabled:opacity-60 disabled:cursor-not-allowed
                   hover:brightness-110 active:scale-[0.98]"
                            style={{ backgroundColor: '#c0c1ff', color: '#0b1326' }}
                            onClick={handleSubmit}
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
                </div>
            </div>
        </div>
    );
}

export default Login
