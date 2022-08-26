import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import ProfileName from "../../../../../components/profile/ProfileName";
import ProfilePhoto from "../../../../../components/profile/profilePhoto/ProfilePhoto";
import { LIKE_COMMENT } from "../../../../../graphql/comment";
import { useJwt } from "../../../../../hooks/useJwt";
import { Comment as CommentType } from "../../../../../types/comment";
import { Post } from "../../../../../types/post";
import CreateComment from "./CreateComment";

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
`;

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  text-align: left;
`;

function Comment({ comment, depth }: { comment: CommentType; depth: number }) {
  const { sub } = useJwt();
  const [replyOpened, setReplyOpened] = useState(false);

  const [like] = useMutation(LIKE_COMMENT, {
    update(
      cache,
      {
        data: {
          comment: { like: post },
        },
      }
    ) {
      cache.modify({
        fields: {
          feeds(existingFeeds = []) {
            const newFeed = cache.writeFragment({
              data: post,
              fragment: gql`
                fragment CreatePost on Post {
                  id
                  comments {
                    replies
                  }
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
    like({
      variables: {
        input: {
          likerId: sub,
          commentId: comment.id,
        },
      },
    });
  };

  return (
    <Wrapper>
      <ProfilePhoto user={comment.commenter} size="small" />
      <Content>
        <Body>
          <ProfileName user={comment.commenter} />
          <p>{comment.text}</p>
        </Body>
        <ButtonGroup>
          <Button onClick={handleLike}>Like • {comment.likes.length}</Button>
          {depth < 2 && (
            <>
              |
              <Button onClick={() => setReplyOpened(true)}>
                Reply • {comment.replies.length}
              </Button>
            </>
          )}
        </ButtonGroup>
        {comment.replies?.map((reply) => (
          <Comment key={reply.id} comment={reply} depth={depth + 1} />
        ))}
        {replyOpened && (
          <CreateComment
            postId={comment.post.id}
            repliedToCommentId={comment.id}
          />
        )}
      </Content>
    </Wrapper>
  );
}

export default Comment;
