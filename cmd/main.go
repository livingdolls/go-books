package main

import (
	"github.com/livingdolls/go-books/internal/applications/services"
	"github.com/livingdolls/go-books/internal/infrastructure/adapter/http"
	"github.com/livingdolls/go-books/internal/infrastructure/adapter/http/handler"
	"github.com/livingdolls/go-books/internal/infrastructure/adapter/memory"
	"github.com/livingdolls/go-books/internal/infrastructure/server"
	"github.com/livingdolls/go-books/internal/infrastructure/storage"
)

func main() {
	//dummy DB
	db := storage.BooksDB{}

	// dependencies wiring
	booksRepo := memory.NewInMemoryBookRepository(db)
	bookService := services.NewBookService(booksRepo)
	booksHandler := handler.NewBookHandler(bookService)

	// Initialize HTTP router
	r := http.NewRouter(*booksHandler)

	// Start the server
	svr := server.NewAppServer(":8182", r, db)

	if err := svr.Start(); err != nil {
		panic(err)
	}
}
