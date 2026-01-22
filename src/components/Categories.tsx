import {
  CategoryCard,
  CategoryCardSkeleton,
  ErrorComponent,
} from "./../components";

import type { CategoriesProps } from "@/types/properties.types";

const Categories = ({
  categoryLoading,
  categoryError,
  categories,
  selectedCategory,
  retryCategory,
  setSelectedCategory,
  setCategoryError,
  setRetryCategory,
}: CategoriesProps) => {
  return (
    <section className="flex flex-col gap-6 items-center">
      <h2 className="font-bricolage-grotesque text-3xl font-semibold">
        Categories:
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categoryLoading && !categoryError
          ? Array.from({ length: 14 }).map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))
          : categories.map((category) => (
              <CategoryCard
                key={category.idCategory}
                categoryName={category.strCategory}
                categoryThumbnail={category.strCategoryThumb}
                onCategoryClick={setSelectedCategory}
                isSelected={selectedCategory === category.strCategory}
              />
            ))}
        {categoryError && (
          <ErrorComponent
            componentName="category"
            componentError={categoryError}
            retryValue={retryCategory}
            onRetry={setCategoryError}
            retryFetch={() => setRetryCategory}
          />
        )}
      </div>
    </section>
  );
};

export default Categories;
