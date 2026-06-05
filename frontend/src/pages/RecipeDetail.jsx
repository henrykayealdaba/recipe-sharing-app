import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuthStore } from '../stores/authStore';
import RecipeDetailSkeleton from '../components/RecipeDetailSkeleton.jsx';
import { CalendarDays, ChefHat, Pencil, Trash2 } from 'lucide-react';

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
  const authorName = recipe.user?.username || recipe.user?.email || 'Chef';

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 shadow-sm">
              <ChefHat size={14} /> {authorName}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 shadow-sm">
              <CalendarDays size={14} />
              {new Date(recipe.updatedAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {recipe.title}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            A recipe shared by {authorName}. Use the ingredient list below and
            follow the steps to recreate it in your own kitchen.
          </p>
        </div>

        <div className="grid gap-6 px-5 py-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <section className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Ingredients
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 sm:text-base">
              {recipe.ingredients.map((i, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 rounded-xl bg-white px-4 py-3 shadow-sm"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Instructions
            </h2>
            <p className="mt-4 text-sm leading-7 whitespace-pre-line text-slate-700 sm:text-base">
              {recipe.instructions}
            </p>

            {isOwner && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 py-3 text-white transition hover:bg-rose-700"
                >
                  <Trash2 size={16} /> Delete
                </button>

                <button
                  onClick={() => navigate(`/recipe/${id}/edit`)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-800"
                >
                  <Pencil size={16} /> Edit
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
