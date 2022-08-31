package model

import "gorm.io/gorm"

type Thread struct {
	gorm.Model
	ID       string `json:"id"`
	UserID   string
	User	*User `json:"user"`
	WithID   string
	With     *User      `json:"with"`
	Messages []*Message `json:"messages"`
}