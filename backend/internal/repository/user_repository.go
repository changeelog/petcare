package repository

import (
	"database/sql"
	"petcare/internal/models"
)

type UserRepository struct {
    db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
    return &UserRepository{db: db}
}

func (r *UserRepository) Create(user *models.User) error {
    _, err := r.db.Exec(`
        INSERT INTO users (email, password, name, phone, address, description)
        VALUES (?, ?, ?, ?, ?, ?)
    `, user.Email, user.Password, user.Name, user.Phone, user.Address, user.Description)
    return err
}

func (r *UserRepository) GetByID(id int) (*models.User, error) {
	user := &models.User{}
	err := r.db.QueryRow("SELECT * FROM users WHERE id = ?", id).Scan(
			&user.ID, &user.Email, &user.Password, &user.Name, &user.Phone,
			&user.Address, &user.Description, &user.CreatedAt, &user.UpdatedAt,
	)
	if err != nil {
			return nil, err
	}
	return user, nil
}

func (r *UserRepository) GetByEmail(email string) (*models.User, error) {
	user := &models.User{}
	err := r.db.QueryRow("SELECT * FROM users WHERE email = ?", email).Scan(
			&user.ID, &user.Email, &user.Password, &user.Name, &user.Phone,
			&user.Address, &user.Description, &user.CreatedAt, &user.UpdatedAt,
	)
	if err != nil {
			return nil, err
	}
	return user, nil
}

func (r *UserRepository) Update(user *models.User) error {
	_, err := r.db.Exec(`
			UPDATE users SET email = ?, name = ?, phone = ?, address = ?, description = ?
			WHERE id = ?
	`, user.Email, user.Name, user.Phone, user.Address, user.Description, user.ID)
	return err
}

func (r *UserRepository) Delete(id int) error {
	_, err := r.db.Exec("DELETE FROM users WHERE id = ?", id)
	return err
}
