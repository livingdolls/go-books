import type { TApiResponse } from "@/types/api";
import type { Book } from "@/types/book";
import BookCard from "../moleculs/book-card";
import React from "react";
import { DeleteDialog } from "../moleculs/delete-dialog";
import { FormUpdate } from "../moleculs/form-update";
import { useBookFormStore } from "@/store/bookFormStore";
import { useBookFilterStore } from "@/store/bookFilterStore";

type ContentProps = {
  loading: boolean;
  error: boolean;
  data: TApiResponse<Book[]> | undefined;
  handleDelete: () => void;
  handleUpdateSubmit: () => void;
};
export const Content = ({
  loading,
  error,
  data,
  handleDelete,
  handleUpdateSubmit,
}: ContentProps) => {
  const { updateDialogOpen, setUpdateDialogOpen, formUpdate, setFormUpdate } =
    useBookFormStore();
  const { setSelectedBookId } = useBookFilterStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDeleteAction = (bookId: number) => {
    setSelectedBookId(bookId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    handleDelete();
    setDeleteDialogOpen(false);
  };

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormUpdate({
      ...formUpdate,
      [name]: name === "published_year" ? Number(value) : value,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error occurred</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
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
        handleChangeForm={handleChangeForm}
        onConfirm={handleUpdateSubmit}
        formUpdate={formUpdate}
      />
    </div>
  );
};
