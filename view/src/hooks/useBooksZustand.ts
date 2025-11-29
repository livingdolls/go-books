import { useAddBook } from "./useAddBook";
import { useGetBook } from "./useGetBook";
import { useDeleteBook } from "./useDeleteBook";
import { useUpdateBook } from "./useUpdateBook";
import { useBookFilterStore } from "@/store/bookFilterStore";
import { useBookFormStore } from "@/store/bookFormStore";
import { useNetworkStore } from "@/store/networkStore";
import { useEffect } from "react";
import { toast } from "sonner";

export const useBooksZustand = () => {
  const { bookRequest, setBookRequest, formUpdate, setUpdateDialogOpen, setDialogRequestOpen} = useBookFormStore();
  const { filter, selectedBookId } = useBookFilterStore();
  const {setLoading} = useNetworkStore();

  const mutate = useAddBook(bookRequest);
  const deleteMutation = useDeleteBook(selectedBookId);
  const updateMutation = useUpdateBook(formUpdate.id, {
    title: formUpdate.title,
    author: formUpdate.author,
    published_year: formUpdate.published_year,
  });
  const { data, isLoading, isError } = useGetBook(filter);

  useEffect(() => {
    setLoading(mutate.isPending)
  }, [mutate.isPending])

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

  const resetForm = () => {
    setBookRequest({
      title: "",
      author: "",
      published_year: 2012,
    })
  }

  //on submit form create book
  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fill in all fields correctly.");
      return;
    }
    mutate.mutate(undefined, {
      onSuccess: () => {
        toast.success("successsfully add book")
        setDialogRequestOpen(false)
        resetForm()
      }, 
      onError: () => {
        toast.error("failed to create book")
      }
    });
  };

  // on update form update book
  const handleUpdateSubmit = () => {
    if (!validateUpdateForm()) {
      toast.error("Please fill in all fields correctly.");
      return;
    }
    if (formUpdate.id === 0) {
      toast.error("Invalid book ID for update.");
      return;
    }
    updateMutation.mutate(undefined, {
      onSuccess: () => {
        setUpdateDialogOpen(false)
        toast.success("successfully update book")        
      },
      onError: () => {
        toast.error("failed to update book")
      }
    });
  };

  // on delete book
  const handleDelete = () => {
    if (selectedBookId === 0) {
      toast.error("No book selected for deletion.");
      return;
    }
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Book is deleted")
      },
      onError: () => {
        toast.error("failed to delete book")
      }
    });
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
