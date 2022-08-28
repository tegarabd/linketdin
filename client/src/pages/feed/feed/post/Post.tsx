import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Content from "../../../../components/utilities/Content";
import { Post as PostType } from "../../../../types/post";
import Counter from "./Counter";
import Operation from "./Operation";
import Profile from "./Profile";

const Wrapper = styled(Content)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
`;

const Padding = styled.div`
  padding: 0.8rem;
`;

function Post({ post }: { post: PostType }) {
  return (
    <Wrapper>
      <Padding>
        <Link to={`/in/${post.poster.id}`} >
          <Profile poster={post.poster} />
        </Link>
        <p>{post.text}</p>
      </Padding>
      {post.photoUrl && <img src={post.photoUrl} />}
      {post.videoUrl && <video src={post.videoUrl} muted autoPlay controls />}
      <Padding>
        <Counter post={post} />
        <Operation post={post} />
      </Padding>
    </Wrapper>
  );
}

export default Post;
