import type { Book } from "@/types/book";
import { Pencil, Trash } from "lucide-react";
import React from "react";

type BookCardProps = {
  book: Book;
  handleDelete: () => void;
  setUpdateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFormUpdate: React.Dispatch<React.SetStateAction<Book>>;
};

const BookCard: React.FC<BookCardProps> = ({
  book,
  handleDelete,
  setUpdateDialogOpen,
  setFormUpdate,
}) => {
  return (
    <div className="rounded-lg bg-white p-4 flex gap-4 flex-col hover:shadow-lg transition-shadow duration-300">
      <img
        src={
          "https://picsum.photos/600/600?random=" +
          encodeURIComponent(book.title)
        }
        alt={book.title}
        className="w-full h-full object-cover rounded-md border"
      />
      <div className="flex-1">
        <h2 className="text-lg font-bold mb-1">{book.title}</h2>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        <p className="text-sm text-gray-500">
          Published Year : {book.published_year}
        </p>
      </div>

      <div className="flex flex-row gap-3">
        <button
          className="w-full flex items-center justify-center gap-2 tpy-2 rounded bg-white border border-black text-black capitalize cursor-pointer"
          onClick={() => {
            setFormUpdate({
              id: book.id,
              title: book.title,
              author: book.author,
              published_year: book.published_year,
            });
            setUpdateDialogOpen(true);
          }}
        >
          UPDATE
          <Pencil size={18} />
        </button>
        <button
          className="py-2 px-4 rounded text-white cursor-pointer bg-black"
          onClick={handleDelete}
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

export default BookCard;
