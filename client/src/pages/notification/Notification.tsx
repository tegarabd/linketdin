import { useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import ProfilePhoto from "../../components/profile/profilePhoto/ProfilePhoto";
import { USER_PROFILE } from "../../graphql/user";
import { useJwt } from "../../hooks/useJwt";
import { Notification as NotificationType } from "../../types/notification";

const Wrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.shadow};
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function Notification({ notification }: { notification: NotificationType }) {
  const { sub } = useJwt();
  const { data: fromUserData } = useQuery(USER_PROFILE, {
    variables: { id: notification.from.id },
  });
  const { data: toUserData } = useQuery(USER_PROFILE, {
    variables: { id: notification.to.id },
  });

  const fromSelf = sub === notification.from.id;

  if (fromSelf && notification.to.id === "admin") return <></>;

  if (fromUserData && toUserData) {
    return (
      <Wrapper>
        <ProfilePhoto
          user={fromSelf ? toUserData.user : fromUserData.user}
          size="large"
        />
        {fromSelf ? (
          <p>
            <b>You</b>{" "}
            {notification.text
              .replace(
                "your",
                `${toUserData.user.firstName} ${toUserData.user.lastName}'s`
              )
              .replace(
                "you",
                `${toUserData.user.firstName} ${toUserData.user.lastName}`
              )}
          </p>
        ) : (
          <p>
            <b>
              {fromUserData.user.firstName} {fromUserData.user.lastName}{" "}
            </b>
            {notification.text}
          </p>
        )}
      </Wrapper>
    );
  }

  return <Wrapper>Loading</Wrapper>;
}

export default Notification;
