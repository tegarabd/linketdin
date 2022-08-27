package repository

import (
	"context"
	"server/database"
	"server/graph/model"
	"strings"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func GetPostById(ctx context.Context, id string) (*model.Post, error) {
	db := database.GetDB()

	var post model.Post
	if err := db.Find(&post, "id = ?", id).Error; err != nil {
		return nil, err
	}

	return &post, nil
}

func GetPostsByText(ctx context.Context, query string, limit int, offset int) ([]*model.Post, error) {
	db := database.GetDB()

	var posts []*model.Post
	if err := db.Where("text ILIKE %?%", query).Limit(limit).Offset(offset).Find(&posts).Error; err != nil {
		return nil, err
	}

	return posts, nil
}

func GetPostsByTag(ctx context.Context, tag string, limit int, offset int) ([]*model.Post, error) {
	db := database.GetDB()

	var posts []*model.Post
	if err := db.Model(&model.Tag{Text: tag}).Limit(limit).Offset(offset).Association("Posts").Find(&posts); err != nil {
		return nil, err
	}

	return posts, nil
}

func GetPostFeed(ctx context.Context, userId string, limit int, offset int) ([]*model.Post, error) {
	db := database.GetDB()

	following, err := GetUserFollowing(ctx, &model.User{ID: userId})
	if err != nil {
		return nil, err
	}

	connection, err := GetUserConnections(ctx, &model.User{ID: userId})
	if err != nil {
		return nil, err
	}

	posterIds := make([]string, 0)
	for _, poster := range following {
		posterIds = append(posterIds, poster.ID)
	}
	for _, poster := range connection {
		posterIds = append(posterIds, poster.ID)
	}

	var postFeeds []*model.Post
	if err := db.Where("poster_id IN ?", posterIds).Limit(limit).Offset(offset).Order("created_at DESC").Find(&postFeeds).Error; err != nil {
		return nil, err
	}

	return postFeeds, nil
}

func GetPostComments(ctx context.Context, post *model.Post, limit int, offset int, all bool)  ([]*model.Comment, error) {
	db := database.GetDB()

	var comments []*model.Comment

	if all {
		if err := db.Model(&post).Limit(limit).Offset(offset).Association("Comments").Find(&comments); err != nil {
			return nil, err
		}

		return comments, nil
	} else {
		if err := db.Model(&post).Limit(limit).Offset(offset).Where("replied_to_id IS NULL").Association("Comments").Find(&comments); err != nil {
			return nil, err
		}

		return comments, nil
	}

	
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

func GetPostTags(ctx context.Context, post *model.Post)  ([]*model.Tag, error) {
	db := database.GetDB()

	var tags []*model.Tag
	if err := db.Model(&post).Association("Tags").Find(&tags); err != nil {
		return nil, err
	}

	return tags, nil
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

func AddPostTags(ctx context.Context, input *model.AddPostTags) (*model.Post, error) {
	db := database.GetDB()

	post, err := GetPostById(ctx, input.PostID)
	if err != nil {
		return nil, err
	}

	tags := strings.Split(input.Tags, "#")
	tags = tags[1:]

	var hashtags []*model.Tag

	for _, tag := range tags {
		hashtag, err := GetTagByText(ctx, tag)
		if err != nil && err == gorm.ErrRecordNotFound {
			hashtag, err := CreateTag(ctx, tag)
			if err != nil {
				return nil, err
			}
			hashtags = append(hashtags, hashtag)
		} else {
			hashtags = append(hashtags, hashtag)
		}
	}

	if err := db.Model(&post).Association("Tags").Append(hashtags); err != nil {
		return nil, err
	}

	return post, nil
}