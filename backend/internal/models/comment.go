package models

import "time"

type Comment struct {
	ID        int       `json:"id"`
	Content   string    `json:"content"`
	AuthorID  int       `json:"author_id"`
	TopicID   *int      `json:"topic_id,omitempty"`
	TipID     *int      `json:"tip_id,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
