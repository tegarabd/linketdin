import { ReactComponent as HomeIcon } from "../../assets/home-icon.svg";
import { ReactComponent as MyNetworkIcon } from "../../assets/my-network-icon.svg";
import { ReactComponent as JobsIcon } from "../../assets/jobs-icon.svg";
import { ReactComponent as MessagingIcon } from "../../assets/messaging-icon.svg";
import { ReactComponent as NotificationsIcon } from "../../assets/notifications-icon.svg";
import styled from "styled-components";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";
import { useAuthentication } from "../../providers/AuthenticationContextProvider";
import RingLink from "../utilities/link/RingLink";

const NavigationIcon = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-width: 6rem;
  border-bottom: 0.125rem solid transparent;
  color: ${(props) => props.theme.fontDimmed};

  & > svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  & > span {
    font-size: 0.7rem;
    padding-bottom: 0.2rem;
  }
`;

const ActiveNavigationIcon = styled(NavigationIcon)`
  border-bottom-color: ${(props) => props.theme.font};
  color: ${(props) => props.theme.font};
`;

function NavLink({ children, to, ...props }: LinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  if (match) {
    return (
      <ActiveNavigationIcon to={to} {...props}>
        {children}
      </ActiveNavigationIcon>
    );
  }

  return (
    <NavigationIcon to={to} {...props}>
      {children}
    </NavigationIcon>
  );
}

function Navigations() {
  const authentication = useAuthentication();

  if (authentication.isLoggedIn)
    return (
      <>
        <NavLink to="/feed">
          <HomeIcon />
          <span>Home</span>
        </NavLink>
        <NavLink to="/mynetwork">
          <MyNetworkIcon />
          <span>My Network</span>
        </NavLink>
        <NavLink to="/jobs">
          <JobsIcon />
          <span>Jobs</span>
        </NavLink>
        <NavLink to="/messaging">
          <MessagingIcon />
          <span>Messaging</span>
        </NavLink>
        <NavLink to="/notifications">
          <NotificationsIcon />
          <span>Notifications</span>
        </NavLink>
      </>
    );

  return (
    <>
      <RingLink to="/auth/register">Join now</RingLink>
      <RingLink to="/auth/login">Sign in</RingLink>
    </>
  );
}

export default Navigations;
