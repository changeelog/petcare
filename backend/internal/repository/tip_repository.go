package repository

import (
	"database/sql"
	"petcare/internal/models"
)

type TipRepository struct {
	db *sql.DB
}

func NewTipRepository(db *sql.DB) *TipRepository {
	return &TipRepository{db: db}
}

func (r *TipRepository) Create(tip *models.Tip) error {
	query := `INSERT INTO tips (title, content, author_id) VALUES (?, ?, ?)`
	result, err := r.db.Exec(query, tip.Title, tip.Content, tip.AuthorID)
	if err != nil {
		return err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return err
	}
	tip.ID = int(id)
	return nil
}

func (r *TipRepository) GetByID(id int) (*models.Tip, error) {
	query := `SELECT id, title, content, author_id, upvotes, downvotes, created_at, updated_at FROM tips WHERE id = ?`
	var tip models.Tip
	err := r.db.QueryRow(query, id).Scan(&tip.ID, &tip.Title, &tip.Content, &tip.AuthorID, &tip.Upvotes, &tip.Downvotes, &tip.CreatedAt, &tip.UpdatedAt)
	if err != nil {
			return nil, err
	}
	return &tip, nil
}

func (r *TipRepository) GetAll(limit, offset int) ([]*models.Tip, error) {
	query := `SELECT id, title, content, author_id, upvotes, downvotes, created_at, updated_at FROM tips ORDER BY created_at DESC LIMIT ? OFFSET ?`
	rows, err := r.db.Query(query, limit, offset)
	if err != nil {
			return nil, err
	}
	defer rows.Close()

	var tips []*models.Tip
	for rows.Next() {
			var tip models.Tip
			err := rows.Scan(&tip.ID, &tip.Title, &tip.Content, &tip.AuthorID, &tip.Upvotes, &tip.Downvotes, &tip.CreatedAt, &tip.UpdatedAt)
			if err != nil {
					return nil, err
			}
			tips = append(tips, &tip)
	}
	return tips, nil
}

func (r *TipRepository) Update(tip *models.Tip) error {
	query := `UPDATE tips SET title = ?, content = ? WHERE id = ?`
	_, err := r.db.Exec(query, tip.Title, tip.Content, tip.ID)
	return err
}

func (r *TipRepository) Delete(id int) error {
	query := `DELETE FROM tips WHERE id = ?`
	_, err := r.db.Exec(query, id)
	return err
}

func (r *TipRepository) Upvote(id int) error {
	query := `UPDATE tips SET upvotes = upvotes + 1 WHERE id = ?`
	_, err := r.db.Exec(query, id)
	return err
}

func (r *TipRepository) Downvote(id int) error {
	query := `UPDATE tips SET downvotes = downvotes + 1 WHERE id = ?`
	_, err := r.db.Exec(query, id)
	return err
}
