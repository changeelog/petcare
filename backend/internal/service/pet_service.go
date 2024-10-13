package service

import (
	"petcare/internal/models"
	"petcare/internal/repository"
)

type PetService struct {
    repo *repository.PetRepository
}

func NewPetService(repo *repository.PetRepository) *PetService {
    return &PetService{repo: repo}
}

func (s *PetService) CreatePet(pet *models.Pet) error {
    return s.repo.Create(pet)
}

func (s *PetService) GetPetByID(id int) (*models.Pet, error) {
    return s.repo.GetByID(id)
}

func (s *PetService) GetPetsByUserID(userID int) ([]*models.Pet, error) {
	return s.repo.GetByUserID(userID)
}

func (s *PetService) UpdatePet(pet *models.Pet) error {
	return s.repo.Update(pet)
}

func (s *PetService) DeletePet(id int) error {
	return s.repo.Delete(id)
}
