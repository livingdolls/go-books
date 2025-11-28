export type Book = {
  id: number;
  title: string;
  author: string;
  published_year: number;
};

export type GetAllBookReqeuest = {
  title?: string;
  sortBy?: "title" | "author" | "published_year" | "newest";
  order?: "asc" | "desc";
};
