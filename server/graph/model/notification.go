package model

import "gorm.io/gorm"

type Notification struct {
	gorm.Model
	ID     string `json:"id"`
	FromID string
	From   *User  `json:"from"`
	Text   string `json:"text"`
}
