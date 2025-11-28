import type { TApiResponse } from "@/types/api";
import type { Book } from "@/types/book";
import BookCard from "../moleculs/book-card";
import React from "react";
import { DeleteDialog } from "../moleculs/delete-dialog";
import { FormUpdate } from "../moleculs/form-update";

type ContentProps = {
  loading: boolean;
  error: boolean;
  data: TApiResponse<Book[]> | undefined;
  setSelectedBookId: React.Dispatch<React.SetStateAction<number>>;
  handleDelete: () => void;
  updateDialogOpen: boolean;
  setUpdateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  formUpdate: Book;
  setFormUpdate: React.Dispatch<React.SetStateAction<Book>>;
  handleUpdateSubmit: () => void;
};
export const Content = ({
  loading,
  error,
  data,
  setSelectedBookId,
  handleDelete,
  updateDialogOpen,
  setUpdateDialogOpen,
  formUpdate,
  setFormUpdate,
  handleUpdateSubmit,
}: ContentProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDeleteAction = (bookId: number) => {
    setSelectedBookId(bookId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    handleDelete();
    setDeleteDialogOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error occurred</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {data?.data.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          handleDelete={() => handleDeleteAction(book.id)}
          setUpdateDialogOpen={setUpdateDialogOpen}
          setFormUpdate={setFormUpdate}
        />
      ))}

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />

      <FormUpdate
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
        handleChangeForm={(e) =>
          setFormUpdate((prev) => ({
            ...prev,
            [e.target.name]:
              e.target.name === "published_year"
                ? Number(e.target.value)
                : e.target.value,
          }))
        }
        onConfirm={handleUpdateSubmit}
        formUpdate={formUpdate}
      />
    </div>
  );
};
