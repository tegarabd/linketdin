package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"server/graph/generated"
	"server/graph/model"
)

// Sender is the resolver for the sender field.
func (r *messageResolver) Sender(ctx context.Context, obj *model.Message) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Receiver is the resolver for the receiver field.
func (r *messageResolver) Receiver(ctx context.Context, obj *model.Message) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Create is the resolver for the create field.
func (r *messageMutationResolver) Create(ctx context.Context, obj *model.MessageMutation, input *model.CreateMessage) (*model.Message, error) {
	panic(fmt.Errorf("not implemented"))
}

// Message returns generated.MessageResolver implementation.
func (r *Resolver) Message() generated.MessageResolver { return &messageResolver{r} }

// MessageMutation returns generated.MessageMutationResolver implementation.
func (r *Resolver) MessageMutation() generated.MessageMutationResolver {
	return &messageMutationResolver{r}
}

type messageResolver struct{ *Resolver }
type messageMutationResolver struct{ *Resolver }
