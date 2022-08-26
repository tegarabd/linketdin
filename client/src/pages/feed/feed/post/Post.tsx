import React, { useState } from "react";
import styled from "styled-components";
import Content from "../../../../components/utilities/Content";
import Line from "../../../../components/utilities/Line";
import { Post as PostType } from "../../../../types/post";
import ProfileSection from "./ProfileSection";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import SendButton from "./SendButton";
import CommentSection from "./comment/CommentSection";

const Wrapper = styled(Content)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
`;

const Padding = styled.div`
  padding: 0.8rem;
`;

const Counter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.1rem;
`;

function Post({ post }: { post: PostType }) {
  const [commentOpened, setCommentOpened] = useState(false);

  return (
    <Wrapper>
      <Padding>
        <ProfileSection poster={post.poster} />
        <p>{post.text}</p>
      </Padding>
      {post.photoUrl && <img src={post.photoUrl} />}
      {post.videoUrl && <video src={post.videoUrl} muted autoPlay controls />}
      <Padding>
        <Counter>
          <p>{post.likes.length} likes</p>
          <p>
            {post.comments.length} comments • {post.sends.length} sends
          </p>
        </Counter>
        <Line />
        <ButtonGroup>
          <LikeButton post={post} />
          <CommentButton onClick={() => setCommentOpened(true)} />
          <SendButton />
        </ButtonGroup>
        {commentOpened && (
          <>
            <Line />
            <CommentSection post={post} />
          </>
        )}
      </Padding>
    </Wrapper>
  );
}

export default Post;
