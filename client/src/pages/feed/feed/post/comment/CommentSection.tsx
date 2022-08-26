import React from "react";
import styled from "styled-components";
import { Post } from "../../../../../types/post";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function CommentSection({ post }: { post: Post }) {
  return (
    <Wrapper>
      <CreateComment postId={post.id} />
      {post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} depth={1} />
      ))}
    </Wrapper>
  );
}

export default CommentSection;
