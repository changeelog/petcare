package repository

import (
	"database/sql"
	"petcare/internal/models"
)

type ServiceRepository struct {
    db *sql.DB
}

func NewServiceRepository(db *sql.DB) *ServiceRepository {
    return &ServiceRepository{db: db}
}

func (r *ServiceRepository) Create(service *models.Service) error {
    query := `INSERT INTO services (title, description, price) VALUES (?, ?, ?)`
    result, err := r.db.Exec(query, service.Title, service.Description, service.Price)
    if err != nil {
        return err
    }
    id, err := result.LastInsertId()
    if err != nil {
        return err
    }
    service.ID = int(id)
    return nil
}

func (r *ServiceRepository) GetByID(id int) (*models.Service, error) {
    query := `SELECT id, title, description, price, created_at, updated_at FROM services WHERE id = ?`
    var service models.Service
    err := r.db.QueryRow(query, id).Scan(&service.ID, &service.Title, &service.Description, &service.Price, &service.CreatedAt, &service.UpdatedAt)
    if err != nil {
        return nil, err
    }
    return &service, nil
}

func (r *ServiceRepository) GetAll() ([]*models.Service, error) {
    query := `SELECT id, title, description, price, created_at, updated_at FROM services`
    rows, err := r.db.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var services []*models.Service
    for rows.Next() {
        var service models.Service
        err := rows.Scan(&service.ID, &service.Title, &service.Description, &service.Price, &service.CreatedAt, &service.UpdatedAt)
        if err != nil {
            return nil, err
        }
        services = append(services, &service)
    }
    return services, nil
}

func (r *ServiceRepository) Update(service *models.Service) error {
    query := `UPDATE services SET title = ?, description = ?, price = ? WHERE id = ?`
    _, err := r.db.Exec(query, service.Title, service.Description, service.Price, service.ID)
    return err
}

func (r *ServiceRepository) Delete(id int) error {
    query := `DELETE FROM services WHERE id = ?`
    _, err := r.db.Exec(query, id)
    return err
}
