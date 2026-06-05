import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import RecipeList from '../components/RecipeList';

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <main className="space-y-6 p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-[0_20px_60px_rgba(15,23,42,0.20)] sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm tracking-[0.3em] text-amber-300 uppercase">
              Recipe Sharing App
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Cook, share, and collect recipes in one place.
            </h1>
            <p className="max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Explore dishes from other cooks, save your favorites, and publish
              your own creations with a layout that works across desktop and
              mobile.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-xs tracking-[0.3em] text-slate-300 uppercase">
                Logged in as
              </p>
              <p className="mt-1 text-lg font-semibold">
                {user ? user.username : 'Guest'}
              </p>
            </div>

            {user && (
              <button
                className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-amber-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </section>

      <RecipeList />
    </main>
  );
}
