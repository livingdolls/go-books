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

func (h *BookHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	// ambil query param
	name := r.URL.Query().Get("name")
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

	// kembalikan response json
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(res); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
		return
	}
}

func (h *BookHandler) Create(w http.ResponseWriter, r *http.Request) {
	// validasi input
	var req dto.CreateBookDTO

	// validasi request json
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	defer r.Body.Close()

	// validasi isi request
	if err := req.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// panggil service untuk create book
	if err := h.bookService.CreateBook(req.Title, req.Author, req.PublishedYear); err != nil {
		http.Error(w, "failed to create book", http.StatusInternalServerError)
		return
	}

	//response
	res := dto.NewAPIResponse(true, "book created successfully", nil)

	// kembalikan response json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(w).Encode(res); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
		return
	}

}

func (h *BookHandler) Update(w http.ResponseWriter, r *http.Request) {
	// ambil id dari URL param
	idsStr := chi.URLParam(r, "id")
	// konversi id ke int
	id, err := strconv.Atoi(idsStr)
	if err != nil {
		http.Error(w, "invalid book id", http.StatusBadRequest)
		return
	}

	// validasi input
	var req dto.UpdateBookDTO

	// validasi request json
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	defer r.Body.Close()

	// validasi isi request
	if err := req.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// panggil service untuk update book
	// misal id diambil dari URL param, disini hardcode aja 1
	if err := h.bookService.UpdateBook(id, req.Title, req.Author, req.PublishedYear); err != nil {
		http.Error(w, "failed to update book", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
