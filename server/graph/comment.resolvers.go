package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"server/graph/generated"
	"server/graph/model"
)

// Post is the resolver for the post field.
func (r *commentResolver) Post(ctx context.Context, obj *model.Comment) (*model.Post, error) {
	panic(fmt.Errorf("not implemented"))
}

// Commenter is the resolver for the commenter field.
func (r *commentResolver) Commenter(ctx context.Context, obj *model.Comment) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Likes is the resolver for the likes field.
func (r *commentResolver) Likes(ctx context.Context, obj *model.Comment) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// RepliedTo is the resolver for the repliedTo field.
func (r *commentResolver) RepliedTo(ctx context.Context, obj *model.Comment) (*model.Comment, error) {
	panic(fmt.Errorf("not implemented"))
}

// Like is the resolver for the like field.
func (r *commentMutationResolver) Like(ctx context.Context, obj *model.CommentMutation, input *model.LikeComment) (*model.Comment, error) {
	panic(fmt.Errorf("not implemented"))
}

// Comment returns generated.CommentResolver implementation.
func (r *Resolver) Comment() generated.CommentResolver { return &commentResolver{r} }

// CommentMutation returns generated.CommentMutationResolver implementation.
func (r *Resolver) CommentMutation() generated.CommentMutationResolver {
	return &commentMutationResolver{r}
}

type commentResolver struct{ *Resolver }
type commentMutationResolver struct{ *Resolver }
