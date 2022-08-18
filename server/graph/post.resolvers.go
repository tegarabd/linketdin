package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"server/graph/generated"
	"server/graph/model"
	"server/repository"
)

// Poster is the resolver for the poster field.
func (r *postResolver) Poster(ctx context.Context, obj *model.Post) (*model.User, error) {
	return repository.GetUserByID(ctx, obj.PosterID)
}

// Comments is the resolver for the comments field.
func (r *postResolver) Comments(ctx context.Context, obj *model.Post, offset int, limit int) ([]*model.Comment, error) {
	return repository.GetPostComments(ctx, obj, limit, offset)
}

// Sends is the resolver for the sends field.
func (r *postResolver) Sends(ctx context.Context, obj *model.Post) ([]*model.User, error) {
	return repository.GetPostSends(ctx, obj)
}

// Likes is the resolver for the likes field.
func (r *postResolver) Likes(ctx context.Context, obj *model.Post) ([]*model.User, error) {
	return repository.GetPostLikes(ctx, obj)
}

// Tags is the resolver for the tags field.
func (r *postResolver) Tags(ctx context.Context, obj *model.Post) ([]*model.Tag, error) {
	return repository.GetPostTags(ctx, obj)
}

// Create is the resolver for the create field.
func (r *postMutationResolver) Create(ctx context.Context, obj *model.PostMutation, input *model.CreatePost) (*model.Post, error) {
	return repository.CreatePost(ctx, input)
}

// AddTags is the resolver for the addTags field.
func (r *postMutationResolver) AddTags(ctx context.Context, obj *model.PostMutation, input *model.AddPostTags) (*model.Post, error) {
	return repository.AddPostTags(ctx, input)
}

// Like is the resolver for the like field.
func (r *postMutationResolver) Like(ctx context.Context, obj *model.PostMutation, input *model.LikePost) (*model.Post, error) {
	return repository.AddPostLike(ctx, input)
}

// Comment is the resolver for the comment field.
func (r *postMutationResolver) Comment(ctx context.Context, obj *model.PostMutation, input *model.CommentPost) (*model.Post, error) {
	return repository.AddPostComment(ctx, input)
}

// Share is the resolver for the share field.
func (r *postMutationResolver) Share(ctx context.Context, obj *model.PostMutation, input *model.SharePost) (*model.Post, error) {
	return repository.AddPostSend(ctx, input)
}

// Post returns generated.PostResolver implementation.
func (r *Resolver) Post() generated.PostResolver { return &postResolver{r} }

// PostMutation returns generated.PostMutationResolver implementation.
func (r *Resolver) PostMutation() generated.PostMutationResolver { return &postMutationResolver{r} }

type postResolver struct{ *Resolver }
type postMutationResolver struct{ *Resolver }
