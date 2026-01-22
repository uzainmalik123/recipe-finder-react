import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import SplitText from "./SplitText.tsx";

import type { HeaderProps } from "@/types/properties.types.ts";

const Header = ({ handleFormSubmit }: HeaderProps) => {
  return (
    <header className="w-full flex flex-col items-center gap-6">
      <SplitText
        tag="h1"
        text="Want to make something delicious?"
        className="font-bricolage-grotesque font-bold text-4xl"
        splitType="words"
      />
      <form onSubmit={handleFormSubmit} action="submit" className="flex items-center w-2/4 gap-2 max-md:flex-col">
        <Input type="search" placeholder="Search for a recipe.." name="searchQuery" className="min-w-62" />
        <Button type="submit" className="cursor-pointer max-md:min-w-62">Search</Button>
      </form>
    </header>
  );
};

export default Header;
