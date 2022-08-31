package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"server/graph/generated"
	"server/graph/model"
	"server/repository"
)

// From is the resolver for the from field.
func (r *notificationResolver) From(ctx context.Context, obj *model.Notification) (*model.User, error) {
	return repository.GetUserByID(ctx, obj.FromID)
}

// To is the resolver for the to field.
func (r *notificationResolver) To(ctx context.Context, obj *model.Notification) (*model.User, error) {
	return repository.GetUserByID(ctx, obj.ToID)
}

// Create is the resolver for the create field.
func (r *notificationMutationResolver) Create(ctx context.Context, obj *model.NotificationMutation, input *model.CreateNotification) (*model.Notification, error) {
	return repository.CreateNotification(ctx, input)
}

// Notification returns generated.NotificationResolver implementation.
func (r *Resolver) Notification() generated.NotificationResolver { return &notificationResolver{r} }

// NotificationMutation returns generated.NotificationMutationResolver implementation.
func (r *Resolver) NotificationMutation() generated.NotificationMutationResolver {
	return &notificationMutationResolver{r}
}

type notificationResolver struct{ *Resolver }
type notificationMutationResolver struct{ *Resolver }
