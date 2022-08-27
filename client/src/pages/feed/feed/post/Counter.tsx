import { useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { POST } from "../../../../graphql/post";
import { Post } from "../../../../types/post";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 500;
`;

function Counter({ post }: { post: Post }) {
  const { data } = useQuery(POST, {
    variables: { postId: post.id },
  });

  return (
    <Wrapper>
      <p>{data && data.post.likes.length} likes</p>
      <p>{data && data.post.comments.length} comments</p>
    </Wrapper>
  );
}

export default Counter;
