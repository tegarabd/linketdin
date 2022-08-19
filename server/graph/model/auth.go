package model

import "time"

type ActivationCode struct {
	ID        string    `json:"id"`
	UserID    string    `json:"userId"`
	User User
	Code      string    `json:"code"`
	ExpiredAt time.Time `json:"expiredAt"`
}

type ResetPasswordCode struct {
	ID        string    `json:"id"`
	UserID    string    `json:"userId"`
	User User
	Code      string    `json:"code"`
	ExpiredAt time.Time `json:"expiredAt"`
}