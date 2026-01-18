import { Skeleton } from "@/components/ui/skeleton";

const CategoryCardSkeleton = () => {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-75 h-35" />
      <Skeleton className="h-6 w-3/4 mt-2" />
      <Skeleton className="h-4 w-full mt-1" />
      <Skeleton className="h-4 w-5/6 mt-1" />
    </div>
  );
};

export default CategoryCardSkeleton;
