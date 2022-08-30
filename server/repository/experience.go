package repository

import (
	"context"
	"server/database"
	"server/graph/model"

	"github.com/google/uuid"
)

func GetExperienceById(ctx context.Context, id string) (*model.Experience, error) {
	db := database.GetDB()

	var experience model.Experience
	if err := db.First(&experience, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return &experience, nil
}

func CreateExperience(ctx context.Context, input *model.CreateExperience) (*model.Experience, error) {
	db := database.GetDB()

	experience := model.Experience{
		ID:             uuid.NewString(),
		UserID:         input.UserID,
		Title:          input.Title,
		EmploymentType: input.EmploymentType,
		CompanyName:    input.CompanyName,
		Location:       &model.Location{
			Region: input.LocationRegion,
			City:   input.LocationCity,
		},
		IsActive:       input.IsActive,
		StartDate:      &model.StartDate{
			StartMonth: input.StartDateMonth,
			StartYear:  input.StartDateYear,
		},
		EndDate:        &model.EndDate{
			EndMonth: *input.EndDateMonth,
			EndYear:  *input.EndDateYear,
		},
		Industry:       input.Industry,
		Headline:       input.Headline,
	}

	if err := db.Create(&experience).Error; err != nil {
		return nil, err
	}

	return &experience, nil
}

func UpdateExperience(ctx context.Context, input *model.UpdateExperience) (*model.Experience, error) {
	db := database.GetDB()

	experince, err := GetExperienceById(ctx, input.ExperienceID)
	if err != nil {
		return nil, err
	}

	if err := db.Model(&experince).Updates(model.Experience{
		Title:          input.Title,
		EmploymentType: input.EmploymentType,
		CompanyName:    input.CompanyName,
		Location:       &model.Location{
			Region: input.LocationRegion,
			City:   input.LocationCity,
		},
		IsActive:       input.IsActive,
		StartDate:      &model.StartDate{
			StartMonth: input.StartDateMonth,
			StartYear:  input.StartDateYear,
		},
		EndDate:        &model.EndDate{
			EndMonth: input.EndDateMonth,
			EndYear:  input.EndDateYear,
		},
		Industry:       input.Industry,
		Headline:       &input.Headline,
	}).Error; err != nil {
		return nil, err
	}

	return experince, nil
}

func DeleteExperience(ctx context.Context, input *model.DeleteExperience) (*model.Experience, error) {
	db := database.GetDB()

	experince, err := GetExperienceById(ctx, input.ExperienceID)
	if err != nil {
		return nil, err
	}

	if err := db.Delete(&experince).Error; err != nil {
		return nil, err
	}

	return experince, nil
}