import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { GetAllBookReqeuest } from "@/types/book";

interface BookFilterState {
  filter: GetAllBookReqeuest;
  setFilter: (filter: GetAllBookReqeuest) => void;
  selectedBookId: number;
  setSelectedBookId: (id: number) => void;
}

export const useBookFilterStore = create<BookFilterState>()(
  devtools((set) => ({
    filter: { title: "", sortBy: "newest", order: "desc" },
    setFilter: (filter) => set({ filter }),
    selectedBookId: 0,
    setSelectedBookId: (id) => set({ selectedBookId: id }),
  }))
);
