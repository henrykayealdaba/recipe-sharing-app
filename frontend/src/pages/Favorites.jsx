import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import useRecipes from '../hooks/useRecipes.js';
import api from '../api/axios';
import { useAuthStore } from '../stores/authStore';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton.jsx';

export default function Favorites() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const {
    data: favorites,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
    setData,
  } = useRecipes('/recipes/favorites');

  const toggleFavorite = async (id) => {
    const isFav = user?.favorites?.includes(id);

    const updated = isFav
      ? user.favorites.filter((x) => x !== id)
      : [...(user.favorites || []), id];

    setUser({ ...user, favorites: updated });

    setData((prev) => prev.filter((r) => r._id !== id));

    await api.post(`/recipes/${id}/favorite`);
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <h1 className="mb-4 text-2xl font-bold">My Favorites</h1>

      {loading && favorites.length === 0 ? (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      ) : null}

      <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onClick={() => navigate(`/recipe/${recipe._id}`)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </ul>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
