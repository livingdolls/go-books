import { BookRepository } from "@/repository/books";
import type { GetAllBookReqeuest } from "@/types/book";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

// Hook to get books with given arguments
// and keep previous data while loading new data
export const useGetBook = (arg: GetAllBookReqeuest) => {
  return useQuery({
    queryKey: ["books", arg],
    queryFn: () => BookRepository.getBooks(arg),
    placeholderData: keepPreviousData,
  });
};
