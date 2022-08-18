package model

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	ID       string `json:"id"`
	PosterID string
	Poster   *User      `json:"poster"`
	Text     string     `json:"text"`
	PhotoURL *string    `json:"photoUrl"`
	VideoURL *string    `json:"videoUrl"`
	Comments []*Comment `json:"comments"`
	Sends    []*User    `json:"sends" gorm:"many2many:post_sends;"`
	Likes    []*User    `json:"likes" gorm:"many2many:post_likes;"`
	Tags []*Tag `gorm:"many2many:comment_tags;"`
}
