import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface CategoryCardProps {
  categoryName: string;
  categoryThumbnail: string;
  categoryDesc: string;
}

const CategoryCard = ({
  categoryName,
  categoryThumbnail,
  categoryDesc,
}: CategoryCardProps) => {
  return (
    <div
      className="flex flex-col bg-primary-foreground rounded-lg overflow-hidden
      relative gap-2 max-w-75 before:absolute before:w-full before:h-20 before:bg-linear-to-b before:from-transparent
      before:to-primary-foreground before:bottom-0 before:left-0 before:pointer-events-none
      "
    >
      <div
        className="bg-no-repeat bg-top bg-cover w-full h-35 rounded-lg rounded-b-none bg-gray-200"
        style={{ backgroundImage: `url(${categoryThumbnail})` }}
      ></div>
      <div className="flex flex-col px-4 py-1 h-40 gap-1.5">
        <h3 className="font-semibold text-xl font-bricolage-grotesque">
          {categoryName}
        </h3>
        <HoverCard>
          <HoverCardTrigger className="text-sm font-light">
            {categoryDesc}
          </HoverCardTrigger>
          <HoverCardContent className="text-sm">
            {categoryDesc}
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
};

export default CategoryCard;
