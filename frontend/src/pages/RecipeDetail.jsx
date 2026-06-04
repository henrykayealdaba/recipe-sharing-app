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
  if (!recipe) return <p className="p-6">Recipe not found</p>;

  const isOwner = user?._id === recipe.user?._id;

  return (
    <div className="max-w-3xl p-6">
      <h1 className="text-3xl font-bold">{recipe.title}</h1>

      <p className="mt-2 text-gray-500">
        Updated: {new Date(recipe.updatedAt).toLocaleDateString()}
      </p>

      <h2 className="mt-6 text-xl font-semibold">Ingredients</h2>
      <ul className="mt-2 list-disc pl-5">
        {recipe.ingredients.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>

      <h2 className="mt-6 text-xl font-semibold">Instructions</h2>
      <p className="mt-2 whitespace-pre-line">{recipe.instructions}</p>

      {isOwner && (
        <div className="mt-8 flex gap-3">
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
