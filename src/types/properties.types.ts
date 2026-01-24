import type React from "react";
import type { Category } from "./category.types";
import type { Meal } from "./meal.types";
import type { RecipeDetails } from "./recipe.types";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";

export interface CategoriesProps {
  categoryLoading: boolean;
  categoryError: string | null;
  categories: Category[];
  selectedCategory: string | null;
  retryCategory: boolean;
  setSelectedCategory: (categoryName: string) => void;
  setCategoryError: (error: string | null) => void;
  setRetryCategory: (retry: boolean) => void;
  setShowFavorites: (value: boolean) => void;
}

export interface CategoryCardProps {
  categoryName: string;
  categoryThumbnail: string;
  isSelected: boolean;
  onCategoryClick: (categoryName: string) => void;
  setShowFavorites: (value: boolean) => void;
}

export interface MealsProps {
  mealsLoading: boolean;
  mealsError: string | null;
  meals: Meal[] | [];
  selectedCategory: string | null;
  currentPage: number;
  totalPages: number;
  notFound: boolean | null;
  retryMeals: boolean;
  showFavorites: boolean;
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
  retryRecipe: boolean;
  setRecipeError: (error: string | null) => void;
  onOpenChange: (open: boolean) => void;
  selectedRecipe: (recipeId: string) => void;
  setRetryRecipe: (retry: boolean) => void;
}

export interface ErrorComponentProps {
  componentName: string;
  componentError: string | null;
  retryValue: boolean;
  onRetry: (error: string | null) => void;
  retryFetch: (prev: boolean) => void;
}

export interface HeaderProps {
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface LoginFormProps {
  setOpenLogin: (value: boolean) => void;
}

export interface SignupFormProps {
  setOpenSignup: (value: boolean) => void;
}

export interface NavbarProps {
  currentUser: User | null;
  userLoggedIn: boolean;
  logout: () => Promise<void>;
  setShowFavorites: (value: boolean) => void;
}

export interface FavoritesProps {
  mealsLoading: boolean;
  mealsError: string | null;
  currentPage: number;
  totalPages: number;
  retryMeals: boolean;
  setCurrentPage: (page: number) => void;
  setSelectedRecipe: (recipeId: string) => void;
  setMealsError: (error: string | null) => void;
  setRetryMeals: (retry: boolean) => void;
}
