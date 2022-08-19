package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"server/graph/generated"
	"server/graph/model"
	"server/repository"
	"strings"
)

// Auth is the resolver for the auth field.
func (r *mutationResolver) Auth(ctx context.Context) (*model.AuthMutation, error) {
	return &model.AuthMutation{}, nil
}

// User is the resolver for the user field.
func (r *mutationResolver) User(ctx context.Context) (*model.UserMutation, error) {
	return &model.UserMutation{}, nil
}

// Post is the resolver for the post field.
func (r *mutationResolver) Post(ctx context.Context) (*model.PostMutation, error) {
	return &model.PostMutation{}, nil
}

// Notification is the resolver for the notification field.
func (r *mutationResolver) Notification(ctx context.Context) (*model.NotificationMutation, error) {
	return &model.NotificationMutation{}, nil
}

// Message is the resolver for the message field.
func (r *mutationResolver) Message(ctx context.Context) (*model.MessageMutation, error) {
	return &model.MessageMutation{}, nil
}

// Job is the resolver for the job field.
func (r *mutationResolver) Job(ctx context.Context) (*model.JobMutation, error) {
	return &model.JobMutation{}, nil
}

// Experience is the resolver for the experience field.
func (r *mutationResolver) Experience(ctx context.Context) (*model.ExperienceMutation, error) {
	return &model.ExperienceMutation{}, nil
}

// Education is the resolver for the education field.
func (r *mutationResolver) Education(ctx context.Context) (*model.EducationMutation, error) {
	return &model.EducationMutation{}, nil
}

// Connection is the resolver for the connection field.
func (r *mutationResolver) Connection(ctx context.Context) (*model.ConnectionMutation, error) {
	return &model.ConnectionMutation{}, nil
}

// Comment is the resolver for the comment field.
func (r *mutationResolver) Comment(ctx context.Context) (*model.CommentMutation, error) {
	return &model.CommentMutation{}, nil
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	return repository.GetUserByID(ctx, id)
}

// PostFeeds is the resolver for the postFeeds field.
func (r *queryResolver) PostFeeds(ctx context.Context, userID string, limit int, offset int) ([]*model.Post, error) {
	return repository.GetPostFeed(ctx, userID, limit, offset)
}

// SearchPost is the resolver for the searchPost field.
func (r *queryResolver) SearchPost(ctx context.Context, query string, limit int, offset int) ([]*model.Post, error) {
	if strings.HasPrefix(query, "#") {
		return repository.GetPostsByTag(ctx, query[1:], limit, offset)
	} else {
		return repository.GetPostsByText(ctx, query, limit, offset)
	}
}

// SearchUser is the resolver for the searchUser field.
func (r *queryResolver) SearchUser(ctx context.Context, query string, limit int, offset int) ([]*model.User, error) {
	return repository.GetUsersByName(ctx, query, limit, offset)
}

// SearchConnectedUser is the resolver for the searchConnectedUser field.
func (r *queryResolver) SearchConnectedUser(ctx context.Context, userID string, query string) ([]*model.User, error) {
	return repository.GetUserConnectionsByName(ctx, userID, query)
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
