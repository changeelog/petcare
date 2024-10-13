package service

import (
	"petcare/internal/models"
	"petcare/internal/repository"
)

type VetService struct {
    repo *repository.VetRepository
}

func NewVetService(repo *repository.VetRepository) *VetService {
    return &VetService{repo: repo}
}

func (s *VetService) CreateVet(vet *models.Vet) error {
	return s.repo.Create(vet)
}

func (s *VetService) GetVetByID(id int) (*models.Vet, error) {
	return s.repo.GetByID(id)
}

func (s *VetService) GetAllVets() ([]*models.Vet, error) {
	return s.repo.GetAll()
}

func (s *VetService) UpdateVet(vet *models.Vet) error {
	return s.repo.Update(vet)
}

func (s *VetService) DeleteVet(id int) error {
	return s.repo.Delete(id)
}
