import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ArrowDownAZ, ArrowDownZA, SearchIcon } from "lucide-react";
import { FormAddBooks } from "../moleculs/form-add-books";
import { useBookFilterStore } from "@/store/bookFilterStore";
import { SortComponent } from "../moleculs/sort-component";

type Props = {
  handleSubmit: () => void;
};

export const Header = ({ handleSubmit }: Props) => {
  const { filter, setFilter } = useBookFilterStore();
  const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, title: e.target.value });
  };
  const setOrder = () => {
    setFilter({ ...filter, order: filter.order === "desc" ? "asc" : "desc" });
  };
  return (
    <header className="py-6 border-b border-border flex items-center justify-start gap-2 sticky top-0 bg-white z-10">
      <div>
        <FormAddBooks handleSubmit={handleSubmit} />
      </div>

      <div>
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            onChange={handleSearchFilter}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex items-center gap-2">
        <SortComponent />
        <button className="cursor-pointer" onClick={setOrder}>
          {filter.order === "asc" ? (
            <ArrowDownZA size={16} />
          ) : (
            <ArrowDownAZ size={16} />
          )}
        </button>
      </div>
    </header>
  );
};
