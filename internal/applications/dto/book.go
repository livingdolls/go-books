package dto

import "errors"

type BookDTO struct {
	Id            int    `json:"id"`
	Title         string `json:"title"`
	Author        string `json:"author"`
	PublishedYear int    `json:"published_year"`
}

type CreateBookDTO struct {
	Title         string `json:"title"`
	Author        string `json:"author"`
	PublishedYear int    `json:"published_year"`
}

type UpdateBookDTO struct {
	Title         *string `json:"title"`
	Author        *string `json:"author"`
	PublishedYear *int    `json:"published_year"`
}

func (dto *CreateBookDTO) Validate() error {
	if dto.Title == "" {
		return errors.New("title is required")
	}

	if dto.Author == "" {
		return errors.New("author is required")
	}

	if dto.PublishedYear <= 0 {
		return errors.New("published_year must be a valid year")
	}

	return nil
}

func (dto *UpdateBookDTO) Validate() error {
	if dto.Title == nil && dto.Author == nil && dto.PublishedYear == nil {
		return errors.New("at least one field must be provided for update")
	}

	if dto.PublishedYear != nil && *dto.PublishedYear <= 0 {
		return errors.New("published_year must be a valid year")
	}

	return nil
}
