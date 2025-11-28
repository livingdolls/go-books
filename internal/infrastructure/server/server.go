package server

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/livingdolls/go-books/internal/applications/services"
	httpadapter "github.com/livingdolls/go-books/internal/infrastructure/adapter/http"
	"github.com/livingdolls/go-books/internal/infrastructure/adapter/http/handler"
	"github.com/livingdolls/go-books/internal/infrastructure/adapter/memory"
	"github.com/livingdolls/go-books/internal/infrastructure/storage"
)

type Server struct {
	db     storage.BooksDB
	router *chi.Mux
}

func NewServer() *Server {
	return &Server{
		db: make(storage.BooksDB),
	}
}

func (s *Server) Start(address string) error {
	log.Println("server is running")

	booksRepo := memory.NewInMemoryBookRepository(s.db)
	booksService := services.NewBookService(booksRepo)
	bookHandler := handler.NewBookHandler(booksService)

	s.router = httpadapter.NewRouter(*bookHandler)
	return http.ListenAndServe(address, s.router)
}
