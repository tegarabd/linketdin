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
func (r *educationResolver) User(ctx context.Context, obj *model.Education) (*model.User, error) {
	return repository.GetUserByID(ctx, obj.UserID)
}

// Create is the resolver for the create field.
func (r *educationMutationResolver) Create(ctx context.Context, obj *model.EducationMutation, input *model.CreateEducation) (*model.Education, error) {
	return repository.CreateEducation(ctx, input)
}

// Update is the resolver for the update field.
func (r *educationMutationResolver) Update(ctx context.Context, obj *model.EducationMutation, input *model.UpdateEducation) (*model.Education, error) {
	return repository.UpdateEducation(ctx, input)
}

// Delete is the resolver for the delete field.
func (r *educationMutationResolver) Delete(ctx context.Context, obj *model.EducationMutation, input *model.DeleteEducation) (*model.Education, error) {
	return repository.DeleteEducation(ctx, input)
}

// Education returns generated.EducationResolver implementation.
func (r *Resolver) Education() generated.EducationResolver { return &educationResolver{r} }

// EducationMutation returns generated.EducationMutationResolver implementation.
func (r *Resolver) EducationMutation() generated.EducationMutationResolver {
	return &educationMutationResolver{r}
}

type educationResolver struct{ *Resolver }
type educationMutationResolver struct{ *Resolver }
