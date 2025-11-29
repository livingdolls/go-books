package server

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/livingdolls/go-books/internal/infrastructure/storage"
)

type AppServer struct {
	db         storage.BooksDB
	httpServer *http.Server
}

func NewAppServer(addr string, handler http.Handler, db storage.BooksDB) *AppServer {
	return &AppServer{
		db: db,
		httpServer: &http.Server{
			Addr:    addr,
			Handler: handler,
		},
	}
}

func (s *AppServer) Start() error {
	signalChan := make(chan os.Signal, 1)

	signal.Notify(signalChan, os.Interrupt, syscall.SIGTERM)

	go func() {
		log.Println("Starting server on", s.httpServer.Addr)
		if err := s.httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Could not listen on %s: %v\n", s.httpServer.Addr, err)
		}
	}()

	<-signalChan
	log.Println("Shutting down server...")

	if err := s.httpServer.Close(); err != nil {
		return err
	}

	log.Println("Server gracefully stopped")
	return nil
}

func (s *AppServer) Stop() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := s.httpServer.Shutdown(ctx); err != nil {
		log.Fatalf("Server Shutdown Failed:%+v", err)

		if cerr := s.httpServer.Close(); cerr != nil {
			log.Fatalf("Server Close Failed:%+v", cerr)
			return cerr
		}

		log.Println("Server exited properly")
	}

	log.Println("Server shut down gracefully")
	return nil
}
