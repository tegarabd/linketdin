import React from "react";
import { ReactComponent as HomeIcon } from "../../assets/home-icon.svg";
import { ReactComponent as MyNetworkIcon } from "../../assets/my-network-icon.svg";
import { ReactComponent as JobsIcon } from "../../assets/jobs-icon.svg";
import { ReactComponent as MessagingIcon } from "../../assets/messaging-icon.svg";
import { ReactComponent as NotificationsIcon } from "../../assets/notifications-icon.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuthentication } from "../../providers/AuthenticationContextProvider";

const NavigationIcon = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 6rem;
  border-bottom: 0.125rem solid
    ${(props) => (props["aria-selected"] ? props.theme.font : "transparent")};

  & > svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  & > span {
    font-size: 0.7rem;
  }

  & > h3 {
    background-color: ${(props) => props.theme.accent};
    color: ${(props) => props.theme.secondary};
    border-radius: 100vw;
    padding: 0.25rem 1rem;
    font-weight: 500;
  }

  & > h3:first-child {
    margin-right: 1rem;
  }
`;

function Navigations() {
  const authentication = useAuthentication();

  if (authentication.isLoggedIn)
    return (
      <>
        <NavigationIcon to="/" aria-selected>
          <HomeIcon />
          <span>Home</span>
        </NavigationIcon>
        <NavigationIcon to="/mynetwork">
          <MyNetworkIcon />
          <span>My Network</span>
        </NavigationIcon>
        <NavigationIcon to="/jobs">
          <JobsIcon />
          <span>Jobs</span>
        </NavigationIcon>
        <NavigationIcon to="/messaging">
          <MessagingIcon />
          <span>Messaging</span>
        </NavigationIcon>
        <NavigationIcon to="/notifications">
          <NotificationsIcon />
          <span>Notifications</span>
        </NavigationIcon>
      </>
    );

  return (
    <>
      <NavigationIcon to="/auth/register">
        <h3>Join Now</h3>
      </NavigationIcon>
      <NavigationIcon to="/auth/login">
        <h3>Sign In</h3>
      </NavigationIcon>
    </>
  );
}

export default Navigations;
