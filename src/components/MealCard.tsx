import { Button } from "./ui/button";

import type { MealCardProps } from "@/types/properties.types";

const MealCard = ({ idMeal, strMeal, strMealThumb, onMealSelect }: MealCardProps) => {
  return (
    <div className="flex flex-col min-w-70 bg-primary-foreground rounded-lg">
      <button
        className="bg-no-repeat bg-cover bg-position-[center_top_-1rem] rounded-lg rounded-b-none
        flex justify-center items-end h-50 pb-2 cursor-pointer transition-all hover:scale-102 hover:transition-all"
        style={{ backgroundImage: `url(${strMealThumb})` }}
        onClick={() => onMealSelect(idMeal)}
      ></button>
      <div className="flex flex-col gap-3 p-4">
        <h3 className="text-secondary font-extrabold text-xl font-bricolage-grotesque z-10 transition-all line-clamp-2">
          {strMeal}
        </h3>
        <Button className="w-max cursor-pointer" onClick={() => onMealSelect(idMeal)}>View recipe</Button>
      </div>
    </div>
  );
};

export default MealCard;
