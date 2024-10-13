package repository

import (
    "database/sql"
    "petcare/internal/models"
)

type ForumRepository struct {
    db *sql.DB
}

func NewForumRepository(db *sql.DB) *ForumRepository {
    return &ForumRepository{db: db}
}

func (r *ForumRepository) Create(topic *models.ForumTopic) error {
    query := `INSERT INTO forum_topics (title, content, category, tags, author_id) VALUES (?, ?, ?, ?, ?)`
    result, err := r.db.Exec(query, topic.Title, topic.Content, topic.Category, topic.Tags, topic.AuthorID)
    if err != nil {
        return err
    }
    id, err := result.LastInsertId()
    if err != nil {
        return err
    }
    topic.ID = int(id)
    return nil
}

func (r *ForumRepository) GetByID(id int) (*models.ForumTopic, error) {
    query := `SELECT id, title, content, category, tags, author_id, views, upvotes, downvotes, is_solved, created_at, updated_at FROM forum_topics WHERE id = ?`
    var topic models.ForumTopic
    err := r.db.QueryRow(query, id).Scan(
        &topic.ID, &topic.Title, &topic.Content, &topic.Category, &topic.Tags, &topic.AuthorID,
        &topic.Views, &topic.Upvotes, &topic.Downvotes, &topic.IsSolved, &topic.CreatedAt, &topic.UpdatedAt,
    )
    if err != nil {
        return nil, err
    }
    return &topic, nil
}

func (r *ForumRepository) GetAll(limit, offset int, sortBy string) ([]*models.ForumTopic, error) {
    query := `SELECT id, title, content, category, tags, author_id, views, upvotes, downvotes, is_solved, created_at, updated_at FROM forum_topics ORDER BY ? DESC LIMIT ? OFFSET ?`
    rows, err := r.db.Query(query, sortBy, limit, offset)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var topics []*models.ForumTopic
    for rows.Next() {
        var topic models.ForumTopic
        err := rows.Scan(
            &topic.ID, &topic.Title, &topic.Content, &topic.Category, &topic.Tags, &topic.AuthorID,
            &topic.Views, &topic.Upvotes, &topic.Downvotes, &topic.IsSolved, &topic.CreatedAt, &topic.UpdatedAt,
        )
        if err != nil {
            return nil, err
        }
        topics = append(topics, &topic)
    }
    return topics, nil
}

func (r *ForumRepository) Update(topic *models.ForumTopic) error {
	query := `UPDATE forum_topics SET title = ?, content = ?, category = ?, tags = ?, is_solved = ? WHERE id = ?`
	_, err := r.db.Exec(query, topic.Title, topic.Content, topic.Category, topic.Tags, topic.IsSolved, topic.ID)
	return err
}

func (r *ForumRepository) Delete(id int) error {
	query := `DELETE FROM forum_topics WHERE id = ?`
	_, err := r.db.Exec(query, id)
	return err
}

func (r *ForumRepository) IncrementViews(id int) error {
	query := `UPDATE forum_topics SET views = views + 1 WHERE id = ?`
	_, err := r.db.Exec(query, id)
	return err
}

func (r *ForumRepository) Upvote(id int) error {
	query := `UPDATE forum_topics SET upvotes = upvotes + 1 WHERE id = ?`
	_, err := r.db.Exec(query, id)
	return err
}

func (r *ForumRepository) Downvote(id int) error {
	query := `UPDATE forum_topics SET downvotes = downvotes + 1 WHERE id = ?`
	_, err := r.db.Exec(query, id)
	return err
}

func (r *ForumRepository) GetByCategory(category string, limit, offset int) ([]*models.ForumTopic, error) {
	query := `SELECT id, title, content, category, tags, author_id, views, upvotes, downvotes, is_solved, created_at, updated_at FROM forum_topics WHERE category = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`
	rows, err := r.db.Query(query, category, limit, offset)
	if err != nil {
			return nil, err
	}
	defer rows.Close()

	var topics []*models.ForumTopic
	for rows.Next() {
			var topic models.ForumTopic
			err := rows.Scan(
					&topic.ID, &topic.Title, &topic.Content, &topic.Category, &topic.Tags, &topic.AuthorID,
					&topic.Views, &topic.Upvotes, &topic.Downvotes, &topic.IsSolved, &topic.CreatedAt, &topic.UpdatedAt,
			)
			if err != nil {
					return nil, err
			}
			topics = append(topics, &topic)
	}
	return topics, nil
}
