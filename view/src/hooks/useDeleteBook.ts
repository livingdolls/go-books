import { BookRepository } from "@/repository/books";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Hook to delete a book and invalidate the books query on success
// to ensure the book list is updated
export const useDeleteBook = (bookId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => BookRepository.deleteBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
