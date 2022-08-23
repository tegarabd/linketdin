import React from "react";
import styled, { useTheme } from "styled-components";
import PhotoPlaceHolder from "./PhotoPlaceHolder";
import { UserProfile } from ".";
import RingLink from "../../utilities/RingLink";
import Line from "../../utilities/Line";
import BlurButton from "../../utilities/BlurButton";
import { useAuthentication } from "../../../providers/AuthenticationContextProvider";
import { useNavigate } from "react-router-dom";
import { ThemeValue } from "../../../providers/ThemeContextProvider";

const Wrapper = styled.div`
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

  & > div {
    & > div {
      font-size: 0.9rem;
      line-height: 1.2;
    }
    & > h4 {
      font-weight: 600;
    }
  }

  & > img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
`;

function ProfileDetail({ user }: { user: UserProfile }) {
  const authentication = useAuthentication();
  const navigate = useNavigate();
  const theme = useTheme();
  const { toggleTheme } = theme as ThemeValue;

  const logout = () => {
    authentication.logout();
    navigate("/auth/login");
  };

  return (
    <Wrapper>
      <Profile>
        {user.profilePhotoUrl ? (
          <img src={user.profilePhotoUrl} />
        ) : (
          <PhotoPlaceHolder size="large" user={user} />
        )}
        <div>
          <h4>
            {user.firstName} {user.lastName}
          </h4>
          <div>{user.headline}</div>
        </div>
      </Profile>
      <RingLink to="/in/asfdsafd">View Profile</RingLink>
      <Line />
      <BlurButton onClick={toggleTheme}>Toggle theme</BlurButton>
      <BlurButton onClick={logout}>Sign out</BlurButton>
    </Wrapper>
  );
}

export default ProfileDetail;
