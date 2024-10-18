package config

import (
    "os"

    "github.com/joho/godotenv"
)

type Config struct {
    JWTSecret string
}

func New() *Config {
    godotenv.Load()

    return &Config{
        JWTSecret: os.Getenv("JWT_SECRET"),
    }
}
