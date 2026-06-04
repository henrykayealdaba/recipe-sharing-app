import Skeleton from './Skeleton';

export default function RecipeCardSkeleton() {
  return (
    <div className="space-y-3 rounded-lg border p-3">
      <Skeleton className="h-5 w-2/3" />

      <div className="flex gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-14" />
      </div>

      <Skeleton className="h-3 w-32" />
    </div>
  );
}
