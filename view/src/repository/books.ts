import { api } from "../lib/axios";
import type { TApiResponse } from "../types/api";
import type { Book, GetAllBookReqeuest } from "../types/book";

export const BookRepository = {
  getBooks: async (arg: GetAllBookReqeuest): Promise<TApiResponse<Book[]>> => {
    const url = new URLSearchParams();
    if (arg.title) {
      url.append("title", arg.title);
    }
    if (arg.sortBy) {
      url.append("sort", arg.sortBy);
    }
    if (arg.order) {
      url.append("order", arg.order);
    }
    const response = await api.get(`/books?${url.toString()}`);
    return response.data;
  },
  addBook: async (book: Omit<Book, "id">): Promise<TApiResponse<Book>> => {
    const response = await api.post("/books", book);
    return response.data;
  },
  deleteBook: async (id: number): Promise<TApiResponse<null>> => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },
  updateBook: async (
    id: number,
    book: Omit<Book, "id">
  ): Promise<TApiResponse<Book>> => {
    const response = await api.put(`/books/${id}`, book);
    return response.data;
  },
};
