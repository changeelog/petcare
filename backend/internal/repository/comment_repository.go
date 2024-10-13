package repository

import (
	"database/sql"
	"petcare/internal/models"
)

type CommentRepository struct {
    db *sql.DB
}

func NewCommentRepository(db *sql.DB) *CommentRepository {
    return &CommentRepository{db: db}
}

func (r *CommentRepository) Create(comment *models.Comment) error {
    query := `INSERT INTO comments (content, author_id, topic_id, tip_id) VALUES (?, ?, ?, ?)`
    result, err := r.db.Exec(query, comment.Content, comment.AuthorID, comment.TopicID, comment.TipID)
    if err != nil {
        return err
    }
    id, err := result.LastInsertId()
    if err != nil {
        return err
    }
    comment.ID = int(id)
    return nil
}

func (r *CommentRepository) GetByID(id int) (*models.Comment, error) {
    query := `SELECT id, content, author_id, topic_id, tip_id, created_at, updated_at FROM comments WHERE id = ?`
    var comment models.Comment
    err := r.db.QueryRow(query, id).Scan(
        &comment.ID, &comment.Content, &comment.AuthorID, &comment.TopicID, &comment.TipID,
        &comment.CreatedAt, &comment.UpdatedAt,
    )
    if err != nil {
        return nil, err
    }
    return &comment, nil
}

func (r *CommentRepository) GetForTopic(topicID int) ([]*models.Comment, error) {
    query := `SELECT id, content, author_id, topic_id, tip_id, created_at, updated_at FROM comments WHERE topic_id = ? ORDER BY created_at DESC`
    return r.getComments(query, topicID)
}

func (r *CommentRepository) GetForTip(tipID int) ([]*models.Comment, error) {
    query := `SELECT id, content, author_id, topic_id, tip_id, created_at, updated_at FROM comments WHERE tip_id = ? ORDER BY created_at DESC`
    return r.getComments(query, tipID)
}

func (r *CommentRepository) getComments(query string, id int) ([]*models.Comment, error) {
    rows, err := r.db.Query(query, id)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var comments []*models.Comment
    for rows.Next() {
        var comment models.Comment
        err := rows.Scan(
            &comment.ID, &comment.Content, &comment.AuthorID, &comment.TopicID, &comment.TipID,
            &comment.CreatedAt, &comment.UpdatedAt,
        )
        if err != nil {
            return nil, err
        }
        comments = append(comments, &comment)
    }
    return comments, nil
}

func (r *CommentRepository) Update(comment *models.Comment) error {
    query := `UPDATE comments SET content = ? WHERE id = ?`
    _, err := r.db.Exec(query, comment.Content, comment.ID)
    return err
}

func (r *CommentRepository) Delete(id int) error {
	query := `DELETE FROM comments WHERE id = ?`
	_, err := r.db.Exec(query, id)
	return err
}
