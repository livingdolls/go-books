import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookRepository } from "../repository/books";
import type { Book } from "../types/book";

// Hook to add a new book and invalidate the books query on success
// to ensure the book list is updated
export const useAddBook = (book: Omit<Book, "id">) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => BookRepository.addBook(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
