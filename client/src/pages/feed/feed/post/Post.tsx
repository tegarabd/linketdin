import React from "react";
import styled from "styled-components";
import Content from "../../../../components/utilities/Content";
import { Post as PostType } from "../../../../types/post";
import ProfileSection from "./ProfileSection";

const Wrapper = styled(Content)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function Post({ post }: { post: PostType }) {
  return (
    <Wrapper>
      <ProfileSection poster={post.poster} />
      <p>{post.text}</p>
      {post.photoUrl && <img src={post.photoUrl} />}
      {post.videoUrl && <video src={post.videoUrl} muted autoPlay controls />}
      <p>{post.likes.length} likes</p>
      <p>{post.comments.length} comments</p>
      <p>{post.sends.length} sends</p>
    </Wrapper>
  );
}

export default Post;
