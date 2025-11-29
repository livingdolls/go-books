import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { GetAllBookReqeuest } from "@/types/book";

interface BookFilterState {
  filter: GetAllBookReqeuest;
  setFilter: (filter: GetAllBookReqeuest) => void;
  selectedBookId: number;
  setSelectedBookId: (id: number) => void;
}

// Zustand store to manage book filter state
// including filter criteria and selected book IDS
export const useBookFilterStore = create<BookFilterState>()(
  devtools((set) => ({
    filter: { title: "", sortBy: "newest", order: "desc" }, // default filter
    setFilter: (filter) => set({ filter }),
    selectedBookId: 0,
    setSelectedBookId: (id) => set({ selectedBookId: id }),
  }))
);
