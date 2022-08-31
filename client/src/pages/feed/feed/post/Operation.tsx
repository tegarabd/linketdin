import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import ButtonTertiary from "../../../../components/utilities/button/ButtonTertiary";
import Line from "../../../../components/utilities/Line";
import { CREATE_NOTIFICATION } from "../../../../graphql/notification";
import { LIKE_POST, POST } from "../../../../graphql/post";
import { useJwt } from "../../../../hooks/useJwt";
import { Post } from "../../../../types/post";
import CommentSection from "./comment/CommentSection";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.2rem;
`;

function Operation({ post }: { post: Post }) {
  const { sub } = useJwt();
  const [commentShowed, setCommentShowed] = useState(false);
  const [like] = useMutation(LIKE_POST, {
    refetchQueries: [{ query: POST, variables: { postId: post.id } }],
  });
  const [createNotification] = useMutation(CREATE_NOTIFICATION);

  const showComment = () => {
    setCommentShowed(true);
  };

  const likePost = () => {
    like({
      variables: {
        input: {
          likerId: sub,
          postId: post.id,
        },
      },
    });

    createNotification({
      variables: {
        input: {
          fromId: sub,
          toId: post.poster.id,
          text: "liked your post",
        },
      },
    });
  };

  return (
    <Wrapper>
      <Line />
      <ButtonGroup>
        <ButtonTertiary onClick={likePost}>Like</ButtonTertiary>
        <ButtonTertiary onClick={showComment}>Comment</ButtonTertiary>
        <ButtonTertiary>Send</ButtonTertiary>
      </ButtonGroup>
      {commentShowed && <CommentSection post={post} />}
    </Wrapper>
  );
}

export default Operation;
