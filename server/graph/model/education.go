package model

import "gorm.io/gorm"

type Education struct {
	gorm.Model
	ID          string `json:"id"`
	UserID      string
	User        *User    `json:"user"`
	School      string   `json:"school"`
	Degree      string   `json:"degree"`
	Field       string   `json:"field"`
	StartDate   *Date    `json:"startDate" gorm:"embedded"`
	EndDate     *Date    `json:"endDate" gorm:"embedded"`
	Grade       *float64 `json:"grade"`
	Activities  *string  `json:"activities"`
	Description *string  `json:"description"`
}
