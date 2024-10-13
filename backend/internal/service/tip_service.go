package service

import (
    "petcare/internal/models"
    "petcare/internal/repository"
)

type TipService struct {
    repo *repository.TipRepository
}

func NewTipService(repo *repository.TipRepository) *TipService {
    return &TipService{repo: repo}
}

func (s *TipService) CreateTip(tip *models.Tip) error {
    return s.repo.Create(tip)
}

func (s *TipService) GetTipByID(id int) (*models.Tip, error) {
    return s.repo.GetByID(id)
}

func (s *TipService) GetAllTips(page, pageSize int) ([]*models.Tip, error) {
    offset := (page - 1) * pageSize
    return s.repo.GetAll(pageSize, offset)
}

func (s *TipService) UpdateTip(tip *models.Tip) error {
    return s.repo.Update(tip)
}

func (s *TipService) DeleteTip(id int) error {
    return s.repo.Delete(id)
}

func (s *TipService) UpvoteTip(id int) error {
    return s.repo.Upvote(id)
}

func (s *TipService) DownvoteTip(id int) error {
    return s.repo.Downvote(id)
}
