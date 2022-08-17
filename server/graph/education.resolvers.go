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
func (r *educationResolver) User(ctx context.Context, obj *model.Education) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Create is the resolver for the create field.
func (r *educationMutationResolver) Create(ctx context.Context, obj *model.EducationMutation, input *model.CreateEducation) (*model.Education, error) {
	panic(fmt.Errorf("not implemented"))
}

// Update is the resolver for the update field.
func (r *educationMutationResolver) Update(ctx context.Context, obj *model.EducationMutation, input *model.UpdateEducation) (*model.Education, error) {
	panic(fmt.Errorf("not implemented"))
}

// Delete is the resolver for the delete field.
func (r *educationMutationResolver) Delete(ctx context.Context, obj *model.EducationMutation, input *model.DeleteEducation) (*model.Education, error) {
	panic(fmt.Errorf("not implemented"))
}

// Education returns generated.EducationResolver implementation.
func (r *Resolver) Education() generated.EducationResolver { return &educationResolver{r} }

// EducationMutation returns generated.EducationMutationResolver implementation.
func (r *Resolver) EducationMutation() generated.EducationMutationResolver {
	return &educationMutationResolver{r}
}

type educationResolver struct{ *Resolver }
type educationMutationResolver struct{ *Resolver }
