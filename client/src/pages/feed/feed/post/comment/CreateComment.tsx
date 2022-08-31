import { gql, useMutation, useQuery } from "@apollo/client";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import styled from "styled-components";
import InputCapsule from "../../../../../components/form/InputCapsule";
import ProfilePhoto from "../../../../../components/profile/profilePhoto/ProfilePhoto";
import { CREATE_NOTIFICATION } from "../../../../../graphql/notification";
import { COMMENT_POST, POST, POST_COMMENTS } from "../../../../../graphql/post";
import { USER_PROFILE } from "../../../../../graphql/user";
import { useJwt } from "../../../../../hooks/useJwt";
import { Post } from "../../../../../types/post";

const Wrapper = styled.form`
  display: grid;
  grid-template-columns: 1.6rem auto;
  align-items: center;
  gap: 0.5rem;
`;

function CreateComment({
  post,
  repliedToCommentId,
}: {
  post: Post;
  repliedToCommentId?: string;
}) {
  const { sub } = useJwt();
  const { data } = useQuery(USER_PROFILE, {
    variables: { id: sub },
  });

  const [text, setText] = useState("");
  const [comment] = useMutation(COMMENT_POST, {
    refetchQueries: [
      {
        query: POST,
        variables: { postId: post.id },
      },
      {
        query: POST_COMMENTS,
        variables: { postId: post.id, limit: -1, offset: 0 },
      },
    ],
  });
  const [createNotification] = useMutation(CREATE_NOTIFICATION);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (text === "") return;

    comment({
      variables: {
        input: {
          commenterId: sub,
          text,
          postId: post.id,
          repliedToCommentId,
        },
      },
    });

    createNotification({
      variables: {
        input: {
          fromId: sub,
          toId: post.poster.id,
          text: `commented on your post: "${text}"`,
        },
      },
    });

    setText("");
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      {data && (
        <ProfilePhoto
          user={data.user}
          size="small"
        />
      )}
      <InputCapsule
        value={text}
        onChange={handleChange}
        placeholder="Add a comment"
      />
    </Wrapper>
  );
}

export default CreateComment;
