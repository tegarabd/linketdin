package model

import "gorm.io/gorm"

type Notification struct {
	gorm.Model
	ID     string `json:"id"`
	FromID string
	From   *User  `json:"from"`
	ToID string
	To *User `json:"to"`
	Text   string `json:"text"`
}
