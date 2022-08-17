package database

import "server/graph/model"

func Migrate() {
	db.AutoMigrate(&model.Comment{}, &model.ConnectInvitation{}, &model.Education{}, &model.Experience{}, &model.Job{}, &model.Message{}, &model.Notification{}, &model.Post{}, &model.User{}, &model.ActivationCode{}, &model.ResetPasswordCode{})
}