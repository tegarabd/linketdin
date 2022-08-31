import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Content from "../../../components/utilities/Content";
import { USER_CONNECT_INVITATION, USER_PROFILE } from "../../../graphql/user";
import { useJwt } from "../../../hooks/useJwt";
import { ConnectInvitation as ConnectInvitationType } from "../../../types/connectInvitation";
import Invitation from "./Invitation";

function ConnectInvitation() {
  const { sub } = useJwt();
  const { data } = useQuery(USER_CONNECT_INVITATION, {
    variables: { id: sub },
  });

  return (
    <Content padding="1rem">
      <h3>Connect Invitation</h3>
      {data &&
        (data.user.invitations.length > 0 ? (
          data.user.invitations.map((invitation: ConnectInvitationType) => (
            <Invitation
              key={invitation.id}
              invitation={invitation}
            />
          ))
        ) : (
          <p>No connect invitation yet</p>
        ))}
    </Content>
  );
}

export default ConnectInvitation;
