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
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Edit Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border p-2"
          required
        />

        <div>
          <h2 className="font-semibold">Ingredients</h2>

          {ingredients.map((item, index) => (
            <div key={index} className="mb-2 flex gap-2">
              <input
                value={item}
                placeholder={`Ingredient ${index + 1}`}
                onChange={(e) => updateIngredient(index, e.target.value)}
                className="flex-1 rounded border p-2"
                required
              />

              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="rounded bg-red-500 px-2 text-white"
              >
                <Trash2 />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addIngredient}
            className="rounded bg-green-500 px-3 py-1 text-white"
          >
            <Plus />
          </button>
        </div>

        <textarea
          value={instructions}
          placeholder="Instructions"
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full rounded border p-2"
          rows={6}
          required
        />

        <button
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          {loading ? 'Updating...' : 'Update Recipe'}
        </button>
      </form>
    </div>
  );
}
