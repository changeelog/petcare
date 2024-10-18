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
	"petcare/internal/config"
	"petcare/internal/service"
	"petcare/internal/repository"
)

type Server struct {
	port int

	db database.Service

	config         *config.Config
	userService    *service.UserService
	petService     *service.PetService
	vetService     *service.VetService
	serviceService *service.ServiceService
	forumService   *service.ForumService
	tipService     *service.TipService
	commentService *service.CommentService
}

func NewServer() *http.Server {
	port, _ := strconv.Atoi(os.Getenv("PORT"))
	
	db := database.New()
	cfg := config.New()

	userRepo := repository.NewUserRepository(db.GetDB())
	petRepo := repository.NewPetRepository(db.GetDB())
	vetRepo := repository.NewVetRepository(db.GetDB())
	serviceRepo := repository.NewServiceRepository(db.GetDB())
	forumRepo := repository.NewForumRepository(db.GetDB())
	tipRepo := repository.NewTipRepository(db.GetDB())
	commentRepo := repository.NewCommentRepository(db.GetDB())

	newServer := &Server{
		port:   port,
		db:     db,
		config: cfg,

		userService:    service.NewUserService(userRepo),
		petService:     service.NewPetService(petRepo),
		vetService:     service.NewVetService(vetRepo),
		serviceService: service.NewServiceService(serviceRepo),
		forumService:   service.NewForumService(forumRepo),
		tipService:     service.NewTipService(tipRepo),
		commentService: service.NewCommentService(commentRepo),
}

	c := cors.New(cors.Options{
			AllowedOrigins:   []string{"http://localhost:3000"},
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
			AllowedHeaders:   []string{"Content-Type", "Authorization"},
			AllowCredentials: true,
	})

	handlerWithCORS := c.Handler(newServer.RegisterRoutes())

	server := &http.Server{
			Addr:         fmt.Sprintf(":%d", newServer.port),
			Handler:      handlerWithCORS,
			IdleTimeout:  time.Minute,
			ReadTimeout:  10 * time.Second,
			WriteTimeout: 30 * time.Second,
	}

	return server
}
