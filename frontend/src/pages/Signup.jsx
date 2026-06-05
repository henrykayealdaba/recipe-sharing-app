import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate, Link } from 'react-router-dom';
import { ChefHat, Sparkles, Mail, Lock, UserRound } from 'lucide-react';

export default function Signup() {
  const signup = useAuthStore((state) => state.signup);
  const loading = useAuthStore((state) => state.loading);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
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

    await signup(form);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.16),_transparent_30%),linear-gradient(135deg,_#052e16_0%,_#064e3b_45%,_#0f172a_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[2rem] bg-white/95 shadow-[0_25px_80px_rgba(15,23,42,0.25)] backdrop-blur md:grid-cols-2">
        <section className="hidden flex-col justify-between bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 p-8 text-white md:flex lg:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm text-emerald-200">
              <Sparkles size={14} /> Create your account
            </div>
            <h1 className="mt-6 max-w-sm text-4xl font-semibold tracking-tight lg:text-5xl">
              Build your own recipe collection and follow other cooks.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-emerald-100/80 lg:text-base">
              Join to publish dishes, save favorites, and keep your profile
              connected across devices.
            </p>
          </div>

          <div className="space-y-3 text-sm text-emerald-100/80">
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
              <ChefHat size={18} /> Show who created every recipe
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
              <Sparkles size={18} /> Clean, mobile-friendly layout
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
            <div>
              <p className="text-sm font-semibold tracking-[0.25em] text-emerald-600 uppercase">
                Recipe sharing app
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                Signup
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Start sharing your best dishes.
              </p>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Username
              </span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-emerald-400 focus-within:bg-white">
                <UserRound size={18} className="text-slate-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Your username"
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                  onChange={handleChange}
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-emerald-400 focus-within:bg-white">
                <Mail size={18} className="text-slate-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                  onChange={handleChange}
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </span>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-emerald-400 focus-within:bg-white">
                <Lock size={18} className="text-slate-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  className="w-full bg-transparent outline-none placeholder:text-slate-400"
                  onChange={handleChange}
                />
              </div>
            </label>

            <button
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Signup'}
            </button>

            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link
                to={'/login'}
                className="font-medium text-emerald-600 hover:text-emerald-700"
              >
                Login
              </Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
