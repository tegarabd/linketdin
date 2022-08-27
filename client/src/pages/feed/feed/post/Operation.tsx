import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import ButtonTertiary from "../../../../components/utilities/button/ButtonTertiary";
import Line from "../../../../components/utilities/Line";
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
    refetchQueries: [{query: POST, variables: {postId: post.id}}]
  });

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
  };

  return (
    <Wrapper>
      <Line />
      <ButtonGroup>
        <ButtonTertiary onClick={likePost}>Like</ButtonTertiary>
        <ButtonTertiary onClick={showComment}>Comment</ButtonTertiary>
        <ButtonTertiary>Send</ButtonTertiary>
      </ButtonGroup>
      {commentShowed && <CommentSection postId={post.id} />}
    </Wrapper>
  );
}

export default Operation;
