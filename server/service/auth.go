package service

import (
	"context"
	"fmt"
	"net/http"
	"server/graph/model"
	"server/repository"
	"server/tools"

	"github.com/markbates/goth/gothic"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

func Register(ctx context.Context, input model.RegisterUser) (interface{}, error) {

	_, err := repository.GetUserByEmail(ctx, input.Email)
	if err == nil {
		return nil, &gqlerror.Error{
				Message: "Email already registered",
			}
	}

	user, err := repository.CreateUser(ctx, input)
	if err != nil {
		return nil, err
	}

	activationCode, err := repository.CreateActivationCode(ctx, user.ID)
	if err != nil {
		return nil, err
	}

	message := fmt.Sprintf("Verify your account with this code %s", activationCode.Code)
	if err := SendEmail([]string{user.Email}, "Account Activation Verification Code", message); err != nil {
		return nil, err
	}

	token, err := JwtGenerate(ctx, user.ID)
	if err != nil {
		return nil, err
	}

	return token, nil
}

func Login(ctx context.Context, input model.LoginUser) (interface{}, error) {

	user, err := repository.GetUserByEmail(ctx, input.Email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "Email not found",
			}
		}
		return nil, err
	}

	if err := tools.ComparePassword(user.Password, input.Password); err != nil {
		return nil, err
	}

	token, err := JwtGenerate(ctx, user.ID)
	if err != nil {
		return nil, err
	}

	return token, nil

}

func ResolveGoogleAuth(res http.ResponseWriter, req *http.Request) {
	guser, err := gothic.CompleteUserAuth(res, req)
	if err != nil {
		panic(err)
	}

	_, err = repository.GetUserByEmail(req.Context(), guser.Email)
	if err == nil {
		res.Write([]byte("Email already registered"))
		return
	}
	user, err := repository.CreateUserGoogle(guser)
	if err != nil {
		panic(err)
	}

	activationCode, err := repository.CreateActivationCode(req.Context(), user.ID)
	if err != nil {
		res.Write([]byte("Failed to generate activation code"))
		return
	}

	message := fmt.Sprintf("Verify your account with this code %s", activationCode.Code)
	if err := SendEmail([]string{user.Email}, "Account Activation Verification Code", message); err != nil {
		res.Write([]byte("Failed to send email"))
		return
	}

	res.Write([]byte("Successfully registered"))
}

func BeginGoogleAuth(res http.ResponseWriter, req *http.Request) {
	gothic.BeginAuthHandler(res, req)
}

func ResolveForgotPasswordCode(ctx context.Context, user *model.User) (*model.User, error) {

	forgotPasswordCode, err := repository.CreateForgotPasswordCode(ctx, user.ID)
	if err != nil {
		return nil, err
	}

	message := fmt.Sprintf("Verify your email with this code %s", forgotPasswordCode.Code)
	if err := SendEmail([]string{user.Email}, "Forgot Password Verification Code", message); err != nil {
		return nil, err
	}

	return user, nil
}