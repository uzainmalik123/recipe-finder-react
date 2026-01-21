import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Youtube, Globe, ChefHat, MapPin } from "lucide-react";
import { ErrorComponent, RecipeModalSkeleton } from "./../components";
import type { RecipeModalProps } from "@/types/properties.types";

const RecipeModal = ({
  open,
  recipe,
  recipeLoading,
  recipeError,
  setRecipeError,
  onOpenChange,
  setRetryRecipe
}: RecipeModalProps) => {
  if (!recipe) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          {recipeLoading && !recipeError ? (
            <RecipeModalSkeleton />
          ) : recipe && !recipeError ? (
            <div className="relative">
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={recipe.thumbnail}
                  alt={recipe.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                <DialogHeader className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <DialogTitle className="text-4xl font-bold mb-2">
                    {recipe.name}
                  </DialogTitle>
                  <DialogDescription className="text-gray-100 flex flex-wrap items-center gap-3 text-base">
                    <div className="flex items-center gap-1">
                      <ChefHat className="w-4 h-4" />
                      <span className="font-medium">{recipe.category}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{recipe.area} Cuisine</span>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="p-6">
                <div className="mb-6 space-y-4">
                  {recipe.tags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 mb-2">
                        Tags
                      </h4>
                      <div className="flex gap-2 flex-wrap">
                        {recipe.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-sm"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Recipe ID</p>
                      <p className="font-mono text-sm font-semibold">
                        #{recipe.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Category</p>
                      <p className="text-sm font-semibold">{recipe.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Cuisine</p>
                      <p className="text-sm font-semibold">{recipe.area}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Ingredients</p>
                      <p className="text-sm font-semibold">
                        {recipe.ingredients.length} items
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <Tabs defaultValue="ingredients" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="ingredients">
                      Ingredients ({recipe.ingredients.length})
                    </TabsTrigger>
                    <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="ingredients" className="mt-6">
                    <div className="space-y-3">
                      {recipe.ingredients && recipe.ingredients.length > 0 ? (
                        recipe.ingredients.map((ingredient, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-semibold text-gray-600">
                                {index + 1}
                              </div>
                              <span className="font-medium capitalize text-gray-800">
                                {ingredient.name}
                              </span>
                            </div>
                            <span className="text-gray-600 font-semibold bg-gray-50 px-3 py-1 rounded-full text-sm">
                              {ingredient.measure}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic text-center py-8">
                          No ingredients available
                        </p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="instructions" className="mt-6">
                    <div className="prose prose-sm max-w-none bg-gray-50 p-6 rounded-lg">
                      {recipe.instructions ? (
                        recipe.instructions.split("\n").map(
                          (paragraph, index) =>
                            paragraph.trim() && (
                              <p
                                key={index}
                                className="mb-4 text-gray-700 leading-relaxed last:mb-0"
                              >
                                {paragraph}
                              </p>
                            )
                        )
                      ) : (
                        <p className="text-gray-500 italic">
                          No instructions available
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t">
                  {recipe.youtubeUrl && (
                    <Button
                      variant="default"
                      className="flex-1 cursor-pointer"
                      onClick={() => window.open(recipe.youtubeUrl!, "_blank")}
                    >
                      <Youtube className="mr-2 h-4 w-4" />
                      Watch Video Tutorial
                    </Button>
                  )}
                  {recipe.sourceUrl && (
                    <Button
                      variant="outline"
                      className="flex-1 cursor-pointer"
                      onClick={() => window.open(recipe.sourceUrl!, "_blank")}
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Original Recipe Source
                    </Button>
                  )}
                  {!recipe.youtubeUrl && !recipe.sourceUrl && (
                    <p className="text-sm text-gray-500 text-center py-2">
                      No external resources available for this recipe
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            !recipeError && (
              <div className="p-6 text-center text-foreground">
                <p className="text-xl">Recipe not found</p>
              </div>
            )
          )}
          {recipeError && (
            <ErrorComponent
              componentName="recipe"
              componentError={recipeError}
              onRetry={setRecipeError}
              retryFetch={() => setRetryRecipe}
            />
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;
