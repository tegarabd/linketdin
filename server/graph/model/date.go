package model

type Date struct {
	Month string `json:"month"`
	Year  int    `json:"year"`
}

type StartDate struct {
	StartMonth string `json:"endMonth"`
	StartYear  int    `json:"endYear"`
}

type EndDate struct {
	EndMonth string `json:"endMonth"`
	EndYear  int    `json:"endYear"`
}