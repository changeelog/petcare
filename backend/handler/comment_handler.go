package handler

import (
	"net/http"
	"petcare/internal/models"
	"petcare/internal/service"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CommentHandler struct {
    service *service.CommentService
}

func NewCommentHandler(service *service.CommentService) *CommentHandler {
    return &CommentHandler{service: service}
}

func (h *CommentHandler) CreateComment(c *gin.Context) {
    var comment models.Comment
    if err := c.ShouldBindJSON(&comment); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // TODO: Get author ID from authenticated user
    comment.AuthorID = 1 // Placeholder

    if err := h.service.CreateComment(&comment); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, comment)
}

func (h *CommentHandler) GetComment(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid comment ID"})
        return
    }

    comment, err := h.service.GetCommentByID(id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, comment)
}

func (h *CommentHandler) GetCommentsForTopic(c *gin.Context) {
    topicID, err := strconv.Atoi(c.Param("topicID"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid topic ID"})
        return
    }

    comments, err := h.service.GetCommentsForTopic(topicID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, comments)
}

func (h *CommentHandler) GetCommentsForTip(c *gin.Context) {
	tipID, err := strconv.Atoi(c.Param("tipID"))
	if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid tip ID"})
			return
	}

	comments, err := h.service.GetCommentsForTip(tipID)
	if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
	}

	c.JSON(http.StatusOK, comments)
}

func (h *CommentHandler) UpdateComment(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid comment ID"})
			return
	}

	var comment models.Comment
	if err := c.ShouldBindJSON(&comment); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
	}

	comment.ID = id

	// TODO: Check if the authenticated user is the author of the comment

	if err := h.service.UpdateComment(&comment); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
	}

	c.JSON(http.StatusOK, comment)
}

func (h *CommentHandler) DeleteComment(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid comment ID"})
			return
	}

	// TODO: Check if the authenticated user is the author of the comment or an admin

	if err := h.service.DeleteComment(id); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
	}

	c.Status(http.StatusNoContent)
}
