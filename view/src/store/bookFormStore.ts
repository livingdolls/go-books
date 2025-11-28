import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Book } from "@/types/book";

interface BookFormState {
  bookRequest: Omit<Book, "id">;
  setBookRequest: (book: Omit<Book, "id">) => void;
  formUpdate: Book;
  setFormUpdate: (book: Book) => void;
  updateDialogOpen: boolean;
  setUpdateDialogOpen: (open: boolean) => void;
}

export const useBookFormStore = create<BookFormState>()(
  devtools((set) => ({
    bookRequest: { title: "", author: "", published_year: 2012 },
    setBookRequest: (book) => set({ bookRequest: book }),
    formUpdate: { id: 0, title: "", author: "", published_year: 2012 },
    setFormUpdate: (book) => set({ formUpdate: book }),
    updateDialogOpen: false,
    setUpdateDialogOpen: (open) => set({ updateDialogOpen: open }),
  }))
);
