package directives

import (
	"context"
	"server/middleware"
	"server/repository"

	"github.com/99designs/gqlgen/graphql"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func Authenticated(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
	claims := middleware.CtxValue(ctx)
	if claims == nil {
		return nil, &gqlerror.Error{
			Message: "Access Denied",
		}
	}

	return next(ctx)
}

func NotAuthenticated(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
	claims := middleware.CtxValue(ctx)
	if claims != nil {
		_, err := repository.GetUserByID(ctx, claims.UserID)
		if err == nil {
			return nil, &gqlerror.Error{
				Message: "Already authenticated",
			}
		}
	}

	return next(ctx)
}