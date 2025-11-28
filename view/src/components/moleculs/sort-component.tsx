import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBookFilterStore } from "@/store/bookFilterStore";
import { ChevronDown } from "lucide-react";
export function SortComponent() {
  const { filter, setFilter } = useBookFilterStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer flex items-center gap-1"
        >
          Sort
          <ChevronDown size={10} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {["newest", "title", "published_year"].map((option) => (
          <DropdownMenuLabel
            key={option}
            className={`cursor-pointer ${
              filter.sortBy === option ? "font-bold text-primary" : ""
            }`}
            onClick={() => setFilter({ ...filter, sortBy: option as any })}
          >
            {option.charAt(0).toUpperCase() + option.slice(1).replace("_", " ")}
          </DropdownMenuLabel>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
