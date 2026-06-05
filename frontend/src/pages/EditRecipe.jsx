import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useRecipeStore } from '../stores/recipeStore';
import { Plus, Trash2 } from 'lucide-react';

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { updateRecipe, loading } = useRecipeStore();

  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState(['']);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await api.get(`/recipes/${id}`);
      const recipe = res.data.recipe;

      setTitle(recipe.title);
      setInstructions(recipe.instructions);
      setIngredients(recipe.ingredients);
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateRecipe(id, {
        title,
        instructions,
        ingredients,
      });

      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const updateIngredient = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="rounded-[2rem] bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 p-6 shadow-sm sm:p-8">
          <p className="text-sm tracking-[0.3em] text-sky-700 uppercase">
            Edit recipe
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Refine the details.
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            Improve the title, ingredients, or instructions while keeping the
            recipe easy to read on desktop and mobile.
          </p>

          <div className="mt-8 space-y-3 text-sm text-slate-700">
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
              Keep the ingredient list in the same order as the cooking steps.
            </div>
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
              Long instructions are easier to follow with short paragraphs.
            </div>
          </div>
        </aside>

        <section className="rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Recipe title
              </label>
              <input
                placeholder="Recipe title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition outline-none placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
                required
              />
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
                  Ingredients
                </h2>

                <button
                  type="button"
                  onClick={addIngredient}
                  className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
                >
                  <Plus size={16} /> Add ingredient
                </button>
              </div>

              <div className="space-y-3">
                {ingredients.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      value={item}
                      placeholder={`Ingredient ${index + 1}`}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition outline-none placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="rounded-2xl bg-rose-500 px-4 text-white transition hover:bg-rose-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Instructions
              </label>
              <textarea
                value={instructions}
                placeholder="Instructions"
                onChange={(e) => setInstructions(e.target.value)}
                className="min-h-48 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition outline-none placeholder:text-slate-400 focus:border-sky-400 focus:bg-white"
                rows={8}
                required
              />
            </div>

            <button
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Recipe'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
