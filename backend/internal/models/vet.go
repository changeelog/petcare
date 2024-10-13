package models

import "time"

type Vet struct {
    ID             int       `json:"id"`
    Name           string    `json:"name"`
    Specialization string    `json:"specialization"`
    Description    string    `json:"description"`
    CreatedAt      time.Time `json:"created_at"`
    UpdatedAt      time.Time `json:"updated_at"`
}
