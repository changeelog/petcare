package service

import (
	"fmt"
	"log"

	"petcare/internal/models"
	"petcare/internal/repository"
)

type UserService struct {
    repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserService {
    return &UserService{repo: repo}
}

func (s *UserService) CreateUser(user *models.User) error {
    if err := user.HashPassword(); err != nil {
        log.Printf("Error hashing password: %v", err)
        return fmt.Errorf("failed to create user: %w", err)
    }

    if err := s.repo.Create(user); err != nil {
        log.Printf("Error creating user: %v", err)
        return fmt.Errorf("failed to create user: %w", err)
    }

    return nil
}

func (s *UserService) GetUser(id int) (*models.User, error) {
    user, err := s.repo.GetByID(id)
    if err != nil {
        log.Printf("Error getting user by ID: %v", err)
        return nil, fmt.Errorf("failed to get user: %w", err)
    }
    return user, nil
}

func (s *UserService) GetUserByEmail(email string) (*models.User, error) {
    user, err := s.repo.GetByEmail(email)
    if err != nil {
        log.Printf("Error getting user by email: %v", err)
        return nil, fmt.Errorf("failed to get user: %w", err)
    }
    return user, nil
}

func (s *UserService) UpdateUser(user *models.User) error {
    if err := s.repo.Update(user); err != nil {
        log.Printf("Error updating user: %v", err)
        return fmt.Errorf("failed to update user: %w", err)
    }
    return nil
}

func (s *UserService) DeleteUser(id int) error {
    if err := s.repo.Delete(id); err != nil {
        log.Printf("Error deleting user: %v", err)
        return fmt.Errorf("failed to delete user: %w", err)
    }
    return nil
}
