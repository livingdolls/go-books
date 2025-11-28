package main

import (
	"fmt"

	"github.com/livingdolls/go-books/internal/infrastructure/server"
)

func main() {
	fmt.Println("Hello, World!")
	svr := server.NewServer()

	go func() {
		if err := svr.Start(":8182"); err != nil {
			fmt.Println("Error starting server:", err)
		}
	}()

	select {}
}
