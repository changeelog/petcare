package service

import (
	"petcare/internal/models"
	"petcare/internal/repository"
)

type ServiceService struct {
    repo *repository.ServiceRepository
}

func NewServiceService(repo *repository.ServiceRepository) *ServiceService {
    return &ServiceService{repo: repo}
}

func (s *ServiceService) CreateService(service *models.Service) error {
    return s.repo.Create(service)
}

func (s *ServiceService) GetServiceByID(id int) (*models.Service, error) {
    return s.repo.GetByID(id)
}

func (s *ServiceService) GetAllServices() ([]*models.Service, error) {
    return s.repo.GetAll()
}

func (s *ServiceService) UpdateService(service *models.Service) error {
    return s.repo.Update(service)
}

func (s *ServiceService) DeleteService(id int) error {
    return s.repo.Delete(id)
}
