package repository

import (
	"context"
	"server/database"
	"server/graph/model"

	"github.com/google/uuid"
)

func CreateJob(ctx context.Context, input *model.CreateJob) (*model.Job, error) {
	db := database.GetDB()

	job := model.Job{
		ID:             uuid.NewString(),
		Title:          input.Title,
		CompanyName:    input.CompanyName,
		Workplace:      input.Workplace,
		Location:       &model.Location{
			Region: input.LocationRegion,
			City:   input.LocationCity,
		},
		EmploymentType: input.EmploymentType,
		Description:    input.Description,
	}

	if err := db.Create(&job).Error; err != nil {
		return nil, err
	}

	return &job, nil
}