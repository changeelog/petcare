package server

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"

	_ "github.com/joho/godotenv/autoload"
	"github.com/rs/cors"

	"petcare/internal/database"
)

type Server struct {
	port int

	db database.Service
}

func NewServer() *http.Server {
	port, _ := strconv.Atoi(os.Getenv("PORT"))
	NewServer := &Server{
		port: port,

		db: database.New(),
	}

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // Разрешить запросы с фронтенда (Next.js)
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"}, // Разрешённые методы
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true, // Разрешить отправку cookies
	})

	handlerWithCORS := c.Handler(NewServer.RegisterRoutes())

	// Declare Server config
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", NewServer.port),
		Handler:      handlerWithCORS,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server
}
