package model

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	ID          string `json:"id"`
	PostID      string
	Post        *Post `json:"post"`
	CommenterID string
	Commenter   *User   `json:"commenter"`
	Text        string  `json:"text"`
	Likes       []*User `json:"likes" gorm:"many2many:comment_likes;"`
	RepliedToID *string
	Replies	[]Comment `json:"replies" gorm:"foreignkey:RepliedToID"`
}
