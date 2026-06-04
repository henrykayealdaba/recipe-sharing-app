import { useState, useEffect } from 'react';
import useRecipes from '../hooks/useRecipes.js';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import Searchbar from '../components/Searchbar';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import api from '../api/axios';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton.jsx';

export default function RecipeList() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); //? This is the debounce, I set it to 300 milliseconds

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data: recipes,
    loading,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useRecipes('/recipes', debouncedSearch);

  const toggleFavorite = async (id) => {
    const isFav = user?.favorites?.includes(id);

    const updated = isFav
      ? user.favorites.filter((x) => x !== id)
      : [...(user.favorites || []), id];

    setUser({ ...user, favorites: updated });

    await api.post(`/recipes/${id}/favorite`);
  };

  return (
    <div className="max-w-2xl">
      <Searchbar value={search} onChange={setSearch} />

      {loading && recipes.length === 0 ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <RecipeCardSkeleton key={index} />
          ))}
        </div>
      ) : null}

      <ul className="space-y-2">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onClick={() => navigate(`/recipe/${recipe._id}`)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
