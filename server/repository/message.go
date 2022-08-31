package repository

import (
	"context"
	"server/database"
	"server/graph/model"

	"github.com/google/uuid"
)

func CreateMessage(ctx context.Context, input *model.CreateMessage) (*model.Message, error) {
	db := database.GetDB()

	message := model.Message{
		ID:         uuid.NewString(),
		SenderID:   input.SenderID,
		ThreadID: input.ThreadID,
		Text:       input.Text,
		ImageURL:   input.ImageURL,
	}

	if err := db.Create(&message).Error; err != nil {
		return nil, err
	}

	return &message, nil
}