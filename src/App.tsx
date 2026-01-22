import { useState, useEffect } from "react";
import { Header, Categories, Meals, RecipeModal } from "./components";

import type { RecipeDetails, RecipeApiResponse } from "./types/recipe.types";
import type { ApiResponse, Category } from "./types/category.types";
import type { MealsResponse, Meal } from "./types/meal.types";

import { recipeTransformer } from "./utils/recipeTransformer";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [retryCategory, setRetryCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [meals, setMeals] = useState<Meal[]>([]);
  const [mealsLoading, setMealsLoading] = useState(false);
  const [mealsError, setMealsError] = useState<string | null>(null);
  const [retryMeals, setRetryMeals] = useState(false);
  const mealsPerPage = 8;

  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [recipeError, setRecipeError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [retryRecipe, setRetryRecipe] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState<FormDataEntryValue | null>(
    null
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const apiData: ApiResponse = await response.json();
        const data: Category[] = apiData.categories;

        setCategories(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch categories"
        );
        console.error("Error fetching categories: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [retryCategory]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        if (!selectedCategory) return;
        setMealsLoading(true);

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const apiData: MealsResponse = await response.json();
        const data: Meal[] = apiData.meals;

        setMeals(data);
        setMealsError(null);
      } catch (err) {
        setMealsError(
          err instanceof Error ? err.message : "Failed to fetch categories"
        );
        console.error("Error fetching categories: ", err);
      } finally {
        setMealsLoading(false);
      }
    };

    fetchMeals();
  }, [selectedCategory, retryMeals]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setRecipeLoading(true);
        setOpenModal(false);

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedRecipe}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const apiData = await response.json();
        const rawRecipe: RecipeApiResponse = apiData.meals[0];

        const formattedRecipe = recipeTransformer(rawRecipe);

        setRecipe(formattedRecipe);
        setRecipeError(null);
      } catch (err) {
        setRecipeError(
          err instanceof Error ? err.message : "Failed to fetch categories"
        );
        console.error("Error fetching categories: ", err);
      } finally {
        setRecipeLoading(false);
        setOpenModal(true);
      }
    };

    fetchRecipe();
  }, [selectedRecipe, retryRecipe]);

  useEffect(() => {
    const fetchMealByName = async () => {
      try {
        if (!searchQuery) return;
        setMealsLoading(true);

        console.log(searchQuery);

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const apiData: MealsResponse = await response.json();
        const data: Meal[] = apiData.meals;

        if (!data && searchQuery) {
          setNotFound(true);
          return;
        } else if (!data) {
          return;
        }

        setMeals(data);
        setMealsError(null);
        setNotFound(false)
      } catch (err) {
        setMealsError(
          err instanceof Error ? err.message : "Failed to fetch categories"
        );
        console.error("Error fetching categories: ", err);
      } finally {
        setMealsLoading(false);
      }
    };

    fetchMealByName();
  }, [searchQuery]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const inputData = formData.get("searchQuery");
    setSearchQuery(inputData);
    formEl.reset();
  };

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);
  const totalPages = Math.ceil(meals.length / mealsPerPage);

  return (
    <AuthProvider>
      <main className="App w-full max-w-480 h-full flex flex-col items-center py-10 px-20 gap-10 max-[640px]:px-10 max-[500px]:px-5">
        <Header handleFormSubmit={handleFormSubmit} />
        <Meals
          meals={currentMeals}
          mealsError={mealsError}
          mealsLoading={mealsLoading}
          selectedCategory={selectedCategory}
          currentPage={currentPage}
          totalPages={totalPages}
          notFound={notFound}
          retryMeals={retryMeals}
          setCurrentPage={setCurrentPage}
          setSelectedRecipe={setSelectedRecipe}
          setMealsError={setMealsError}
          setRetryMeals={setRetryMeals}
        />
        <Categories
          categoryLoading={loading}
          categoryError={error}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setCategoryError={setError}
          retryCategory={retryCategory}
          setRetryCategory={setRetryCategory}
        />
        {selectedRecipe &&
          (recipe ? (
            <RecipeModal
              open={openModal}
              recipe={recipe}
              recipeLoading={recipeLoading}
              recipeError={recipeError}
              retryRecipe={retryRecipe}
              onOpenChange={setOpenModal}
              setRecipeError={setRecipeError}
              selectedRecipe={setSelectedRecipe}
              setRetryRecipe={setRetryRecipe}
            />
          ) : (
            <p>No Recipes found!</p>
          ))}
      </main>
    </AuthProvider>
  );
}

export default App;
