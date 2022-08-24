package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"server/graph/generated"
	"server/graph/model"
	"server/repository"
	"server/service"

	"gorm.io/gorm"
)

// Google is the resolver for the google field.
func (r *authMutationResolver) Google(ctx context.Context, obj *model.AuthMutation, input model.GoogleAuth) (*model.Token, error) {
	return service.ResolveGoogleAuth(ctx, input)
}

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
func (r *authMutationResolver) Register(ctx context.Context, obj *model.AuthMutation, input model.RegisterUser) (*model.ActivationID, error) {
	activationCode, err := service.Register(ctx, input)
	if err != nil {
		return nil, err
	}
	return &model.ActivationID{ActivationID: activationCode.(string)}, nil
}

// Activate is the resolver for the activate field.
func (r *authMutationResolver) Activate(ctx context.Context, obj *model.AuthMutation, input model.ActivateUser) (*model.User, error) {
	return repository.VerifyActivationCode(ctx, input)
}

// IsEmailAlreadyTaken is the resolver for the isEmailAlreadyTaken field.
func (r *authMutationResolver) IsEmailAlreadyTaken(ctx context.Context, obj *model.AuthMutation, email string) (bool, error) {
	_, err := repository.GetUserByEmail(ctx, email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return false, nil
		}
		return false, err
	}

	return true, nil
}

// IsPasswordValid is the resolver for the isPasswordValid field.
func (r *authMutationResolver) IsPasswordValid(ctx context.Context, obj *model.AuthMutation, password string) (bool, error) {
	if len(password) < 8 {
		return false, nil
	}
	return true, nil
}

// VerifyForgotPasswordEmail is the resolver for the verifyForgotPasswordEmail field.
func (r *authMutationResolver) VerifyForgotPasswordEmail(ctx context.Context, obj *model.AuthMutation, input *model.ForgotPasswordEmail) (*model.ForgotPasswordID, error) {
	user, err := repository.GetUserByEmail(ctx, input.Email)
	if err != nil {
		return nil, err
	}
	return service.ResolveForgotPasswordCode(ctx, user)
}

// VerifyForgotPasswordCode is the resolver for the verifyForgotPasswordCode field.
func (r *authMutationResolver) VerifyForgotPasswordCode(ctx context.Context, obj *model.AuthMutation, input model.ForgotPasswordCode) (*model.User, error) {
	return repository.VerifyForgotPasswordCode(ctx, input)
}

// ResetPassword is the resolver for the resetPassword field.
func (r *authMutationResolver) ResetPassword(ctx context.Context, obj *model.AuthMutation, input model.ResetPassword) (*model.User, error) {
	return repository.ResetPassword(ctx, input)
}

// AuthMutation returns generated.AuthMutationResolver implementation.
func (r *Resolver) AuthMutation() generated.AuthMutationResolver { return &authMutationResolver{r} }

type authMutationResolver struct{ *Resolver }
