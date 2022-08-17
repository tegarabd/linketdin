package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"server/graph/generated"
	"server/graph/model"
	"server/repository"
)

// From is the resolver for the from field.
func (r *connectInvitationResolver) From(ctx context.Context, obj *model.ConnectInvitation) (*model.User, error) {
	return repository.GetUserByID(ctx, obj.FromID)
}

// To is the resolver for the to field.
func (r *connectInvitationResolver) To(ctx context.Context, obj *model.ConnectInvitation) (*model.User, error) {
	return repository.GetUserByID(ctx, obj.ToID)
}

// Create is the resolver for the create field.
func (r *connectionMutationResolver) Create(ctx context.Context, obj *model.ConnectionMutation, input *model.CreateInvitation) (*model.ConnectInvitation, error) {
	return repository.CreateConnectInvitation(ctx, input)
}

// Accept is the resolver for the accept field.
func (r *connectionMutationResolver) Accept(ctx context.Context, obj *model.ConnectionMutation, input *model.AcceptInvitation) (*model.ConnectInvitation, error) {
	_, err := repository.CreateConnection(ctx, input)
	if err != nil {
		return nil, err
	}
	return repository.DeleteConnectInvitation(ctx, input.InvitationID)
}

// Reject is the resolver for the reject field.
func (r *connectionMutationResolver) Reject(ctx context.Context, obj *model.ConnectionMutation, input *model.RejectInvitation) (*model.ConnectInvitation, error) {
	return repository.DeleteConnectInvitation(ctx, input.InvitationID)
}

// ConnectInvitation returns generated.ConnectInvitationResolver implementation.
func (r *Resolver) ConnectInvitation() generated.ConnectInvitationResolver {
	return &connectInvitationResolver{r}
}

// ConnectionMutation returns generated.ConnectionMutationResolver implementation.
func (r *Resolver) ConnectionMutation() generated.ConnectionMutationResolver {
	return &connectionMutationResolver{r}
}

type connectInvitationResolver struct{ *Resolver }
type connectionMutationResolver struct{ *Resolver }
