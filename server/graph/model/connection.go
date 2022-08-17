package model

import "gorm.io/gorm"

type ConnectInvitation struct {
	gorm.Model
	ID     string `json:"id"`
	FromID string
	From   *User `json:"from"`
	ToID   string
	To     *User   `json:"to"`
	Note   *string `json:"note"`
}
