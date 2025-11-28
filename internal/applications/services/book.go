package services

import (
	"github.com/livingdolls/go-books/internal/applications/dto"
	"github.com/livingdolls/go-books/internal/domain"
	"github.com/livingdolls/go-books/internal/infrastructure/adapter/memory"
)

type BookService interface {
	CreateBook(title string, author string, publishedYear int) error
	DeleteBook(id int) error
	UpdateBook(id int, title *string, author *string, publishedYear *int) error
	GetBooks(name *string, sort *string, order *string) ([]dto.BookDTO, error)
}

type bookService struct {
	book memory.BookRepository
}

func NewBookService(bookRepo memory.BookRepository) BookService {
	return &bookService{
		book: bookRepo,
	}
}

// CreateBook implements BookService.
func (b *bookService) CreateBook(title string, author string, publishedYear int) error {
	book := domain.Book{
		Title:         title,
		Author:        author,
		PublishedYear: publishedYear,
	}

	err := b.book.Create(book)

	return err
}

// DeleteBook implements BookService.
func (b *bookService) DeleteBook(id int) error {
	err := b.book.Delete(id)

	return err
}

// GetBooks implements BookService.
func (b *bookService) GetBooks(name *string, sort *string, order *string) ([]dto.BookDTO, error) {
	books, err := b.book.GetAll(name, sort, order)
	if err != nil {
		return nil, err
	}

	bookDTOs := make([]dto.BookDTO, 0, len(books))
	for _, book := range books {
		bookDTO := dto.BookDTO{
			Id:            book.Id,
			Title:         book.Title,
			Author:        book.Author,
			PublishedYear: book.PublishedYear,
		}
		bookDTOs = append(bookDTOs, bookDTO)
	}

	return bookDTOs, nil
}

// UpdateBook implements BookService.
func (b *bookService) UpdateBook(id int, title *string, author *string, publishedYear *int) error {
	updateBook := domain.UpdateBook{
		Title:         title,
		Author:        author,
		PublishedYear: publishedYear,
	}

	err := b.book.Update(id, updateBook)

	return err
}
