package database

import "server/graph/model"

func Migrate() {
	db.AutoMigrate(&model.Comment{}, &model.ConnectInvitation{}, &model.Education{}, &model.Experience{}, &model.Job{}, &model.Thread{}, &model.Message{}, &model.Notification{}, &model.Post{}, &model.Tag{}, &model.User{}, &model.ActivationCode{}, &model.ResetPasswordCode{})
}