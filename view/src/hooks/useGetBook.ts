import { BookRepository } from "@/repository/books";
import type { GetAllBookReqeuest } from "@/types/book";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetBook = (arg: GetAllBookReqeuest) => {
  return useQuery({
    queryKey: ["books", arg],
    queryFn: () => BookRepository.getBooks(arg),
    placeholderData: keepPreviousData,
  });
};
