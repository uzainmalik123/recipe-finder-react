import { Skeleton } from "./ui/skeleton";

const MealCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-70 h-50" />
      <Skeleton className="w-55 h-5" />
      <Skeleton className="w-45 h-7" />
    </div>
  );
};

export default MealCardSkeleton;
