package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"server/graph/generated"
	"server/graph/model"
	"server/repository"

	"github.com/vektah/gqlparser/v2/gqlerror"
)

// Headline is the resolver for the headline field.
func (r *userResolver) Headline(ctx context.Context, obj *model.User) (*string, error) {
	return repository.GetUserHeadline(ctx, obj)
}

// ProfileViews is the resolver for the profileViews field.
func (r *userResolver) ProfileViews(ctx context.Context, obj *model.User) ([]*model.User, error) {
	return repository.GetUserProfileViews(ctx, obj)
}

// Experiences is the resolver for the experiences field.
func (r *userResolver) Experiences(ctx context.Context, obj *model.User) ([]*model.Experience, error) {
	return repository.GetUserExperiences(ctx, obj)
}

// Educations is the resolver for the educations field.
func (r *userResolver) Educations(ctx context.Context, obj *model.User) ([]*model.Education, error) {
	return repository.GetUserEducations(ctx, obj)
}

// Connections is the resolver for the connections field.
func (r *userResolver) Connections(ctx context.Context, obj *model.User) ([]*model.User, error) {
	return repository.GetUserConnections(ctx, obj)
}

// Followers is the resolver for the followers field.
func (r *userResolver) Followers(ctx context.Context, obj *model.User) ([]*model.User, error) {
	return repository.GetUserFollowers(ctx, obj)
}

// Following is the resolver for the following field.
func (r *userResolver) Following(ctx context.Context, obj *model.User) ([]*model.User, error) {
	return repository.GetUserFollowing(ctx, obj)
}

// Posts is the resolver for the posts field.
func (r *userResolver) Posts(ctx context.Context, obj *model.User) ([]*model.Post, error) {
	return repository.GetUserPosts(ctx, obj)
}

// Invitations is the resolver for the invitations field.
func (r *userResolver) Invitations(ctx context.Context, obj *model.User) ([]*model.ConnectInvitation, error) {
	return repository.GetUserInvitations(ctx, obj)
}

// Notifications is the resolver for the notifications field.
func (r *userResolver) Notifications(ctx context.Context, obj *model.User) ([]*model.Notification, error) {
	return repository.GetUserNotifications(ctx, obj)
}

// Messages is the resolver for the messages field.
func (r *userResolver) Messages(ctx context.Context, obj *model.User) ([]*model.Message, error) {
	return repository.GetUserMessages(ctx, obj)
}

// UserMightKnow is the resolver for the userMightKnow field.
func (r *userResolver) UserMightKnow(ctx context.Context, obj *model.User) ([]*model.User, error) {
	return repository.GetUserMightKnow(ctx, obj)
}

// Blocked is the resolver for the blocked field.
func (r *userResolver) Blocked(ctx context.Context, obj *model.User) ([]*model.User, error) {
	return repository.GetUserBlocked(ctx, obj)
}

// View is the resolver for the view field.
func (r *userMutationResolver) View(ctx context.Context, obj *model.UserMutation, input *model.ViewUser) (*model.User, error) {
	if input.ViewerID == input.ViewedUserID {
		return nil, &gqlerror.Error{
			Message: "Viewed self",
		}
	}
	return repository.ViewUser(ctx, input)
}

// Follow is the resolver for the follow field.
func (r *userMutationResolver) Follow(ctx context.Context, obj *model.UserMutation, input *model.FollowUser) (*model.User, error) {
	return repository.Follow(ctx, input)
}

// UnFollow is the resolver for the unFollow field.
func (r *userMutationResolver) UnFollow(ctx context.Context, obj *model.UserMutation, input *model.FollowUser) (*model.User, error) {
	return repository.UnFollow(ctx, input)
}

// Block is the resolver for the block field.
func (r *userMutationResolver) Block(ctx context.Context, obj *model.UserMutation, input *model.BlockUser) (*model.User, error) {
	return repository.Block(ctx, input)
}

// UnBlock is the resolver for the unBlock field.
func (r *userMutationResolver) UnBlock(ctx context.Context, obj *model.UserMutation, input *model.BlockUser) (*model.User, error) {
	return repository.UnBlock(ctx, input)
}

// Update is the resolver for the update field.
func (r *userMutationResolver) Update(ctx context.Context, obj *model.UserMutation, input *model.UpdateUser) (*model.User, error) {
	return repository.UpdateUser(ctx, input)
}

// UpdateProfilePhoto is the resolver for the updateProfilePhoto field.
func (r *userMutationResolver) UpdateProfilePhoto(ctx context.Context, obj *model.UserMutation, input *model.UpdateProfilePhoto) (*model.User, error) {
	return repository.UpdateUserProfilePhoto(ctx, input)
}

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

// UserMutation returns generated.UserMutationResolver implementation.
func (r *Resolver) UserMutation() generated.UserMutationResolver { return &userMutationResolver{r} }

type userResolver struct{ *Resolver }
type userMutationResolver struct{ *Resolver }
