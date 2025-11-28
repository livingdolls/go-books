package storage

import "github.com/livingdolls/go-books/internal/domain"

type BooksDB map[int]domain.Book

// BooksDB adalah "simulasi database" in-memory
var DB BooksDB = make(map[int]domain.Book)
