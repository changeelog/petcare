package handler

import (
	"net/http"
	"petcare/internal/models"
	"petcare/internal/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

type PetHandler struct {
    service *service.PetService
}

func NewPetHandler(service *service.PetService) *PetHandler {
    return &PetHandler{service: service}
}

func (h *PetHandler) CreatePet(c *gin.Context) {
    var pet models.Pet
    if err := c.ShouldBindJSON(&pet); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // TODO: Get user ID from authenticated user
    pet.UserID = 1 // Placeholder

    if err := h.service.CreatePet(&pet); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, pet)
}

func (h *PetHandler) GetPet(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid pet ID"})
        return
    }

    pet, err := h.service.GetPetByID(id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, pet)
}

func (h *PetHandler) GetUserPets(c *gin.Context) {
    userID, err := strconv.Atoi(c.Param("userID"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
        return
    }

    // TODO: Check if the authenticated user is requesting their own pets or has admin rights

    pets, err := h.service.GetPetsByUserID(userID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, pets)
}

func (h *PetHandler) UpdatePet(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid pet ID"})
        return
    }

    var pet models.Pet
    if err := c.ShouldBindJSON(&pet); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    pet.ID = id

    // TODO: Check if the authenticated user owns this pet

    if err := h.service.UpdatePet(&pet); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, pet)
}

func (h *PetHandler) DeletePet(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid pet ID"})
			return
	}

	// TODO: Check if the authenticated user owns this pet or has admin rights

	if err := h.service.DeletePet(id); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
	}

	c.Status(http.StatusNoContent)
}
