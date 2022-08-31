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
func (r *threadResolver) User(ctx context.Context, obj *model.Thread) (*model.User, error) {
	return repository.GetUserByID(ctx, obj.UserID)
}

// With is the resolver for the with field.
func (r *threadResolver) With(ctx context.Context, obj *model.Thread) (*model.User, error) {
	return repository.GetUserByID(ctx, obj.WithID)
}

// Messages is the resolver for the messages field.
func (r *threadResolver) Messages(ctx context.Context, obj *model.Thread) ([]*model.Message, error) {
	return repository.GetThreadMessages(ctx, obj)
}

// Create is the resolver for the create field.
func (r *threadMutationResolver) Create(ctx context.Context, obj *model.ThreadMutation, input model.CreateThread) (*model.Thread, error) {
	return repository.CreateThread(ctx, &input)
}

// Thread returns generated.ThreadResolver implementation.
func (r *Resolver) Thread() generated.ThreadResolver { return &threadResolver{r} }

// ThreadMutation returns generated.ThreadMutationResolver implementation.
func (r *Resolver) ThreadMutation() generated.ThreadMutationResolver {
	return &threadMutationResolver{r}
}

type threadResolver struct{ *Resolver }
type threadMutationResolver struct{ *Resolver }
