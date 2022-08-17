package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"server/graph/generated"
	"server/graph/model"
)

// User is the resolver for the user field.
func (r *experienceResolver) User(ctx context.Context, obj *model.Experience) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Create is the resolver for the create field.
func (r *experienceMutationResolver) Create(ctx context.Context, obj *model.ExperienceMutation, input *model.CreateExperience) (*model.Experience, error) {
	panic(fmt.Errorf("not implemented"))
}

// Update is the resolver for the update field.
func (r *experienceMutationResolver) Update(ctx context.Context, obj *model.ExperienceMutation, input *model.UpdateExperience) (*model.Experience, error) {
	panic(fmt.Errorf("not implemented"))
}

// Delete is the resolver for the delete field.
func (r *experienceMutationResolver) Delete(ctx context.Context, obj *model.ExperienceMutation, input *model.DeleteExperience) (*model.Experience, error) {
	panic(fmt.Errorf("not implemented"))
}

// Experience returns generated.ExperienceResolver implementation.
func (r *Resolver) Experience() generated.ExperienceResolver { return &experienceResolver{r} }

// ExperienceMutation returns generated.ExperienceMutationResolver implementation.
func (r *Resolver) ExperienceMutation() generated.ExperienceMutationResolver {
	return &experienceMutationResolver{r}
}

type experienceResolver struct{ *Resolver }
type experienceMutationResolver struct{ *Resolver }
