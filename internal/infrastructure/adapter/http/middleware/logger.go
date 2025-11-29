package middleware

import (
	"log"
	"net/http"
	"time"
)

type responseWriter struct {
	http.ResponseWriter
	statusCode int
}

func (rw *responseWriter) WriteHeader(statusCode int) {
	rw.statusCode = statusCode
	rw.ResponseWriter.WriteHeader(statusCode)
}

// Logger is a middleware that logs HTTP requests
// with method, URI, status code, client IP, and latency.
func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		// wrap
		rw := &responseWriter{ResponseWriter: w, statusCode: http.StatusOK}

		next.ServeHTTP(rw, r)

		latency := time.Since(start)

		// get real client IP
		clientIP := r.RemoteAddr

		if real := r.Header.Get("X-Real-IP"); real != "" {
			clientIP = real
		} else if fwd := r.Header.Get("X-Forwarded-For"); fwd != "" {
			clientIP = fwd
		}

		log.Printf(
			"%s %s %s | %d %v",
			clientIP,
			r.Method,
			r.RequestURI,
			rw.statusCode,
			latency,
		)
	})
}
