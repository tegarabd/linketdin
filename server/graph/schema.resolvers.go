package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"server/graph/generated"
	"server/graph/model"
	"server/repository"
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

// Comments is the resolver for the comments field.
func (r *queryResolver) Comments(ctx context.Context) ([]*model.Comment, error) {
	panic(fmt.Errorf("not implemented"))
}

// ConnectInvitations is the resolver for the connectInvitations field.
func (r *queryResolver) ConnectInvitations(ctx context.Context) ([]*model.ConnectInvitation, error) {
	panic(fmt.Errorf("not implemented"))
}

// Educations is the resolver for the educations field.
func (r *queryResolver) Educations(ctx context.Context) ([]*model.Education, error) {
	panic(fmt.Errorf("not implemented"))
}

// Experiences is the resolver for the experiences field.
func (r *queryResolver) Experiences(ctx context.Context) ([]*model.Experience, error) {
	panic(fmt.Errorf("not implemented"))
}

// Jobs is the resolver for the jobs field.
func (r *queryResolver) Jobs(ctx context.Context) ([]*model.Job, error) {
	panic(fmt.Errorf("not implemented"))
}

// Messages is the resolver for the messages field.
func (r *queryResolver) Messages(ctx context.Context) ([]*model.Message, error) {
	panic(fmt.Errorf("not implemented"))
}

// Notifications is the resolver for the notifications field.
func (r *queryResolver) Notifications(ctx context.Context) ([]*model.Notification, error) {
	panic(fmt.Errorf("not implemented"))
}

// Posts is the resolver for the posts field.
func (r *queryResolver) Posts(ctx context.Context) ([]*model.Post, error) {
	panic(fmt.Errorf("not implemented"))
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	return repository.GetUsers(ctx)
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
