import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ConnectModal from "../../../components/connect/ConnectModal";
import ProfileName from "../../../components/profile/ProfileName";
import ProfilePhoto from "../../../components/profile/profilePhoto/ProfilePhoto";
import ButtonSecondary from "../../../components/utilities/button/ButtonSecondary";
import Content from "../../../components/utilities/Content";
import { USER_PROFILE } from "../../../graphql/user";
import { useJwt } from "../../../hooks/useJwt";
import { User } from "../../../types/user";

const Wrapper = styled(Content)`
  justify-content: space-between;
  align-items: center;
  height: 20rem;
`;

function ProfileCard({ user }: { user: User }) {
  const { sub } = useJwt();
  const { data } = useQuery(USER_PROFILE, { variables: { id: user.id } });
  const [connectModalOpened, setConnectModalOpened] = useState(false);

  const openConnectModal = () => {
    setConnectModalOpened(true);
  };

  const closeConnectModal = () => {
    setConnectModalOpened(false);
  };

  if (data) {
    return (
      <Wrapper>
        <Link to={`/in/${data.user.id}`}>
          <ProfilePhoto
            user={data.user}
            size="extra-large"
          />
          <ProfileName
            user={data.user}
            align="center"
            withHeadline
            headlineLimit
          />
        </Link>
        <ButtonSecondary onClick={openConnectModal}>Connect</ButtonSecondary>
        {connectModalOpened && (
          <ConnectModal
            fromId={sub}
            toId={user.id}
            onClose={closeConnectModal}
          />
        )}
      </Wrapper>
    );
  }

  return <Wrapper></Wrapper>;
}

export default ProfileCard;
