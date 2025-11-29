package memory

import (
	"errors"
	sortSlice "sort"
	"strings"
	"unicode/utf8"

	"github.com/livingdolls/go-books/internal/domain"
	"github.com/livingdolls/go-books/internal/infrastructure/storage"
)

type BookRepository interface {
	GetAll(name *string, sort *string, order *string) ([]domain.Book, error)
	Create(book domain.Book) error
	Delete(id int) error
	Update(id int, book domain.UpdateBook) error
}

type bookRepository struct {
	storage storage.BooksDB
}

func NewInMemoryBookRepository(db storage.BooksDB) BookRepository {
	return &bookRepository{
		storage: db,
	}
}

// Create implements BookRepository.
func (i *bookRepository) Create(book domain.Book) error {
	// assign ID
	lastID := getLastID(i.storage)
	book.Id = lastID + 1

	i.storage[book.Id] = book
	return nil
}

// Delete implements BookRepository.
func (i *bookRepository) Delete(id int) error {
	// check if book exists
	if _, ok := i.storage[id]; !ok {
		return errors.New("book not exists")
	}

	delete(i.storage, id)
	return nil
}

// GetAll implements BookRepository.
func (i *bookRepository) GetAll(name *string, sort *string, order *string) ([]domain.Book, error) {
	books := make([]domain.Book, 0, len(i.storage))
	// loop semua buku
	for _, book := range i.storage {
		// filter by name kalo ada
		if name != nil {
			if !strings.Contains(strings.ToLower(book.Title), strings.ToLower(*name)) {

				continue
			}
		}
		books = append(books, book)
	}

	// jika sorting ada dan sorting by published_year
	if sort != nil && *sort == "published_year" {
		// Simple sort
		for j := 0; j < len(books)-1; j++ {
			for k := 0; k < len(books)-j-1; k++ {
				shouldSwap := false
				if order != nil && *order == "desc" {
					if books[k].PublishedYear < books[k+1].PublishedYear {
						shouldSwap = true
					}
				} else {
					if books[k].PublishedYear > books[k+1].PublishedYear {
						shouldSwap = true
					}
				}
				if shouldSwap {
					books[k], books[k+1] = books[k+1], books[k]
				}
			}
		}
	}

	// jika sorting ada dan sorting by title
	if sort != nil && *sort == "title" {
		sortSlice.Slice(books, func(i, j int) bool {
			ti := strings.TrimSpace(books[i].Title)
			tj := strings.TrimSpace(books[j].Title)

			// get first huruf
			ri, _ := utf8.DecodeRuneInString(ti)
			rj, _ := utf8.DecodeRuneInString(tj)

			// to lowerkase
			sri := strings.ToLower(string(ri))
			srj := strings.ToLower(string(rj))

			// jika first huruf sama, seluruh title
			if sri == srj {
				if order != nil && *order == "desc" {
					return strings.ToLower(ti) > strings.ToLower(tj)
				}

				return strings.ToLower(ti) < strings.ToLower(tj)
			}

			if order != nil && *order == "desc" {
				return sri > srj
			}

			return sri < srj
		})
	}

	// default sorting
	if sort == nil || *sort == "newest" {
		// Simple sort
		for j := 0; j < len(books)-1; j++ {
			for k := 0; k < len(books)-j-1; k++ {
				shouldSwap := false
				if order != nil && *order == "desc" {
					if books[k].Id < books[k+1].Id {
						shouldSwap = true
					}
				} else {
					if books[k].Id > books[k+1].Id {
						shouldSwap = true
					}
				}
				if shouldSwap {
					books[k], books[k+1] = books[k+1], books[k]
				}
			}
		}
	}

	return books, nil
}

// Update implements BookRepository.
func (i *bookRepository) Update(id int, book domain.UpdateBook) error {
	if existingBook, ok := i.storage[id]; ok {
		if book.Title != nil {
			existingBook.Title = *book.Title
		}
		if book.Author != nil {
			existingBook.Author = *book.Author
		}
		if book.PublishedYear != nil {
			existingBook.PublishedYear = *book.PublishedYear
		}
		i.storage[id] = existingBook
	}
	return nil
}

func getLastID(db storage.BooksDB) int {
	maxID := 0
	for id := range db {
		if id > maxID {
			maxID = id
		}
	}
	return maxID
}
