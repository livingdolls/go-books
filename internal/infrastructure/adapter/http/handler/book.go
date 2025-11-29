package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/livingdolls/go-books/internal/applications/dto"
	"github.com/livingdolls/go-books/internal/applications/services"
)

type BookHandler struct {
	bookService services.BookService
}

func NewBookHandler(bookService services.BookService) *BookHandler {
	return &BookHandler{
		bookService: bookService,
	}
}

// GetAll handles the retrieval of all books with optional filtering and sorting.
// Query Parameters:
// - title: filter books by title (optional)
// - sort: field to sort by, e.g., "title" or "published_year" (optional)
// - order: sort order, either "asc" or "desc" (optional)
func (h *BookHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	// ambil query param
	name := r.URL.Query().Get("title")
	sort := r.URL.Query().Get("sort")
	order := r.URL.Query().Get("order")

	var namePtr, sortPtr, orderPtr *string

	if name != "" {
		namePtr = &name
	}
	if sort != "" {
		sortPtr = &sort
	}
	if order != "" {
		orderPtr = &order
	}

	// panggil service untuk get all books
	books, err := h.bookService.GetBooks(namePtr, sortPtr, orderPtr)
	if err != nil {
		http.Error(w, "failed to get books", http.StatusInternalServerError)
		return
	}

	// response
	res := dto.NewAPIResponse(true, "books retrieved successfully", books)
	dto.WriteJSONResponse(w, http.StatusOK, res)
}

// Create handles the creation of a new book.
// It expects a JSON body with the book details.
// Example JSON body:
//
//	{
//	    "title": "Book Title",
//	    "author": "Author Name",
//	    "published_year": 2023
//	}
func (h *BookHandler) Create(w http.ResponseWriter, r *http.Request) {
	// validasi input
	var req dto.CreateBookDTO

	// validasi request json
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		res := dto.NewAPIResponse(false, "invalid request body", nil)
		dto.WriteJSONResponse(w, http.StatusBadRequest, res)
		return
	}

	defer r.Body.Close()

	// validasi isi request
	if err := req.Validate(); err != nil {
		res := dto.NewAPIResponse(false, err.Error(), nil)
		dto.WriteJSONResponse(w, http.StatusBadRequest, res)
		return
	}

	// panggil service untuk create book
	if err := h.bookService.CreateBook(req.Title, req.Author, req.PublishedYear); err != nil {
		res := dto.NewAPIResponse(false, "failed to create book", nil)
		dto.WriteJSONResponse(w, http.StatusInternalServerError, res)
		return
	}

	//response
	res := dto.NewAPIResponse(true, "book created successfully", nil)

	dto.WriteJSONResponse(w, http.StatusCreated, res)
}

// Update handles the update of an existing book.
// It expects a JSON body with the updated book details.
// Example JSON body:
//
//	{
//	    "title": "Updated Book Title",
//	    "author": "Updated Author Name",
//	    "published_year": 2024
//	}
func (h *BookHandler) Update(w http.ResponseWriter, r *http.Request) {
	// ambil id dari URL param
	idsStr := chi.URLParam(r, "id")
	// konversi id ke int
	id, err := strconv.Atoi(idsStr)
	if err != nil {
		res := dto.NewAPIResponse(false, "invalid book id", nil)
		dto.WriteJSONResponse(w, http.StatusBadRequest, res)
		return
	}

	// validasi input
	var req dto.UpdateBookDTO

	// validasi request json
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		res := dto.NewAPIResponse(false, "invalid request body", nil)
		dto.WriteJSONResponse(w, http.StatusBadRequest, res)
		return
	}

	defer r.Body.Close()

	// validasi isi request
	if err := req.Validate(); err != nil {
		res := dto.NewAPIResponse(false, err.Error(), nil)
		dto.WriteJSONResponse(w, http.StatusBadRequest, res)
		return
	}

	// panggil service untuk update book
	if err := h.bookService.UpdateBook(id, req.Title, req.Author, req.PublishedYear); err != nil {
		res := dto.NewAPIResponse(false, "failed to update book", nil)
		dto.WriteJSONResponse(w, http.StatusInternalServerError, res)
		return
	}

	//response
	res := dto.NewAPIResponse(true, "book updated successfully", nil)

	dto.WriteJSONResponse(w, http.StatusOK, res)
}

// Delete handles the deletion of an existing book.
// It expects the book ID as a URL parameter.
func (h *BookHandler) Delete(w http.ResponseWriter, r *http.Request) {
	// ambil id dari URL param
	idsStr := chi.URLParam(r, "id")
	// konversi id ke int
	id, err := strconv.Atoi(idsStr)
	if err != nil {
		res := dto.NewAPIResponse(false, "invalid book id", nil)
		dto.WriteJSONResponse(w, http.StatusBadRequest, res)
		return
	}

	// panggil service untuk delete book
	if err := h.bookService.DeleteBook(id); err != nil {
		res := dto.NewAPIResponse(false, "failed to delete book", nil)
		dto.WriteJSONResponse(w, http.StatusInternalServerError, res)
		return
	}

	//response
	res := dto.NewAPIResponse(true, "book deleted successfully", nil)

	dto.WriteJSONResponse(w, http.StatusOK, res)
}
