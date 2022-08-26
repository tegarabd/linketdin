import { gql, useMutation, useQuery } from "@apollo/client";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import styled from "styled-components";
import InputCapsule from "../../../../../components/form/InputCapsule";
import ProfilePhoto from "../../../../../components/profile/profilePhoto/ProfilePhoto";
import { COMMENT_POST } from "../../../../../graphql/post";
import { USER_PROFILE } from "../../../../../graphql/user";
import { useJwt } from "../../../../../hooks/useJwt";

const Wrapper = styled.form`
  display: grid;
  grid-template-columns: 1.6rem auto;
  align-items: center;
  gap: 0.5rem;
`;

function CreateComment({
  postId,
  repliedToCommentId,
}: {
  postId: string;
  repliedToCommentId?: string;
}) {
  const { sub } = useJwt();
  const { data } = useQuery(USER_PROFILE, {
    variables: { id: sub },
  });

  const [text, setText] = useState("");
  const [comment] = useMutation(COMMENT_POST, {
    update(
      cache,
      {
        data: {
          post: { comment },
        },
      }
    ) {
      cache.modify({
        fields: {
          feeds(existingFeeds = []) {
            const newFeed = cache.writeFragment({
              data: comment,
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
          postId,
          repliedToCommentId,
        },
      },
    });

    setText("");
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      {data && <ProfilePhoto user={data.user} size="small" />}
      <InputCapsule
        value={text}
        onChange={handleChange}
        placeholder="Add a comment"
      />
    </Wrapper>
  );
}

export default CreateComment;
