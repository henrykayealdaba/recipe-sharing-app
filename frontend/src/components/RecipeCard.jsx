import { CalendarDaysIcon, Star } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function RecipeCard({ recipe, onClick, onToggleFavorite }) {
  const user = useAuthStore((state) => state.user);

  const isFavorite = user?.favorites?.includes(recipe._id);

  return (
    <li
      onClick={onClick}
      className="relative flex h-full cursor-pointer flex-col justify-between rounded-lg border p-4 shadow-sm transition hover:bg-gray-50"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(recipe._id);
        }}
        className="absolute top-2 right-2 rounded bg-gray-200 p-1 hover:bg-gray-300"
      >
        <Star
          size={18}
          className={
            isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'
          }
        />
      </button>

      <h2 className="text-base font-bold md:text-lg">{recipe.title}</h2>

      <ul className="mt-2 ml-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700 md:text-base">
        {recipe.ingredients?.map((i, idx) => (
          <li key={idx} className="list-disc">
            {i}
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center text-sm text-gray-500">
        <CalendarDaysIcon size={16} />
        <span className="ml-2">
          {new Date(recipe.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </li>
  );
}
