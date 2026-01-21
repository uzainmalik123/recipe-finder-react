import { Skeleton } from "./ui/skeleton";
import { Separator } from "@radix-ui/react-separator";

const RecipeModalSkeleton = () => {
  return (
    <div className="relative">
      <div className="relative h-72 w-full bg-gray-200">
        <Skeleton className="w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
          <Skeleton className="h-10 w-3/4 bg-gray-300" />
          <Skeleton className="h-6 w-1/2 bg-gray-300" />
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 space-y-4">
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-3 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-6">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>

          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-6 mt-6 border-t">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  );
};

export default RecipeModalSkeleton;
