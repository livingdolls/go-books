import { useAddBook } from "./useAddBook";
import { useGetBook } from "./useGetBook";
import { useDeleteBook } from "./useDeleteBook";
import { useUpdateBook } from "./useUpdateBook";
import { useBookFilterStore } from "@/store/bookFilterStore";
import { useBookFormStore } from "@/store/bookFormStore";

export const useBooksZustand = () => {
  const { bookRequest, formUpdate, setUpdateDialogOpen } = useBookFormStore();
  const { filter, selectedBookId } = useBookFilterStore();

  const mutate = useAddBook(bookRequest);
  const deleteMutation = useDeleteBook(selectedBookId);
  const updateMutation = useUpdateBook(formUpdate.id, {
    title: formUpdate.title,
    author: formUpdate.author,
    published_year: formUpdate.published_year,
  });
  const { data, isLoading, isError } = useGetBook(filter);

  const validateForm = () => {
    return (
      bookRequest.title.trim() !== "" &&
      bookRequest.author.trim() !== "" &&
      !isNaN(bookRequest.published_year)
    );
  };

  const validateUpdateForm = () => {
    return (
      formUpdate.id !== 0 &&
      formUpdate.title.trim() !== "" &&
      formUpdate.author.trim() !== "" &&
      !isNaN(formUpdate.published_year)
    );
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      alert("Please fill in all fields correctly.");
      return;
    }
    mutate.mutate();
  };

  const handleUpdateSubmit = () => {
    if (!validateUpdateForm()) {
      alert("Please fill in all fields correctly.");
      return;
    }
    if (formUpdate.id === 0) {
      alert("Invalid book ID for update.");
      return;
    }
    updateMutation.mutate();
    if (updateMutation.isSuccess) setUpdateDialogOpen(false);
  };

  const handleDelete = () => {
    if (selectedBookId === 0) {
      alert("No book selected for deletion.");
      return;
    }
    deleteMutation.mutate();
  };

  return {
    handleSubmit,
    handleDelete,
    handleUpdateSubmit,
    isLoading,
    isError,
    data,
  };
};
