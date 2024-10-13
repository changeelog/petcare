package repository

import (
	"database/sql"
	"petcare/internal/models"
)

type VetRepository struct {
    db *sql.DB
}

func NewVetRepository(db *sql.DB) *VetRepository {
    return &VetRepository{db: db}
}

func (r *VetRepository) Create(vet *models.Vet) error {
    query := `INSERT INTO vets (name, specialization, description) VALUES (?, ?, ?)`
    result, err := r.db.Exec(query, vet.Name, vet.Specialization, vet.Description)
    if err != nil {
        return err
    }
    id, err := result.LastInsertId()
    if err != nil {
        return err
    }
    vet.ID = int(id)
    return nil
}

func (r *VetRepository) GetByID(id int) (*models.Vet, error) {
    query := `SELECT id, name, specialization, description, created_at, updated_at FROM vets WHERE id = ?`
    var vet models.Vet
    err := r.db.QueryRow(query, id).Scan(&vet.ID, &vet.Name, &vet.Specialization, &vet.Description, &vet.CreatedAt, &vet.UpdatedAt)
    if err != nil {
        return nil, err
    }
    return &vet, nil
}

func (r *VetRepository) GetAll() ([]*models.Vet, error) {
    query := `SELECT id, name, specialization, description, created_at, updated_at FROM vets`
    rows, err := r.db.Query(query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var vets []*models.Vet
    for rows.Next() {
        var vet models.Vet
        err := rows.Scan(&vet.ID, &vet.Name, &vet.Specialization, &vet.Description, &vet.CreatedAt, &vet.UpdatedAt)
        if err != nil {
            return nil, err
        }
        vets = append(vets, &vet)
    }
    return vets, nil
}

func (r *VetRepository) Update(vet *models.Vet) error {
    query := `UPDATE vets SET name = ?, specialization = ?, description = ? WHERE id = ?`
    _, err := r.db.Exec(query, vet.Name, vet.Specialization, vet.Description, vet.ID)
    return err
}

func (r *VetRepository) Delete(id int) error {
    query := `DELETE FROM vets WHERE id = ?`
    _, err := r.db.Exec(query, id)
    return err
}
