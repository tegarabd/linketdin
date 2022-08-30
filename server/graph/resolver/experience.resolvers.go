package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"server/graph/generated"
	"server/graph/model"
	"server/repository"
)

// User is the resolver for the user field.
func (r *experienceResolver) User(ctx context.Context, obj *model.Experience) (*model.User, error) {
	return repository.GetUserByID(ctx, obj.UserID)
}

// StartDate is the resolver for the startDate field.
func (r *experienceResolver) StartDate(ctx context.Context, obj *model.Experience) (*model.Date, error) {
	experience, err := repository.GetExperienceById(ctx, obj.ID)
	if err != nil {
		return nil, err
	}

	return &model.Date{
		Month: experience.StartDate.StartMonth,
		Year:  experience.StartDate.StartYear,
	}, err
}

// EndDate is the resolver for the endDate field.
func (r *experienceResolver) EndDate(ctx context.Context, obj *model.Experience) (*model.Date, error) {
	experience, err := repository.GetExperienceById(ctx, obj.ID)
	if err != nil {
		return nil, err
	}

	return &model.Date{
		Month: experience.EndDate.EndMonth,
		Year:  experience.EndDate.EndYear,
	}, err
}

// Create is the resolver for the create field.
func (r *experienceMutationResolver) Create(ctx context.Context, obj *model.ExperienceMutation, input *model.CreateExperience) (*model.Experience, error) {
	return repository.CreateExperience(ctx, input)
}

// Update is the resolver for the update field.
func (r *experienceMutationResolver) Update(ctx context.Context, obj *model.ExperienceMutation, input *model.UpdateExperience) (*model.Experience, error) {
	return repository.UpdateExperience(ctx, input)
}

// Delete is the resolver for the delete field.
func (r *experienceMutationResolver) Delete(ctx context.Context, obj *model.ExperienceMutation, input *model.DeleteExperience) (*model.Experience, error) {
	return repository.DeleteExperience(ctx, input)
}

// Experience returns generated.ExperienceResolver implementation.
func (r *Resolver) Experience() generated.ExperienceResolver { return &experienceResolver{r} }

// ExperienceMutation returns generated.ExperienceMutationResolver implementation.
func (r *Resolver) ExperienceMutation() generated.ExperienceMutationResolver {
	return &experienceMutationResolver{r}
}

type experienceResolver struct{ *Resolver }
type experienceMutationResolver struct{ *Resolver }
