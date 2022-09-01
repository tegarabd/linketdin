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

func GetThreadLastMessage(ctx context.Context, thread *model.Thread) (*model.Message, error) {
	db := database.GetDB()

	message := model.Message{}
	if err := db.Raw("SELECT * FROM messages WHERE thread_id = ? ORDER BY created_at DESC LIMIT 1", thread.ID).Find(&message).Error; err != nil {
		return nil, err
	}

	return &message, nil
}

func GetThreadById(ctx context.Context, threadId string) (*model.Thread, error) {
	db := database.GetDB()

	thread := model.Thread{}
	if err := db.Find(&thread, "id = ?", threadId).Error; err != nil {
		return nil, err
	}

	return &thread, nil
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