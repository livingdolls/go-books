package http

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/livingdolls/go-books/internal/infrastructure/adapter/http/handler"
)

func NewRouter(book handler.BookHandler) *chi.Mux {
	r := chi.NewRouter()

	// cors setting
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"}, // for development
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	r.Get("/books", book.GetAll)
	r.Post("/books", book.Create)
	r.Put("/books/{id}", book.Update)
	r.Delete("/books/{id}", book.Delete)
	return r
}
