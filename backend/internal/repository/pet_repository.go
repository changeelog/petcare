package repository

import (
	"database/sql"
	"petcare/internal/models"
)

type PetRepository struct {
    db *sql.DB
}

func NewPetRepository(db *sql.DB) *PetRepository {
    return &PetRepository{db: db}
}

func (r *PetRepository) Create(pet *models.Pet) error {
    query := `INSERT INTO pets (user_id, name, type, breed, age) VALUES (?, ?, ?, ?, ?)`
    result, err := r.db.Exec(query, pet.UserID, pet.Name, pet.Type, pet.Breed, pet.Age)
    if err != nil {
        return err
    }
    id, err := result.LastInsertId()
    if err != nil {
        return err
    }
    pet.ID = int(id)
    return nil
}

func (r *PetRepository) GetByID(id int) (*models.Pet, error) {
    query := `SELECT id, user_id, name, type, breed, age FROM pets WHERE id = ?`
    var pet models.Pet
    err := r.db.QueryRow(query, id).Scan(&pet.ID, &pet.UserID, &pet.Name, &pet.Type, &pet.Breed, &pet.Age)
    if err != nil {
        return nil, err
    }
    return &pet, nil
}

func (r *PetRepository) GetByUserID(userID int) ([]*models.Pet, error) {
    query := `SELECT id, user_id, name, type, breed, age FROM pets WHERE user_id = ?`
    rows, err := r.db.Query(query, userID)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var pets []*models.Pet
    for rows.Next() {
        var pet models.Pet
        err := rows.Scan(&pet.ID, &pet.UserID, &pet.Name, &pet.Type, &pet.Breed, &pet.Age)
        if err != nil {
            return nil, err
        }
        pets = append(pets, &pet)
    }
    return pets, nil
}

func (r *PetRepository) Update(pet *models.Pet) error {
    query := `UPDATE pets SET name = ?, type = ?, breed = ?, age = ? WHERE id = ?`
    _, err := r.db.Exec(query, pet.Name, pet.Type, pet.Breed, pet.Age, pet.ID)
    return err
}

func (r *PetRepository) Delete(id int) error {
    query := `DELETE FROM pets WHERE id = ?`
    _, err := r.db.Exec(query, id)
    return err
}
