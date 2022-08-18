package repository

import (
	"context"
	"server/database"
	"server/graph/model"

	"github.com/google/uuid"
)

func GetPostById(ctx context.Context, id string) (*model.Post, error) {
	db := database.GetDB()

	var post model.Post
	if err := db.Find(&post, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return &post, nil
}

func GetPostFeed(ctx context.Context, input *model.PostFeed) ([]*model.Post, error) {
	db := database.GetDB()

	following, err := GetUserFollowing(ctx, &model.User{ID: input.UserID})
	if err != nil {
		return nil, err
	}

	connection, err := GetUserConnections(ctx, &model.User{ID: input.UserID})
	if err != nil {
		return nil, err
	}

	var posterIds []string
	for _, poster := range following {
		posterIds = append(posterIds, poster.ID)
	}
	for _, poster := range connection {
		posterIds = append(posterIds, poster.ID)
	}

	var postFeeds []*model.Post
	if err := db.Where("poster_id IN ?", &posterIds).Limit(input.Limit).Offset(input.Offset).Find(&postFeeds).Error; err != nil {
		return nil, err
	}

	return postFeeds, nil
}

func GetPostComments(ctx context.Context, post *model.Post)  ([]*model.Comment, error) {
	db := database.GetDB()

	var comments []*model.Comment
	if err := db.Model(&post).Association("Comments").Find(&comments); err != nil {
		return nil, err
	}

	return comments, nil
}

func GetPostSends(ctx context.Context, post *model.Post)  ([]*model.User, error) {
	db := database.GetDB()

	var sends []*model.User
	if err := db.Model(&post).Association("Sends").Find(&sends); err != nil {
		return nil, err
	}

	return sends, nil
}

func GetPostLikes(ctx context.Context, post *model.Post)  ([]*model.User, error) {
	db := database.GetDB()

	var likes []*model.User
	if err := db.Model(&post).Association("Likes").Find(&likes); err != nil {
		return nil, err
	}

	return likes, nil
}

func CreatePost(ctx context.Context, input *model.CreatePost) (*model.Post, error) {
	db := database.GetDB()

	post := model.Post{
		ID:       uuid.NewString(),
		PosterID: input.PosterID,
		Text:     input.Text,
		PhotoURL: input.PhotoURL,
		VideoURL: input.VideoURL,
	}

	if err := db.Create(&post).Error; err != nil {
		return nil, err
	}

	return &post, nil
}

func AddPostLike(ctx context.Context, input *model.LikePost) (*model.Post, error) {
	db := database.GetDB()

	post, err := GetPostById(ctx, input.PostID)
	if err != nil {
		return nil, err
	}

	if err := db.Model(&post).Association("Likes").Append(&model.User{ID: input.LikerID}); err != nil {
		return nil, err
	}

	return post, nil
}

func AddPostComment(ctx context.Context, input *model.CommentPost) (*model.Post, error) {
	db := database.GetDB()

	post, err := GetPostById(ctx, input.PostID)
	if err != nil {
		return nil, err
	}

	comment, err := CreateComment(ctx, input)
	if err != nil {
		return nil, err
	}

	if err := db.Model(&post).Association("Comments").Append(&comment); err != nil {
		return nil, err
	}

	return post, nil
}

func AddPostSend(ctx context.Context, input *model.SharePost) (*model.Post, error) {
	db := database.GetDB()

	post, err := GetPostById(ctx, input.PostID)
	if err != nil {
		return nil, err
	}

	send, err := GetUserByID(ctx, input.SourceID)
	if err != nil {
		return nil, err
	}

	if err := db.Model(&post).Association("Sends").Append(&send); err != nil {
		return nil, err
	}

	return post, err
}