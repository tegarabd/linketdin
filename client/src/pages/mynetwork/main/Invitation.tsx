import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfileName from "../../../components/profile/ProfileName";
import ProfilePhoto from "../../../components/profile/profilePhoto/ProfilePhoto";
import ButtonPrimary from "../../../components/utilities/button/ButtonPrimary";
import ButtonSecondary from "../../../components/utilities/button/ButtonSecondary";
import {
  ACCEPT_CONNECT_INVITATION,
  REJECT_CONNECT_INVITATION,
} from "../../../graphql/invitation";
import { USER_CONNECT_INVITATION, USER_PROFILE } from "../../../graphql/user";
import { useJwt } from "../../../hooks/useJwt";
import { ConnectInvitation } from "../../../types/connectInvitation";

const Content = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Invitation({ invitation }: { invitation: ConnectInvitation }) {
  const { data } = useQuery(USER_PROFILE, {
    variables: { id: invitation.from.id },
  });
  const { sub } = useJwt();
  const [accept] = useMutation(ACCEPT_CONNECT_INVITATION, {
    refetchQueries: [
      { query: USER_CONNECT_INVITATION, variables: { id: sub } },
    ],
  });
  const [reject] = useMutation(REJECT_CONNECT_INVITATION, {
    refetchQueries: [
      { query: USER_CONNECT_INVITATION, variables: { id: sub } },
    ],
  });

  const handleAccept = () => {
    accept({ variables: { input: { invitationId: invitation.id } } });
  };

  const handleReject = () => {
    reject({ variables: { input: { invitationId: invitation.id } } });
  };

  return (
    <Wrapper>
      {data && (
        <Link to={`/in/${data.user.id}`}>
          <Content>
            <ProfilePhoto
              user={data.user}
              size="large"
            />
            <div>
              <ProfileName
                user={data.user}
                withHeadline
              />
              <p>
                <b>Note:</b> {invitation.note}
              </p>
            </div>
          </Content>
        </Link>
      )}
      <Content>
        <ButtonPrimary onClick={handleAccept}>Accept</ButtonPrimary>
        <ButtonSecondary onClick={handleReject}>Reject</ButtonSecondary>
      </Content>
    </Wrapper>
  );
}

export default Invitation;
