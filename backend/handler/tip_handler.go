package handler

import (
	"net/http"
	"petcare/internal/models"
	"petcare/internal/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

type TipHandler struct {
    service *service.TipService
}

func NewTipHandler(service *service.TipService) *TipHandler {
    return &TipHandler{service: service}
}

func (h *TipHandler) CreateTip(c *gin.Context) {
    var tip models.Tip
    if err := c.ShouldBindJSON(&tip); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := h.service.CreateTip(&tip); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, tip)
}

func (h *TipHandler) GetTip(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid tip ID"})
        return
    }

    tip, err := h.service.GetTipByID(id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, tip)
}

func (h *TipHandler) GetAllTips(c *gin.Context) {
    page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
    pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "10"))

    tips, err := h.service.GetAllTips(page, pageSize)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, tips)
}

func (h *TipHandler) UpdateTip(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid tip ID"})
        return
    }

    var tip models.Tip
    if err := c.ShouldBindJSON(&tip); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    tip.ID = id
    if err := h.service.UpdateTip(&tip); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, tip)
}

func (h *TipHandler) DeleteTip(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid tip ID"})
        return
    }

    if err := h.service.DeleteTip(id); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.Status(http.StatusNoContent)
}

func (h *TipHandler) UpvoteTip(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid tip ID"})
			return
	}

	if err := h.service.UpvoteTip(id); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
	}

	c.Status(http.StatusOK)
}

func (h *TipHandler) DownvoteTip(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid tip ID"})
			return
	}

	if err := h.service.DownvoteTip(id); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
	}

	c.Status(http.StatusOK)
}
