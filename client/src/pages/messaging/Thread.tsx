import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfileName from "../../components/profile/ProfileName";
import ProfilePhoto from "../../components/profile/profilePhoto/ProfilePhoto";
import { USER_PROFILE } from "../../graphql/user";
import { useJwt } from "../../hooks/useJwt";
import { Thread as ThreadType } from "../../types/thread";

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

function Thread({ thread }: { thread: ThreadType }) {
  const { sub } = useJwt();
  const receiverId = thread.user.id === sub ? thread.with.id : thread.user.id;
  const { data } = useQuery(USER_PROFILE, { variables: { id: receiverId } });

  if (data) {
    return (
      <Link to={`thread/${thread.id}`}>
        <Wrapper>
          <ProfilePhoto
            user={data.user}
            size="large"
          />
          <div>
            <ProfileName user={data.user} />
            <p>
              {thread.lastMessage.sender.id === sub
                ? "You:"
                : "Them:"}{" "}
              {thread.lastMessage.text.substring(0, 12)}...
            </p>
          </div>
        </Wrapper>
      </Link>
    );
  }

  return <Link to={`thread/${thread.id}`}></Link>;
}

export default Thread;
