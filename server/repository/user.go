package repository

import (
	"context"
	"server/database"
	"server/graph/model"
	"server/tools"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

func CreateUser(ctx context.Context, input model.RegisterUser) (*model.User, error) {
	db := database.GetDB()

	input.Password = tools.HashPassword(input.Password)
	input.Email = strings.ToLower(input.Email)

	user := model.User{
		ID:       uuid.New().String(),
		FirstName: input.FirstName,
		LastName: input.LastName,
		Email:    input.Email,
		Password: input.Password,
	}

	if err := db.Model(user).Create(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func GetUsers(ctx context.Context) ([]*model.User, error) {
	db := database.GetDB()

	users := []*model.User{}
	
	if err := db.Find(&users).Error; err != nil {
		return nil, err
	}

	return users, nil
}

func GetUserByID(ctx context.Context, id string) (*model.User, error) {
	db := database.GetDB()

	user := model.User{}
	if err := db.First(&user, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func GetUsersByName(ctx context.Context, query string, limit int, offset int) ([]*model.User, error) {
	db := database.GetDB()

	users := []*model.User{}
	
	if err := db.
		Where("first_name LIKE %?%", query).
		Or("last_name LIKE %?%", query).
		Or("additional_name LIKE %?%", query).
		Limit(limit).
		Offset(offset).
		Find(&users).Error; err != nil {
		return nil, err
	}

	return users, nil
}

func GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	db := database.GetDB()

	user := model.User{}
	if err := db.Where("email LIKE ?", email).First(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func GetUserExperiences(ctx context.Context, user *model.User) ([]*model.Experience, error) {
	db := database.GetDB()

	experiences := []*model.Experience{}
	if err := db.Model(&user).Association("Experiences").Find(&experiences); err != nil {
		return nil, err
	}

	return experiences, nil
}

func GetUserEducations(ctx context.Context, user *model.User) ([]*model.Education, error) {
	db := database.GetDB()

	educations := []*model.Education{}
	if err := db.Model(&user).Association("Educations").Find(&educations); err != nil {
		return nil, err
	}

	return educations, nil
}

func GetUserConnections(ctx context.Context, user *model.User) ([]*model.User, error) {
	db := database.GetDB()

	connections := []*model.User{}
	if err := db.Raw(
		"SELECT * FROM user_connections uc JOIN users u ON uc.connection_id = u.id WHERE user_id = ? " +
		"UNION " +
		"SELECT * FROM user_connections uc JOIN users u ON uc.user_id = u.id WHERE connection_id = ?", user.ID, user.ID).Find(&connections).Error; err != nil {
		return nil, err
	}

	return connections, nil
}

func GetUserConnectionsByName(ctx context.Context, userId string, query string) ([]*model.User, error) {
	db := database.GetDB()

	connections := []*model.User{}
	if err := db.Raw(
		"SELECT * FROM user_connections uc JOIN users u ON uc.connection_id = u.id WHERE user_id = ? " +
		"AND (u.first_name ILIKE '%?%' OR u.last_name ILIKE '%?%' OR u.additional_name ILIKE '%?%') " +
		"UNION " +
		"SELECT * FROM user_connections uc JOIN users u ON uc.user_id = u.id WHERE connection_id = ? " +
		"AND (u.first_name ILIKE '%?%' OR u.last_name ILIKE '%?%' OR u.additional_name ILIKE '%?%')", userId, query, query, query, userId, query, query, query).Find(&connections).Error; err != nil {
		return nil, err
	}

	return connections, nil
}


func GetUserFollowing(ctx context.Context, user *model.User) ([]*model.User, error) {
	db := database.GetDB()

	following := []*model.User{}
	if err := db.Model(&user).Association("Following").Find(&following); err != nil {
		return nil, err
	}

	return following, nil
}

func GetUserFollowers(ctx context.Context, user *model.User) ([]*model.User, error) {
	db := database.GetDB()

	followers := []*model.User{}
	if err := db.Raw("SELECT * FROM user_follow uf JOIN users u ON uf.user_id = u.id WHERE following_id = ?", user.ID).Find(&followers).Error; err != nil {
		return nil, err
	}

	return followers, nil
}

func GetUserPosts(ctx context.Context, user *model.User) ([]*model.Post, error) {
	db := database.GetDB()

	posts := []*model.Post{}
	if err := db.Model(&user).Association("Posts").Find(&posts); err != nil {
		return nil, err
	}

	return posts, nil
}

func GetUserInvitations(ctx context.Context, user *model.User) ([]*model.ConnectInvitation, error) {
	db := database.GetDB()

	invitations := []*model.ConnectInvitation{}
	if err := db.Model(&user).Association("Invitations").Find(&invitations); err != nil {
		return nil, err
	}

	return invitations, nil
}

func GetUserNotifications(ctx context.Context, user *model.User) ([]*model.Notification, error) {
	db := database.GetDB()

	notifications := []*model.Notification{}
	if err := db.Model(&user).Association("Notifications").Find(&notifications); err != nil {
		return nil, err
	}

	return notifications, nil
}

func GetUserMessages(ctx context.Context, user *model.User) ([]*model.Message, error) {
	db := database.GetDB()

	messages := []*model.Message{}
	if err := db.Model(&user).Association("Messages").Find(&messages); err != nil {
		return nil, err
	}

	return messages, nil
}

func GetUserMightKnow(ctx context.Context, user *model.User) ([]*model.User, error) {
	db := database.GetDB()

	connections, err := GetUserConnections(ctx, user)
	if err != nil {
		return nil, err
	}

	connectionIds := make([]string, 0)
	for _, connection := range connections {
		connectionIds = append(connectionIds, connection.ID)
	}
	
	mightKnow := []*model.User{}
	if err := db.Raw("SELECT * FROM user_connections uc JOIN users u ON uc.connection_id = u.id WHERE uc.user_id IN ? AND uc.connection_id <> ?", connectionIds, user.ID).Find(&mightKnow).Error; err != nil {
		return nil, err
	}

	return mightKnow, nil
}

func ViewUser(ctx context.Context, id string) (*model.User, error) {
	db := database.GetDB()

	user, err := GetUserByID(ctx, id)
	if err != nil {
		return nil, err
	}

	if err := db.Model(&user).Update("profile_views", gorm.Expr("profile_views + ?", 1)).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func UpdateUser(ctx context.Context, input *model.UpdateUser) (*model.User, error) {
	db := database.GetDB()

	user, err := GetUserByID(ctx, input.UserID)
	if err != nil {
		return nil, err
	}

	if err := db.Model(&user).Updates(input).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func CreateActivationCode(ctx context.Context, userId string) (*model.ActivationCode, error) {
	db := database.GetDB()

	activationCode := model.ActivationCode{
		ID: uuid.NewString(),
		UserID:    userId,
		Code:      tools.GenerateCode(),
		ExpiredAt: time.Now().Add(time.Hour),
	}

	if err := db.Create(&activationCode).Error; err != nil {
		return nil, err
	}

	return &activationCode, nil
}

func VerifyActivationCode(ctx context.Context, input *model.ActivateUser) (*model.User, error) {
	db := database.GetDB()

	var user model.User
	if err := db.Model(&model.User{ID: input.ID}).Preload("ActivationCode").Find(&user).Error; err != nil {
		return nil, err
	}

	if user.ActivationCode.Code == ""  {
		return nil, &gqlerror.Error{
			Message:    "No activation request yet",
		}
	}

	if user.ActivationCode.ExpiredAt.Before(time.Now()) {
		return nil, &gqlerror.Error{
			Message:    "Code has been expired",
		}
	}

	if user.ActivationCode.Code != input.Code {
		return nil, &gqlerror.Error{
			Message:    "Code does not match",
		}
	}
	
	if err := db.Model(&user).Update("is_active", true).Error; err != nil {
		return nil, err
	}

	if err := db.Model(&user).Association("ActivationCode").Clear(); err != nil {
		return nil, err
	}

	return &user, nil
}

func CreateForgotPasswordCode(ctx context.Context, userId string) (*model.ResetPasswordCode, error) {
	db := database.GetDB()

	ForgotPasswordCode := model.ResetPasswordCode{
		ID: uuid.NewString(),
		UserID:    userId,
		Code:      tools.GenerateCode(),
		ExpiredAt: time.Now().Add(time.Hour),
	}

	if err := db.Create(&ForgotPasswordCode).Error; err != nil {
		return nil, err
	}

	return &ForgotPasswordCode, nil
}

func VerifyForgotPasswordCode(ctx context.Context, input *model.ForgotPasswordCode) (*model.User, error) {
	db := database.GetDB()

	var user model.User
	if err := db.Model(&model.User{ID: input.ID}).Preload("PasswordCode").Find(&user).Error; err != nil {
		return nil, err
	}

	if user.ResetPasswordCode.Code == ""  {
		return nil, &gqlerror.Error{
			Message:    "No reset password request yet",
		}
	}

	if user.ResetPasswordCode.ExpiredAt.Before(time.Now()) {
		return nil, &gqlerror.Error{
			Message:    "Code has been expired",
		}
	}

	if user.ResetPasswordCode.Code != input.Code {
		return nil, &gqlerror.Error{
			Message:    "Code does not match",
		}
	}

	if err := db.Model(&user).Association("ResetPasswordCode").Clear(); err != nil {
		return nil, err
	}

	return &user, nil
}

func ResetPassword(ctx context.Context, input *model.ResetPassword) (*model.User, error) {
	db := database.GetDB()

	if input.ConfirmPassword != input.Password {
		return nil, &gqlerror.Error{
			Message:    "Password does not match",
		}
	}

	input.Password = tools.HashPassword(input.Password)

	user, err := GetUserByID(ctx, input.UserID)
	if err != nil {
		return nil, err
	}

	if err := db.Model(&user).Update("password", input.Password).Error; err != nil {
		return nil, err
	}

	return user, nil
}

func Follow(ctx context.Context, input *model.FollowUser) (*model.User, error) {
	db := database.GetDB()

	user, err := GetUserByID(ctx, input.UserID)
	if err != nil {
		return nil, err
	}

	if err := db.Model(&user).Association("Following").Append(&model.User{ID: input.FollowingID}); err != nil {
		return nil, err
	}

	return user, nil
}

func UnFollow(ctx context.Context, input *model.FollowUser) (*model.User, error) {
	db := database.GetDB()

	user, err := GetUserByID(ctx, input.UserID)
	if err != nil {
		return nil, err
	}

	if err := db.Model(&user).Association("Following").Delete(&model.User{ID: input.FollowingID}); err != nil {
		return nil, err
	}

	return user, nil
}