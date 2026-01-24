import { Button } from "./ui/button";
import { Heart } from "lucide-react";

import type { MealCardProps } from "@/types/properties.types";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  isFavorited,
  addFavorite,
  removeFavorite,
} from "@/services/favoritesService";

const MealCard = ({
  idMeal,
  strMeal,
  strMealThumb,
  onMealSelect,
}: MealCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userLoggedIn, currentUser } = useAuth();

  useEffect(() => {
    if (userLoggedIn && currentUser) {
      checkFavoriteStatus();
    }
  }, [userLoggedIn, currentUser]);

  const checkFavoriteStatus = async () => {
    if (!currentUser) return;
    const favorited = await isFavorited(currentUser.uid, idMeal);
    setIsFavorite(favorited);
  };

  const toggleFavorite = async () => {
    if (!userLoggedIn && !currentUser) {
      toast.error("Error", {
        description: "Please login to save to favorites",
      });
    }

    try {
      setLoading(true);

      if (isFavorite) {
        await removeFavorite(currentUser!.uid, idMeal);
        setIsFavorite(false);
        toast.success("Success", {
          description: "Removed from favorites!",
        });
      } else {
        await addFavorite(currentUser!.uid, idMeal, strMeal, strMealThumb);
        setIsFavorite(true);
        toast.success("Success", {
          description: "Added to favorites!",
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: `Failed to update favorites, ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-w-60 bg-primary-foreground rounded-lg">
      <button
        className="bg-no-repeat bg-cover bg-position-[center_top_-1rem] rounded-lg rounded-b-none
        flex justify-end items-start p-2 h-50 pb-2 cursor-pointer transition-all hover:scale-102 hover:transition-all"
        style={{ backgroundImage: `url(${strMealThumb})` }}
        onClick={() => onMealSelect(idMeal)}
      ></button>
      <div className="flex flex-col justify-between h-35 p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-secondary font-extrabold text-xl font-bricolage-grotesque z-10 transition-all line-clamp-2">
            {strMeal}
          </h3>
          {userLoggedIn && (
            <button
              onClick={toggleFavorite}
              className="bg-none border-none cursor-pointer p-2"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>
          )}
        </div>
        <Button
          className="w-max cursor-pointer"
          onClick={() => onMealSelect(idMeal)}
        >
          View recipe
        </Button>
      </div>
    </div>
  );
};

export default MealCard;
