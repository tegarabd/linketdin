package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"server/graph/generated"
	"server/graph/model"
	"server/repository"
)

// Post is the resolver for the post field.
func (r *commentResolver) Post(ctx context.Context, obj *model.Comment) (*model.Post, error) {
	return repository.GetPostById(ctx, obj.PostID)
}

// Commenter is the resolver for the commenter field.
func (r *commentResolver) Commenter(ctx context.Context, obj *model.Comment) (*model.User, error) {
	return repository.GetUserByID(ctx, obj.CommenterID)
}

// Likes is the resolver for the likes field.
func (r *commentResolver) Likes(ctx context.Context, obj *model.Comment) ([]*model.User, error) {
	return repository.GetCommentLikes(ctx, obj)
}

// RepliedTo is the resolver for the repliedTo field.
func (r *commentResolver) RepliedTo(ctx context.Context, obj *model.Comment) (*model.Comment, error) {
	return repository.GetCommentById(ctx, obj.RepliedToID)
}

// Like is the resolver for the like field.
func (r *commentMutationResolver) Like(ctx context.Context, obj *model.CommentMutation, input *model.LikeComment) (*model.Comment, error) {
	return repository.AddCommentLike(ctx, input)
}

// Comment returns generated.CommentResolver implementation.
func (r *Resolver) Comment() generated.CommentResolver { return &commentResolver{r} }

// CommentMutation returns generated.CommentMutationResolver implementation.
func (r *Resolver) CommentMutation() generated.CommentMutationResolver {
	return &commentMutationResolver{r}
}

type commentResolver struct{ *Resolver }
type commentMutationResolver struct{ *Resolver }
