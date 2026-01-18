import { useEffect, useState } from "react";

import { CategoryCard, CategoryCardSkeleton } from "./../components";

const Categories: React.FC = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  interface ApiResponse {
    categories: Category[];
  }

  interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );

        if (!response.ok) {
          setError(true);
          throw new Error("Failed to fetch categories!");
        }

        const apiData: ApiResponse = await response.json();
        const data: Category[] = apiData.categories;

        setCategories(data);
        setError(false);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(true);
          console.error("Failed to fetch categories: ", err);
        } else {
          throw new Error("Unknown error");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <section className="flex flex-col gap-6 items-center">
      <h2 className="font-bricolage-grotesque text-3xl font-semibold">Categories:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading 
          ? 
            Array.from({ length: 14 }).map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))
          : 
            categories.map((category) => (
              <CategoryCard
                key={category.idCategory}
                categoryName={category.strCategory}
                categoryDesc={category.strCategoryDescription}
                categoryThumbnail={category.strCategoryThumb}
              />
            ))}
      </div>
    </section>
  );
};

export default Categories;
