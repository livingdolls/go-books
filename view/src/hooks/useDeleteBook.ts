import { BookRepository } from "@/repository/books";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBook = (bookId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => BookRepository.deleteBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
