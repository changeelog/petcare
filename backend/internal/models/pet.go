package models

type Pet struct {
	ID     int    `json:"id"`
	UserID int    `json:"user_id"`
	Name   string `json:"name"`
	Type   string `json:"type"`
	Breed  string `json:"breed"`
	Age    int    `json:"age"`
}
