import { Skeleton } from "@/components/ui/skeleton";

const CategoryCardSkeleton = () => {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-55 h-45" />
    </div>
  );
};

export default CategoryCardSkeleton;
