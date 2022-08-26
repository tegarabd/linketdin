import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { UserProfile } from ".";
import RingLink from "../../utilities/link/RingLink";
import Line from "../../utilities/Line";
import ButtonBlur from "../../utilities/button/ButtonBlur";
import { useAuthentication } from "../../../providers/AuthenticationContextProvider";
import { useNavigate } from "react-router-dom";
import { ThemeValue } from "../../../providers/ThemeContextProvider";
import ProfilePhoto from "../../profile/profilePhoto/ProfilePhoto";
import Content from "../../utilities/Content";
import ProfileName from "../../profile/ProfileName";
import { ApolloClient } from "@apollo/client";
import EntirePageLoading from "../../utilities/entirePage/EntirePageLoading";

const Wrapper = styled(Content)`
  top: calc(var(--header-height) + 0.5rem);
  right: 0;
  width: 16rem;
  position: absolute;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border-top-right-radius: 0;
  background-color: ${(props) => props.theme.secondary};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Profile = styled.div`
  display: grid;
  grid-template-columns: 3.5rem auto;
  height: 3.5rem;
`;

function ProfileDetail({
  user,
  client,
}: {
  user: UserProfile;
  client: ApolloClient<any>;
}) {
  const authentication = useAuthentication();
  const navigate = useNavigate();
  const { toggleTheme } = useTheme() as ThemeValue;
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    authentication.logout();
    setLoading(true);
    await client.resetStore();
    setLoading(false);
    navigate("/auth/login");
  };

  return (
    <Wrapper>
      {loading && <EntirePageLoading />}
      <Profile>
        <ProfilePhoto user={user} size="large" />
        <ProfileName user={user} withHeadline />
      </Profile>
      <RingLink to={`/in/${user.id}`}>View Profile</RingLink>
      <Line />
      <ButtonBlur onClick={toggleTheme}>Toggle theme</ButtonBlur>
      <ButtonBlur onClick={logout}>Sign out</ButtonBlur>
    </Wrapper>
  );
}

export default ProfileDetail;
