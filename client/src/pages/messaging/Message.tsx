import { useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import ProfileName from "../../components/profile/ProfileName";
import ProfilePhoto from "../../components/profile/profilePhoto/ProfilePhoto";
import { USER_PROFILE } from "../../graphql/user";
import { Message as MessageType } from "../../types/message";

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Img = styled.img`
  margin-top: 0.5rem;
  height: 8rem;
  max-width: 100%;
  object-fit: cover;
`;

function Message({ message }: { message: MessageType }) {
  const { data } = useQuery(USER_PROFILE, {
    variables: { id: message.sender.id },
  });

  if (data) {
    return (
      <Wrapper>
        <ProfilePhoto
          user={data.user}
          size="large"
        />
        <div>
          <ProfileName user={data.user} />
          {message.imageUrl ? <Img src={message.imageUrl} /> : null}
          <p>{message.text}</p>
        </div>
      </Wrapper>
    );
  }

  return <Wrapper></Wrapper>;
}

export default Message;
