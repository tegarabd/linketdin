package model

import "gorm.io/gorm"

type Tag struct {
	gorm.Model
	ID   string `json:"id"`
	Text string `json:"text" gorm:"uniqueIndex"`
	Posts []*Post `gorm:"many2many:comment_tags;"`
}