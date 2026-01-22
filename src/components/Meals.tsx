import { useRef, useEffect } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

import { MealCard, MealCardSkeleton, ErrorComponent } from "./../components";

import type { MealsProps } from "@/types/properties.types";

const Meals = ({
  mealsLoading,
  mealsError,
  meals,
  selectedCategory,
  totalPages,
  currentPage,
  notFound,
  retryMeals,
  setCurrentPage,
  setSelectedRecipe,
  setMealsError,
  setRetryMeals,
}: MealsProps) => {
  const mealHeading = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mealHeading.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [currentPage]);

  if (!selectedCategory && meals.length === 0) {
    return (
      <p>
        {!mealsError && !mealsLoading && !notFound
          ? `Please search for a meal or select a category to display meals.`
          : `No meals with this name found, Kindly check for typos.`}
      </p>
    );
  }

  return (
    meals && (
      <section className="flex flex-col gap-6 items-center">
        <h2
          className="font-bricolage-grotesque text-3xl font-semibold"
          ref={mealHeading}
        >
          Meals:
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mealsLoading && !mealsError
            ? Array.from({ length: 14 }).map((_, index) => (
                <MealCardSkeleton key={index} />
              ))
            : meals.map((meal) => (
                <MealCard
                  key={meal.idMeal}
                  idMeal={meal.idMeal}
                  strMeal={meal.strMeal}
                  strMealThumb={meal.strMealThumb}
                  onMealSelect={setSelectedRecipe}
                />
              ))}
          {mealsError && (
            <ErrorComponent
              componentName="meals"
              componentError={mealsError}
              retryValue={retryMeals}
              onRetry={setMealsError}
              retryFetch={setRetryMeals}
            />
          )}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {currentPage > 2 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(1)}
                    className="cursor-pointer"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            )}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="cursor-pointer"
                >
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink isActive className="cursor-default">
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="cursor-pointer"
                >
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            {currentPage < totalPages - 1 && (
              <>
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(totalPages)}
                    className="cursor-pointer"
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  currentPage < totalPages && setCurrentPage(currentPage + 1)
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    )
  );
};

export default Meals;
