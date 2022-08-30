package model

import "gorm.io/gorm"

type Experience struct {
	gorm.Model
	ID             string `json:"id"`
	UserID         string
	User           *User     `json:"user"`
	Title          string    `json:"title"`
	EmploymentType string    `json:"employmentType"`
	CompanyName    string    `json:"companyName"`
	Location       *Location `json:"location" gorm:"embedded"`
	IsActive       bool      `json:"isActive"`
	StartDate      *StartDate     `json:"startDate" gorm:"embedded"`
	EndDate        *EndDate     `json:"endDate" gorm:"embedded"`
	Industry       string    `json:"industry"`
	Headline       *string   `json:"headline"`
}
