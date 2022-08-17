package repository

import (
	"context"
	"server/database"
	"server/graph/model"

	"github.com/google/uuid"
)

func CreateConnectInvitation(ctx context.Context, input *model.CreateInvitation) (*model.ConnectInvitation, error) {
	db := database.GetDB()

	connectInvitation := model.ConnectInvitation{
		ID:     uuid.NewString(),
		FromID: input.FromUserID,
		ToID:   input.ToUserID,
		Note:   input.Note,
	}

	if err := db.Create(&connectInvitation).Error; err != nil {
		return nil, err
	}

	return &connectInvitation, nil
}

func CreateConnection(ctx context.Context, input *model.AcceptInvitation) (*model.ConnectInvitation, error) {
	db := database.GetDB()

	var connectInvitation model.ConnectInvitation
	if err := db.First(&connectInvitation, "id = ?", input.InvitationID).Error; err != nil {
		return nil, err
	}

	if err := db.Model(&model.User{ID: connectInvitation.FromID}).Association("Connections").Append(&model.User{ID: connectInvitation.ToID}); err != nil {
		return nil, err
	}

	return &connectInvitation, nil
}

func DeleteConnectInvitation(ctx context.Context, invitationId string) (*model.ConnectInvitation, error) {
	db := database.GetDB()

	var connectInvitation model.ConnectInvitation
	if err := db.First(&connectInvitation, "id = ?", invitationId).Error; err != nil {
		return nil, err
	}

	if err := db.Delete(&connectInvitation).Error; err != nil {
		return nil, err
	}

	return &connectInvitation, nil
}