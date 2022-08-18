package repository

import (
	"context"
	"server/database"
	"server/graph/model"

	"github.com/google/uuid"
)

func GetTagByText(ctx context.Context, text string) (*model.Tag, error) {
	db := database.GetDB()

	var tag model.Tag
	if err := db.Find(&tag, "text = ?", text).Error; err != nil {
		return nil, err
	}

	return &tag, nil
}

func CreateTag(ctx context.Context, text string) (*model.Tag, error) {
	db := database.GetDB()

	tag := model.Tag{
		ID:    uuid.NewString(),
		Text:  text,
	}

	if err := db.Create(&tag).Error; err != nil {
		return nil, err
	}

	return &tag, nil
}