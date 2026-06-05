import { useState } from 'react';
import { useAuthStore } from '../stores/authStore.js';
import { useNavigate, Link } from 'react-router-dom';
import { ChefHat, Sparkles, Mail, Lock } from 'lucide-react';

export default function Login() {
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(form);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_30%),linear-gradient(135deg,_#0f172a_0%,_#111827_50%,_#1f2937_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[2rem] bg-white/95 shadow-[0_25px_80px_rgba(15,23,42,0.25)] backdrop-blur md:grid-cols-2">
        <section className="hidden flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white md:flex lg:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-amber-200">
              <Sparkles size={14} /> Welcome back
            </div>
            <h1 className="mt-6 max-w-sm text-4xl font-semibold tracking-tight lg:text-5xl">
              Sign in to keep your recipes, favorites, and drafts in sync.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300 lg:text-base">
              Share recipes, save dishes from other cooks, and browse a cleaner
              interface designed for everyday use.
            </p>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
              <ChefHat size={18} /> Built for food creators
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
              <Sparkles size={18} /> Responsive on desktop and mobile
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
            <div>
              <p className="text-sm font-semibold tracking-[0.25em] text-amber-500 uppercase">
                Recipe sharing app
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                Login
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Continue where you left off.
              </p>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-amber-400 focus-within:bg-white">
                <Mail size={18} className="text-slate-400" />
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-amber-400 focus-within:bg-white">
                <Lock size={18} className="text-slate-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                  onChange={handleChange}
                />
              </div>
            </label>

            <button
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-sm text-slate-600">
              No account?{' '}
              <Link
                to={'/signup'}
                className="font-medium text-amber-600 hover:text-amber-700"
              >
                Signup
              </Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
