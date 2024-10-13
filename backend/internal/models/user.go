package models

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
    ID          int       `json:"id" db:"id"`
    Email       string    `json:"email" db:"email" validate:"required,email"`
    Password    string    `json:"-" db:"password" validate:"required,min=8"`
    Name        string    `json:"name" db:"name" validate:"required"`
    Phone       string    `json:"phone" db:"phone" validate:"required"`
    Address     string    `json:"address" db:"address" validate:"required"`
    Description string    `json:"description" db:"description"`
    CreatedAt   time.Time `json:"created_at" db:"created_at"`
    UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
}

func (u *User) HashPassword() error {
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
    if err != nil {
        return err
    }
    u.Password = string(hashedPassword)
    return nil
}

func (u *User) CheckPassword(password string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
    return err == nil
}
