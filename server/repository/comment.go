package repository

import (
	"context"
	"server/database"
	"server/graph/model"

	"github.com/google/uuid"
)

func GetCommentById(ctx context.Context, id string) (*model.Comment, error) {
	db := database.GetDB()

	var comment model.Comment
	if err := db.First(&comment, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return &comment, nil
}

func GetCommentLikes(ctx context.Context, comment *model.Comment)  ([]*model.User, error) {
	db := database.GetDB()

	var likes []*model.User
	if err := db.Model(&comment).Association("Likes").Find(&likes); err != nil {
		return nil, err
	}

	return likes, nil
}

func CreateComment(ctx context.Context, input *model.CommentPost) (*model.Comment, error) {
	db := database.GetDB()

	comment := model.Comment{
		ID:          uuid.NewString(),
		PostID:      input.PostID,
		CommenterID: input.CommenterID,
		Text:        input.Text,
		RepliedToID: *input.RepliedToCommentID,
	}

	if err := db.Create(&comment).Error; err != nil {
		return nil, err
	}

	return &comment, nil
}

func AddCommentLike(ctx context.Context, input *model.LikeComment) (*model.Comment, error) {
	db := database.GetDB()

	comment, err := GetCommentById(ctx, input.CommentID)
	if err != nil {
		return nil, err
	}

	if err := db.Model(&comment).Association("Likes").Append(&model.User{ID: input.LikerID}); err != nil {
		return nil, err
	}

	return comment, nil
}