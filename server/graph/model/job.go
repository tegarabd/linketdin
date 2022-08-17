package model

import "gorm.io/gorm"

type Job struct {
	gorm.Model
	ID             string    `json:"id"`
	Title          string    `json:"title"`
	CompanyName    string    `json:"companyName"`
	Workplace      string    `json:"workplace"`
	Location       *Location `json:"location" gorm:"embedded"`
	EmploymentType string    `json:"employmentType"`
	Description    string    `json:"description"`
}
