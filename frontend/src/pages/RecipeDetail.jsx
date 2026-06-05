import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuthStore } from '../stores/authStore';
import RecipeDetailSkeleton from '../components/RecipeDetailSkeleton.jsx';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data.recipe);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/recipes/${id}`);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <RecipeDetailSkeleton />;
  if (!recipe) return <p className="p-4">Recipe not found</p>;

  const isOwner = user?._id === recipe.user?._id;

  return (
    <div className="mx-4 max-w-3xl p-4 sm:mx-auto sm:p-6">
      <h1 className="text-2xl font-bold sm:text-3xl">{recipe.title}</h1>

      <p className="mt-2 text-sm text-gray-500 sm:text-base">
        Updated: {new Date(recipe.updatedAt).toLocaleDateString()}
      </p>

      <h2 className="mt-6 text-lg font-semibold sm:text-xl">Ingredients</h2>
      <ul className="mt-2 list-disc pl-5 text-sm sm:text-base">
        {recipe.ingredients.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>

      <h2 className="mt-6 text-lg font-semibold sm:text-xl">Instructions</h2>
      <p className="mt-2 text-sm whitespace-pre-line sm:text-base">
        {recipe.instructions}
      </p>

      {isOwner && (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleDelete}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Delete
          </button>

          <button
            onClick={() => navigate(`/recipe/${id}/edit`)}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
