package repository

import (
	"context"
	"server/database"
	"server/graph/model"

	"github.com/google/uuid"
)

func GetThreadMessages(ctx context.Context, thread *model.Thread) ([]*model.Message, error) {
	db := database.GetDB()

	messages := []*model.Message{}
	if err := db.Model(&thread).Association("Messages").Find(&messages); err != nil {
		return nil, err
	}

	return messages, nil
}

func CreateThread(ctx context.Context, input *model.CreateThread) (*model.Thread, error) {
	db := database.GetDB()

	thread := model.Thread{
		ID:       uuid.NewString(),
		UserID:   input.UserID,
		WithID:   input.WithUserID,
	}

	if err := db.Create(&thread).Error; err != nil {
		return nil, err
	}

	return &thread, nil
}