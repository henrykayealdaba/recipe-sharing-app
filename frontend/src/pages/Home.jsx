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
    <main className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-end space-x-2">
        <span>Welcome, {user ? user.username : 'Guest'}</span>
        {user && (
          <button
            className="cursor-pointer rounded px-4 py-2 text-black ring-1 ring-red-400 hover:bg-red-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>

      <RecipeList />
    </main>
  );
}
