import Skeleton from './Skeleton';

export default function RecipeDetailSkeleton() {
  return (
    <div className="max-w-3xl space-y-5 p-6">
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-4 w-40" />

      <div className="space-y-3 pt-3">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="space-y-3 pt-3">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      <div className="flex gap-3 pt-4">
        <Skeleton className="h-10 w-20 rounded" />
        <Skeleton className="h-10 w-20 rounded" />
      </div>
    </div>
  );
}
