import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookRepository } from "../repository/books";
import type { Book } from "../types/book";

export const useAddBook = (book: Omit<Book, "id">) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => BookRepository.addBook(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
