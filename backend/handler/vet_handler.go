package handler

import (
	"net/http"
	"petcare/internal/models"
	"petcare/internal/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

type VetHandler struct {
    service *service.VetService
}

func NewVetHandler(service *service.VetService) *VetHandler {
    return &VetHandler{service: service}
}

func (h *VetHandler) CreateVet(c *gin.Context) {
    var vet models.Vet
    if err := c.ShouldBindJSON(&vet); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := h.service.CreateVet(&vet); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, vet)
}

func (h *VetHandler) GetVet(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid vet ID"})
        return
    }

    vet, err := h.service.GetVetByID(id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, vet)
}

func (h *VetHandler) GetAllVets(c *gin.Context) {
    vets, err := h.service.GetAllVets()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, vets)
}

func (h *VetHandler) UpdateVet(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid vet ID"})
        return
    }

    var vet models.Vet
    if err := c.ShouldBindJSON(&vet); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    vet.ID = id

    if err := h.service.UpdateVet(&vet); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, vet)
}

func (h *VetHandler) DeleteVet(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid vet ID"})
			return
	}

	if err := h.service.DeleteVet(id); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
	}

	c.Status(http.StatusNoContent)
}
