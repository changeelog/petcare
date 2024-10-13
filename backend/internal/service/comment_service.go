package service

import (
	"petcare/internal/models"
	"petcare/internal/repository"
)

type CommentService struct {
    repo *repository.CommentRepository
}

func NewCommentService(repo *repository.CommentRepository) *CommentService {
    return &CommentService{repo: repo}
}

func (s *CommentService) CreateComment(comment *models.Comment) error {
    return s.repo.Create(comment)
}

func (s *CommentService) GetCommentByID(id int) (*models.Comment, error) {
    return s.repo.GetByID(id)
}

func (s *CommentService) GetCommentsForTopic(topicID int) ([]*models.Comment, error) {
    return s.repo.GetForTopic(topicID)
}

func (s *CommentService) GetCommentsForTip(tipID int) ([]*models.Comment, error) {
    return s.repo.GetForTip(tipID)
}

func (s *CommentService) UpdateComment(comment *models.Comment) error {
    return s.repo.Update(comment)
}

func (s *CommentService) DeleteComment(id int) error {
    return s.repo.Delete(id)
}
