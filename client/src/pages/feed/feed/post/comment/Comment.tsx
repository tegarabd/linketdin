import { useState } from "react";
import styled from "styled-components";
import ProfileName from "../../../../../components/profile/ProfileName";
import ProfilePhoto from "../../../../../components/profile/profilePhoto/ProfilePhoto";
import { Comment as CommentType } from "../../../../../types/comment";
import { Post } from "../../../../../types/post";
import Counter from "./Counter";
import CreateComment from "./CreateComment";
import Replies from "./Replies";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1.6rem auto;
  gap: 0.5rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Body = styled.div`
  background-color: ${(props) => props.theme.shadow};
  padding: 0.5rem;
  border-radius: 0.5rem;
  border-top-left-radius: 0;
  display: flex;
  flex-direction: column;
`;

function Comment({ comment, post }: { comment: CommentType; post: Post }) {
  const [createReplyShowed, setCreateReplyShowed] = useState(false);

  const showCreateReply = () => {
    setCreateReplyShowed(true);
  };

  return (
    <Wrapper>
      <ProfilePhoto
        user={comment.commenter}
        size="small"
      />
      <Content>
        <Body>
          <ProfileName user={comment.commenter} />
          <p>{comment.text}</p>
        </Body>
        <Counter
          commentId={comment.id}
          onReplyButtonClicked={showCreateReply}
        />
        <Replies
          commentId={comment.id}
          post={post}
        />
        {createReplyShowed && (
          <CreateComment
            post={post}
            repliedToCommentId={comment.id}
          />
        )}
      </Content>
    </Wrapper>
  );
}

export default Comment;
