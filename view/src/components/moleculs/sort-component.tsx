import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortComponentProps = {
  setSortBy: (sortBy: "title" | "author" | "published_year" | "newest") => void;
  sortBy: "title" | "author" | "published_year" | "newest" | undefined;
};

export function SortComponent({ setSortBy, sortBy }: SortComponentProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {["newest", "title", "published_year"].map((option) => (
          <DropdownMenuLabel
            key={option}
            className={`cursor-pointer ${
              sortBy === option ? "font-bold text-primary" : ""
            }`}
            onClick={() =>
              setSortBy(
                option as "title" | "author" | "published_year" | "newest"
              )
            }
          >
            {option.charAt(0).toUpperCase() + option.slice(1).replace("_", " ")}
          </DropdownMenuLabel>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
