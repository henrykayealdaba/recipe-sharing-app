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
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Create Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border p-2"
          required
        />

        <div>
          <h2 className="mb-2 font-semibold">Ingredients</h2>

          {ingredients.map((item, index) => (
            <div key={index} className="mb-2 flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateIngredient(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
                className="flex-1 rounded border p-2"
              />

              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="rounded bg-red-500 px-3 text-white"
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addIngredient}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            <Plus />
          </button>
        </div>

        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full rounded border p-2"
          rows={6}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-500 py-2 text-white disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Recipe'}
        </button>
      </form>
    </div>
  );
}
