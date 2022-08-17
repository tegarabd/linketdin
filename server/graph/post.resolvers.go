package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"server/graph/generated"
	"server/graph/model"
)

// Poster is the resolver for the poster field.
func (r *postResolver) Poster(ctx context.Context, obj *model.Post) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Comments is the resolver for the comments field.
func (r *postResolver) Comments(ctx context.Context, obj *model.Post) ([]*model.Comment, error) {
	panic(fmt.Errorf("not implemented"))
}

// Sends is the resolver for the sends field.
func (r *postResolver) Sends(ctx context.Context, obj *model.Post) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Likes is the resolver for the likes field.
func (r *postResolver) Likes(ctx context.Context, obj *model.Post) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Create is the resolver for the create field.
func (r *postMutationResolver) Create(ctx context.Context, obj *model.PostMutation, input *model.CreatePost) (*model.Post, error) {
	panic(fmt.Errorf("not implemented"))
}

// Like is the resolver for the like field.
func (r *postMutationResolver) Like(ctx context.Context, obj *model.PostMutation, input *model.LikePost) (*model.Post, error) {
	panic(fmt.Errorf("not implemented"))
}

// Comment is the resolver for the comment field.
func (r *postMutationResolver) Comment(ctx context.Context, obj *model.PostMutation, input *model.CommentPost) (*model.Post, error) {
	panic(fmt.Errorf("not implemented"))
}

// Share is the resolver for the share field.
func (r *postMutationResolver) Share(ctx context.Context, obj *model.PostMutation, input *model.SharePost) (*model.Post, error) {
	panic(fmt.Errorf("not implemented"))
}

// Post returns generated.PostResolver implementation.
func (r *Resolver) Post() generated.PostResolver { return &postResolver{r} }

// PostMutation returns generated.PostMutationResolver implementation.
func (r *Resolver) PostMutation() generated.PostMutationResolver { return &postMutationResolver{r} }

type postResolver struct{ *Resolver }
type postMutationResolver struct{ *Resolver }
