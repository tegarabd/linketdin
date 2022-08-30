package repository

import (
	"context"
	"server/database"
	"server/graph/model"

	"github.com/google/uuid"
)

func GetEducationById(ctx context.Context, id string) (*model.Education, error) {
	db := database.GetDB()

	var education model.Education
	if err := db.First(&education, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return &education, nil
}

func CreateEducation(ctx context.Context, input *model.CreateEducation) (*model.Education, error) {
	db := database.GetDB()

	education := model.Education{
		ID:          uuid.NewString(),
		UserID:      input.UserID,
		School:      input.School,
	}

	if err := db.Create(&education).Error; err != nil {
		return nil, err
	}

	return &education, nil
}

func UpdateEducation(ctx context.Context, input *model.UpdateEducation) (*model.Education, error) {
	db := database.GetDB()

	education, err := GetEducationById(ctx, input.EducationID)
	if err != nil {
		return nil, err
	}

	if err := db.Model(&education).Updates(model.Education{
		School:      input.School,
		Degree:      input.Degree,
		Field:       input.Field,
		StartDate:   &model.StartDate{
			StartMonth: input.StartDateMonth,
			StartYear:  input.StartDateYear,
		},
		EndDate:     &model.EndDate{
			EndMonth: input.EndDateMonth,
			EndYear:  input.EndDateYear,
		},
		Grade:       &input.Grade,
		Activities:  &input.Activities,
		Description: &input.Description,
	}).Error; err != nil {
		return nil, err
	}

	return education, nil
}

func DeleteEducation(ctx context.Context, input *model.DeleteEducation) (*model.Education, error) {
	db := database.GetDB()

	education, err := GetEducationById(ctx, input.EducationID)
	if err != nil {
		return nil, err
	}

	if err := db.Delete(&education).Error; err != nil {
		return nil, err
	}

	return education, nil
}