package repository

import (
	"context"
	"server/database"
	"server/graph/model"

	"github.com/google/uuid"
)

func CreateNotification(ctx context.Context, input *model.CreateNotification) (*model.Notification, error) {
	db := database.GetDB()

	notification := model.Notification{
		ID:     uuid.NewString(),
		FromID: input.FromID,
		ToID: input.ToID,
		Text:   input.Text,
	}

	if err := db.Create(&notification).Error; err != nil {
		return nil, err
	}

	return &notification, nil
}