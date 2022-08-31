package model

import "gorm.io/gorm"

type Message struct {
	gorm.Model
	ID         string `json:"id"`
	SenderID   string
	Sender     *User `json:"sender"`
	ThreadID string
	Thread *Thread `json:"thread"`
	Text       string  `json:"text"`
	ImageURL   *string `json:"imageUrl"`
}
