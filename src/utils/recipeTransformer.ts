import type {
  RecipeDetails,
  RecipeApiResponse,
  Ingredient,
} from "@/types/recipe.types";

export function recipeTransformer(apiRecipe: RecipeApiResponse): RecipeDetails {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient =
      apiRecipe[`strIngredient${i}` as keyof RecipeApiResponse];
    const measure = apiRecipe[`strMeasure${i}` as keyof RecipeApiResponse];

    if (
      ingredient &&
      measure &&
      ingredient.trim() !== "" &&
      measure.trim() !== ""
    ) {
      ingredients.push({
        name: ingredient,
        measure: measure,
      });
    }
  }

  return {
    id: apiRecipe.idMeal,
    name: apiRecipe.strMeal,
    category: apiRecipe.strCategory,
    area: apiRecipe.strArea,
    instructions: apiRecipe.strInstructions,
    thumbnail: apiRecipe.strMealThumb,
    tags: apiRecipe.strTags
      ? apiRecipe.strTags.split(",").map((tag) => tag.trim())
      : [],
    ingredients,
    youtubeUrl: apiRecipe.strYoutube || null,
    sourceUrl: apiRecipe.strSource || null,
  };
}
