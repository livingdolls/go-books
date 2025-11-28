import React, { useState } from "react";
import { type GetAllBookReqeuest, type Book } from "../types/book";
import { useAddBook } from "./useAddBook";
import { useGetBook } from "./useGetBook";
import { useDeleteBook } from "./useDeleteBook";
import { useUpdateBook } from "./useUpdateBook";

export const useBooks = () => {
  const [bookRequest, setBookRequest] = useState<Omit<Book, "id">>({
    title: "",
    author: "",
    published_year: 2012,
  });

  const [filter, setFilter] = useState<GetAllBookReqeuest>({
    title: "",
    sortBy: "newest",
    order: "desc",
  });

  const [selectedBookId, setSelectedBookId] = useState<number>(0);
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);
  const [formUpdate, setFormUpdate] = useState<Book>({
    id: 0,
    title: "",
    author: "",
    published_year: 2012,
  });

  const mutate = useAddBook(bookRequest);
  const deleteMutation = useDeleteBook(selectedBookId);
  const updateMutation = useUpdateBook(formUpdate.id, {
    title: formUpdate.title,
    author: formUpdate.author,
    published_year: formUpdate.published_year,
  });
  const { data, isLoading, isError } = useGetBook(filter);

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookRequest((prev) => ({
      ...prev,
      [name]: name === "published_year" ? Number(value) : value,
    }));
  };

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

    updateMutation.isSuccess && setUpdateDialogOpen(false);
  };

  const handleSearchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const setOrder = () => {
    let order = filter.order;
    if (order === "desc") {
      setFilter((prev) => ({
        ...prev,
        order: "asc",
      }));
      return;
    }

    if (order === "asc") {
      setFilter((prev) => ({
        ...prev,
        order: "desc",
      }));
    }
  };

  const setSortBy = (sortBy: GetAllBookReqeuest["sortBy"]) => {
    setFilter((prev) => ({
      ...prev,
      sortBy: sortBy,
    }));
  };

  const handleDelete = () => {
    if (selectedBookId === 0) {
      alert("No book selected for deletion.");
      return;
    }

    deleteMutation.mutate();
  };

  return {
    bookRequest,
    handleChangeForm,
    handleSubmit,
    data,
    isLoading,
    isError,
    handleSearchFilter,
    filter,
    setOrder,
    setSortBy,
    setSelectedBookId,
    handleDelete,
    updateDialogOpen,
    setUpdateDialogOpen,
    formUpdate,
    setFormUpdate,
    handleUpdateSubmit,
  };
};
