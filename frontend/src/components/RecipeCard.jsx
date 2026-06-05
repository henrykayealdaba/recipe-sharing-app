import { CalendarDaysIcon, ChefHat, Star } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function RecipeCard({ recipe, onClick, onToggleFavorite }) {
  const user = useAuthStore((state) => state.user);

  const isFavorite = user?.favorites?.includes(recipe._id);
  const authorName = recipe.user?.username || recipe.user?.email || 'Chef';

  return (
    <li
      onClick={onClick}
      className="group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(recipe._id);
        }}
        className="absolute top-3 right-3 rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-900 hover:text-white"
      >
        <Star
          size={18}
          className={
            isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'
          }
        />
      </button>

      <div className="mb-4 pr-10">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
          {recipe.title}
        </h2>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
            <ChefHat size={14} /> {authorName}
          </span>
          {recipe.createdAt && (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
              Added {new Date(recipe.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <ul className="ml-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-700 md:text-base">
        {recipe.ingredients?.map((i, idx) => (
          <li key={idx} className="list-disc">
            {i}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center text-sm text-slate-500">
        <CalendarDaysIcon size={16} />
        <span className="ml-2">
          {new Date(recipe.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </li>
  );
}
