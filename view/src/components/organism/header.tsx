import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ArrowDownAZ, ArrowDownZA, SearchIcon } from "lucide-react";
import { FormAddBooks } from "../moleculs/form-add-books";
import type { Book, GetAllBookReqeuest } from "../../types/book";
import { SortComponent } from "../moleculs/sort-component";

type Props = {
  handleChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bookRequest: Omit<Book, "id">;
  handleSubmit: () => void;
  handleSearchFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter: GetAllBookReqeuest;
  setOrder: () => void;
  setSortBy: (sortBy: GetAllBookReqeuest["sortBy"]) => void;
};

export const Header = ({
  handleChangeForm,
  bookRequest,
  handleSubmit,
  handleSearchFilter,
  filter,
  setOrder,
  setSortBy,
}: Props) => {
  return (
    <header className="p-6 border-b border-border flex items-center justify-start gap-2">
      <div>
        <FormAddBooks
          handleChangeForm={handleChangeForm}
          bookRequest={bookRequest}
          handleSubmit={handleSubmit}
        />
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
        <SortComponent setSortBy={setSortBy} sortBy={filter.sortBy} />
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
