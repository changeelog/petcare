package models

import "time"

type ForumTopic struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	Category  string    `json:"category"`
	Tags      string    `json:"tags"`
	AuthorID  int       `json:"author_id"`
	Views     int       `json:"views"`
	Upvotes   int       `json:"upvotes"`
	Downvotes int       `json:"downvotes"`
	IsSolved  bool      `json:"is_solved"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
