import type { CategoryCardProps } from "@/types/properties.types";

const CategoryCard = ({
  categoryName,
  categoryThumbnail,
  isSelected,
  onCategoryClick,
  setShowFavorites,
}: CategoryCardProps) => {
  
  const handleCategoryClick = (categoryName: string) => {
    onCategoryClick(categoryName);
    setShowFavorites(false);
  };

  return (
    <button
      className={`bg-no-repeat bg-position-[center_top_0.5rem] bg-contain relative group
       flex justify-center items-end w-55 h-45 pb-2 rounded-lg bg-gray-200 cursor-pointer transition-all
       before:absolute before:w-full before:height-full before:inset-0
       before:bg-[rgba(0,0,0,0.25)] before:rounded-lg hover:before:opacity-0 before:transition-all
       hover:scale-105
      ${isSelected && "outline-2 outline-background"}
       `}
      onClick={() => handleCategoryClick(categoryName)}
      style={{ backgroundImage: `url(${categoryThumbnail})` }}
    >
      <h3
        className="text-background font-extrabold text-2xl font-bricolage-grotesque z-10 transition-all
       group-hover:transition-all group-hover:text-primary"
      >
        {categoryName}
      </h3>
    </button>
  );
};

export default CategoryCard;
