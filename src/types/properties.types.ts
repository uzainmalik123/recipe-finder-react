import type { Category } from "./category.types";
import type { Meal } from "./meal.types";
import type { RecipeDetails } from "./recipe.types";

export interface CategoriesProps {
  categoryLoading: boolean;
  categoryError: string | null;
  categories: Category[];
  selectedCategory: string | null;
  retryCategory: boolean;
  setSelectedCategory: (categoryName: string) => void;
  setCategoryError: (error: string | null) => void;
  setRetryCategory: (retry: boolean) => void;
}

export interface CategoryCardProps {
  categoryName: string;
  categoryThumbnail: string;
  isSelected: boolean;
  onCategoryClick: (categoryName: string) => void;
}

export interface MealsProps {
  mealsLoading: boolean;
  mealsError: string | null;
  meals: Meal[];
  selectedCategory: string | null;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setSelectedRecipe: (recipeId: string) => void;
  setMealsError: (error: string | null) => void;
  setRetryMeals: (retry: boolean) => void;
}

export interface MealCardProps {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
  onMealSelect: (recipeId: string) => void;
}

export interface RecipeModalProps {
  recipe: RecipeDetails | null;
  open: boolean;
  recipeLoading: boolean;
  recipeError: string | null;
  setRecipeError: (error: string | null) => void;
  onOpenChange: (open: boolean) => void;
  selectedRecipe: (recipeId: string) => void;
  setRetryRecipe: (retry: boolean) => void;
}

export interface ErrorComponentProps {
  componentName: string;
  componentError: string | null;
  onRetry: (error: string | null) => void;
  retryFetch: (retry: (prev: boolean) => boolean) => void;
}
