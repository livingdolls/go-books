import { api } from "../lib/axios";
import type { TApiResponse } from "../types/api";
import type { Book, GetAllBookReqeuest } from "../types/book";

export const BookRepository = {
  // Fetch books with optional filters and sorting
  // Example: Get books by title, sorted by author in ascending order
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
  // Add a new book
  // Example: Add a book with title, author, and published year
  addBook: async (book: Omit<Book, "id">): Promise<TApiResponse<Book>> => {
    const response = await api.post("/books", book);
    return response.data;
  },
  // Delete a book by its ID
  // Example: Delete a book with ID 1
  deleteBook: async (id: number): Promise<TApiResponse<null>> => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },
  // Update an existing book by its ID
  // Example: Update the book with ID 1 to change its title and author
  updateBook: async (
    id: number,
    book: Omit<Book, "id">
  ): Promise<TApiResponse<Book>> => {
    const response = await api.put(`/books/${id}`, book);
    return response.data;
  },
};
