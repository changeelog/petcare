package server

import (
    "net/http"

    "github.com/gin-gonic/gin"
    
    "petcare/handler"
    "petcare/internal/middleware"
)

func (s *Server) RegisterRoutes() http.Handler {
    r := gin.Default()

    // Apply rate limiter middleware to all routes
    r.Use(middleware.RateLimiterMiddleware(10)) // 10 requests per second

    r.GET("/", s.HelloWorldHandler)
    r.GET("/health", s.healthHandler)

    // Auth routes
    authHandler := handler.NewAuthHandler(s.userService, s.config.JWTSecret)
    r.POST("/api/auth/register", authHandler.Register)
    r.POST("/api/auth/login", authHandler.Login)

    // User routes
    userHandler := handler.NewUserHandler(s.userService)
    userRoutes := r.Group("/api/users")
    userRoutes.Use(middleware.AuthMiddleware(s.config.JWTSecret))
    {
        userRoutes.POST("/", userHandler.CreateUser)
        userRoutes.GET("/:id", userHandler.GetUser)
        userRoutes.PUT("/:id", userHandler.UpdateUser)
        userRoutes.DELETE("/:id", userHandler.DeleteUser)
    }

    // Pet routes
    petHandler := handler.NewPetHandler(s.petService)
    petRoutes := r.Group("/api/pets")
    petRoutes.Use(middleware.AuthMiddleware(s.config.JWTSecret))
    {
        petRoutes.POST("/", petHandler.CreatePet)
        petRoutes.GET("/:id", petHandler.GetPet)
        petRoutes.GET("/user/:userId", petHandler.GetUserPets)
        petRoutes.PUT("/:id", petHandler.UpdatePet)
        petRoutes.DELETE("/:id", petHandler.DeletePet)
    }

    // Vet routes
    vetHandler := handler.NewVetHandler(s.vetService)
    vetRoutes := r.Group("/api/vets")
    {
        vetRoutes.POST("/", vetHandler.CreateVet)
        vetRoutes.GET("/:id", vetHandler.GetVet)
        vetRoutes.GET("/", vetHandler.GetAllVets)
        vetRoutes.PUT("/:id", vetHandler.UpdateVet)
        vetRoutes.DELETE("/:id", vetHandler.DeleteVet)
    }

    // Service routes
    serviceHandler := handler.NewServiceHandler(s.serviceService)
    serviceRoutes := r.Group("/api/services")
    {
        serviceRoutes.POST("/", serviceHandler.CreateService)
        serviceRoutes.GET("/:id", serviceHandler.GetService)
        serviceRoutes.GET("/", serviceHandler.GetAllServices)
        serviceRoutes.PUT("/:id", serviceHandler.UpdateService)
        serviceRoutes.DELETE("/:id", serviceHandler.DeleteService)
    }

    // Forum routes
    forumHandler := handler.NewForumHandler(s.forumService)
    forumRoutes := r.Group("/api/forum")
    forumRoutes.Use(middleware.AuthMiddleware(s.config.JWTSecret))
    {
        forumRoutes.POST("/topics", forumHandler.CreateTopic)
        forumRoutes.GET("/topics/:id", forumHandler.GetTopic)
        forumRoutes.GET("/topics", forumHandler.GetAllTopics)
        forumRoutes.PUT("/topics/:id", forumHandler.UpdateTopic)
        forumRoutes.DELETE("/topics/:id", forumHandler.DeleteTopic)
        forumRoutes.POST("/topics/:id/upvote", forumHandler.UpvoteTopic)
        forumRoutes.POST("/topics/:id/downvote", forumHandler.DownvoteTopic)
        forumRoutes.GET("/topics/category/:category", forumHandler.GetTopicsByCategory)
				forumRoutes.POST("/topics/:id/solve", forumHandler.MarkTopicAsSolved)
			}

			// Tip routes
			tipHandler := handler.NewTipHandler(s.tipService)
			tipRoutes := r.Group("/api/tips")
			tipRoutes.Use(middleware.AuthMiddleware(s.config.JWTSecret))
			{
					tipRoutes.POST("/", tipHandler.CreateTip)
					tipRoutes.GET("/:id", tipHandler.GetTip)
					tipRoutes.GET("/", tipHandler.GetAllTips)
					tipRoutes.PUT("/:id", tipHandler.UpdateTip)
					tipRoutes.DELETE("/:id", tipHandler.DeleteTip)
					tipRoutes.POST("/:id/upvote", tipHandler.UpvoteTip)
					tipRoutes.POST("/:id/downvote", tipHandler.DownvoteTip)
			}

			// Comment routes
			commentHandler := handler.NewCommentHandler(s.commentService)
			commentRoutes := r.Group("/api/comments")
			commentRoutes.Use(middleware.AuthMiddleware(s.config.JWTSecret))
			{
					commentRoutes.POST("/", commentHandler.CreateComment)
					commentRoutes.GET("/:id", commentHandler.GetComment)
					commentRoutes.PUT("/:id", commentHandler.UpdateComment)
					commentRoutes.DELETE("/:id", commentHandler.DeleteComment)
					commentRoutes.GET("/topic/:topicID", commentHandler.GetCommentsForTopic)
					commentRoutes.GET("/tip/:tipID", commentHandler.GetCommentsForTip)
			}

			return r
	}

func (s *Server) HelloWorldHandler(c *gin.Context) {
	resp := make(map[string]string)
	resp["message"] = "Hello World"

	c.JSON(http.StatusOK, resp)
}

func (s *Server) healthHandler(c *gin.Context) {
	c.JSON(http.StatusOK, s.db.Health())
}
