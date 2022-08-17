package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"server/graph/generated"
	"server/graph/model"
)

// Create is the resolver for the create field.
func (r *jobMutationResolver) Create(ctx context.Context, obj *model.JobMutation, input *model.CreateJob) (*model.Job, error) {
	panic(fmt.Errorf("not implemented"))
}

// JobMutation returns generated.JobMutationResolver implementation.
func (r *Resolver) JobMutation() generated.JobMutationResolver { return &jobMutationResolver{r} }

type jobMutationResolver struct{ *Resolver }
