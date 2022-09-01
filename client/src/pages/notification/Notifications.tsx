import { useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import Content from "../../components/utilities/Content";
import { USER_NOTIFICATIONS } from "../../graphql/user";
import { useJwt } from "../../hooks/useJwt";
import { Notification as NotificationType } from "../../types/notification";
import Notification from "./Notification";

const Wrapper = styled(Content)`
  padding: 0;

  & > p {
    padding: 0.5rem;
  }
`;

function Notifications() {
  const { sub } = useJwt();
  const { data } = useQuery(USER_NOTIFICATIONS, { variables: { id: sub } });

  return (
    <Wrapper>
      {data &&
        (data.user.notifications.length > 0 ? (
          data.user.notifications.map((notification: NotificationType) => (
            <Notification
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <p>No notification yet</p>
        ))}
    </Wrapper>
  );
}

export default Notifications;
