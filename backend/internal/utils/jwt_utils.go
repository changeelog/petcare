package utils

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

func GenerateToken(userID int, secret string, expirationTime time.Duration) (string, error) {
	claims := jwt.MapClaims{
		 "user_id": userID,
		 "exp":     time.Now().Add(expirationTime).Unix(), // Token expires in 24 hours
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}
