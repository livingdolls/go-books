import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Book } from "@/types/book";

interface BookFormState {
  dialogRequest: boolean;
  setDialogRequestOpen: (open: boolean) => void;
  bookRequest: Omit<Book, "id">;
  setBookRequest: (book: Omit<Book, "id">) => void;
  formUpdate: Book;
  setFormUpdate: (book: Book) => void;
  updateDialogOpen: boolean;
  setUpdateDialogOpen: (open: boolean) => void;
}

// Zustand store to manage book form state
// including book request data, form update data, and dialog visibility
export const useBookFormStore = create<BookFormState>()(
  devtools((set) => ({
    dialogRequest: false,
    setDialogRequestOpen: (open) => set({ dialogRequest: open }),
    bookRequest: { title: "", author: "", published_year: 2012 },
    setBookRequest: (book) => set({ bookRequest: book }),
    formUpdate: { id: 0, title: "", author: "", published_year: 2012 },
    setFormUpdate: (book) => set({ formUpdate: book }),
    updateDialogOpen: false,
    setUpdateDialogOpen: (open) => set({ updateDialogOpen: open }),
  }))
);
