package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"server/graph/generated"
	"server/graph/model"
	"server/service"
)

// Login is the resolver for the login field.
func (r *authMutationResolver) Login(ctx context.Context, obj *model.AuthMutation, input model.LoginUser) (*model.Token, error) {
	token, err := service.Login(ctx, input)
	if err != nil {
		return nil, err
	}
	return &model.Token{
		Token: token.(string),
	}, nil
}

// Register is the resolver for the register field.
func (r *authMutationResolver) Register(ctx context.Context, obj *model.AuthMutation, input model.RegisterUser) (*model.Token, error) {
	token, err := service.Register(ctx, input)
	if err != nil {
		return nil, err
	}
	return &model.Token{
		Token: token.(string),
	}, nil
}

// AuthMutation returns generated.AuthMutationResolver implementation.
func (r *Resolver) AuthMutation() generated.AuthMutationResolver { return &authMutationResolver{r} }

type authMutationResolver struct{ *Resolver }
