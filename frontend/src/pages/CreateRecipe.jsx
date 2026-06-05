import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../stores/recipeStore';

export default function CreateRecipe() {
  const navigate = useNavigate();
  const { createRecipe, loading } = useRecipeStore();

  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState(['', '', '']);

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      title,
      instructions,
      ingredients: ingredients.filter((item) => item.trim() !== ''),
    };

    try {
      await createRecipe(recipeData);

      setTitle('');
      setInstructions('');
      setIngredients(['']);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="rounded-[2rem] bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 shadow-sm sm:p-8">
          <p className="text-sm tracking-[0.3em] text-emerald-700 uppercase">
            New recipe
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Share something delicious.
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            Give your recipe a clear title, list the ingredients, and write the
            steps in a way people can follow on any device.
          </p>

          <div className="mt-8 space-y-3 text-sm text-slate-700">
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
              Keep ingredients short and specific.
            </div>
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
              Use line breaks in instructions for readability.
            </div>
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
              The author name will appear automatically from your account.
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
                type="text"
                placeholder="Recipe title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white"
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
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                >
                  <Plus size={16} /> Add ingredient
                </button>
              </div>

              <div className="space-y-3">
                {ingredients.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      placeholder={`Ingredient ${index + 1}`}
                      className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white"
                    />

                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="rounded-2xl bg-rose-500 px-4 text-white transition hover:bg-rose-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Instructions
              </label>
              <textarea
                placeholder="Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="min-h-48 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white"
                rows={8}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Recipe'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
