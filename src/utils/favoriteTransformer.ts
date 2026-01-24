import type { Meal } from "@/types/meal.types";
import type { Favorite } from "@/types/favorite.types";

export function transformFavoriteToMeal(favorite: Favorite): Meal {
  return {
    idMeal: favorite.recipeId,
    strMeal: favorite.recipeName,
    strMealThumb: favorite.recipeThumbnail,
  };
}

export function transformFavoritesToMeals(favorites: Favorite[]): Meal[] {
  return favorites.map(transformFavoriteToMeal);
}
