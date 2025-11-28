package http

import (
	"github.com/go-chi/chi/v5"
	"github.com/livingdolls/go-books/internal/infrastructure/adapter/http/handler"
)

func NewRouter(book handler.BookHandler) *chi.Mux {
	r := chi.NewRouter()
	r.Get("/books", book.GetAll)
	r.Post("/books", book.Create)
	return r
}
