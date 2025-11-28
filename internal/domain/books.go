package domain

type Book struct {
	Id            int
	Title         string
	Author        string
	PublishedYear int
}

type UpdateBook struct {
	Title         *string
	Author        *string
	PublishedYear *int
}
