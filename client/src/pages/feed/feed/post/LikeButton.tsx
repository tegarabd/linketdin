import React from "react";
import ButtonTertiary from "../../../../components/utilities/button/ButtonTertiary";
import { ReactComponent as LikeIcon } from "../../../../assets/like-icon.svg";
import { gql, useMutation } from "@apollo/client";
import { LIKE_POST } from "../../../../graphql/post";
import { FEEDS } from "../../../../graphql/feed";
import { useJwt } from "../../../../hooks/useJwt";
import { Post } from "../../../../types/post";
import styled from "styled-components";

function LikeButton({ post }: { post: Post }) {
  const { sub } = useJwt();
  const [like] = useMutation(LIKE_POST, {
    update(
      cache,
      {
        data: {
          post: { like },
        },
      }
    ) {
      cache.modify({
        fields: {
          feeds(existingFeeds = []) {
            const newFeed = cache.writeFragment({
              data: like,
              fragment: gql`
                fragment CreatePost on Post {
                  id
                  likes
                }
              `,
            });
            return [...existingFeeds, newFeed];
          },
        },
      });
    },
  });

  const handleLike = () => {
    like({ variables: { input: { likerId: sub, postId: post.id } } });
  };

  const userAlreadyLike =
    post.likes.filter((like) => like.id === sub)[0] !== undefined;

  return (
    <ButtonTertiary disabled={userAlreadyLike} onClick={handleLike}>
      {userAlreadyLike ? (
        <>
          <img src="https://static-exp1.licdn.com/sc/h/8vyvvt5vs3w5llt6g8ld43xlu" />
          Liked
        </>
      ) : (
        <>
          <LikeIcon />
          Like
        </>
      )}
    </ButtonTertiary>
  );
}

export default LikeButton;
