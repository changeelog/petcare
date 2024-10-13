package service

import (
	"petcare/internal/models"
	"petcare/internal/repository"
)

type ForumService struct {
    repo *repository.ForumRepository
}

func NewForumService(repo *repository.ForumRepository) *ForumService {
    return &ForumService{repo: repo}
}

func (s *ForumService) CreateTopic(topic *models.ForumTopic) error {
    return s.repo.Create(topic)
}

func (s *ForumService) GetTopicByID(id int) (*models.ForumTopic, error) {
    topic, err := s.repo.GetByID(id)
    if err != nil {
        return nil, err
    }
    err = s.repo.IncrementViews(id)
    if err != nil {
        return nil, err
    }
    return topic, nil
}

func (s *ForumService) GetAllTopics(page, pageSize int, sortBy string) ([]*models.ForumTopic, error) {
    offset := (page - 1) * pageSize
    return s.repo.GetAll(pageSize, offset, sortBy)
}

func (s *ForumService) UpdateTopic(topic *models.ForumTopic) error {
    return s.repo.Update(topic)
}

func (s *ForumService) DeleteTopic(id int) error {
	return s.repo.Delete(id)
}

func (s *ForumService) UpvoteTopic(id int) error {
	return s.repo.Upvote(id)
}

func (s *ForumService) DownvoteTopic(id int) error {
	return s.repo.Downvote(id)
}

func (s *ForumService) GetTopicsByCategory(category string, page, pageSize int) ([]*models.ForumTopic, error) {
	offset := (page - 1) * pageSize
	return s.repo.GetByCategory(category, pageSize, offset)
}

func (s *ForumService) MarkTopicAsSolved(id int) error {
	topic, err := s.repo.GetByID(id)
	if err != nil {
			return err
	}
	topic.IsSolved = true
	return s.repo.Update(topic)
}
