package service

import (
	"context"
	"fmt"
	"server/graph/model"
	"server/repository"
	"server/tools"
	"strings"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

func Register(ctx context.Context, input model.RegisterUser) (interface{}, error) {
	
	var errValidation strings.Builder
	if input.Email == "" || input.Password == "" || input.FirstName == "" || input.LastName == "" {
		errValidation.WriteString("All field must be filled\n")
	}
	if !tools.ValidEmail(input.Email) {
		errValidation.WriteString("Email must be valid\n");
	}
	if len(input.Password) < 8 {
		errValidation.WriteString("Password must be 8 characters or more\n")
	}

	if errValidation.Len() > 0 {
		return nil, &gqlerror.Error{
			Message: errValidation.String(),
		}
	}

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

	var errValidation strings.Builder
	if input.Email == "" || input.Password == "" {
		errValidation.WriteString("All field must be filled\n")
	}

	if errValidation.Len() > 0 {
		return nil, &gqlerror.Error{
			Message: errValidation.String(),
		}
	}

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