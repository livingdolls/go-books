import { BookRepository } from "@/repository/books";
import type { Book } from "@/types/book";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Hook to update a book and invalidate the books query on success
// to ensure the book list is updated
export const useUpdateBook = (id: number, book: Omit<Book, "id">) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => BookRepository.updateBook(id, book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
