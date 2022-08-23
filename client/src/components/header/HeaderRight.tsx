import styled from "styled-components";
import { useAuthentication } from "../../providers/AuthenticationContextProvider";
import Navigations from "./Navigations";
import Profile from "./profile";

const WrapperLoggedIn = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
`;

const WrapperNotLoggedIn = styled.div`
  display: flex;
  align-items: center;
  & > a:last-child {
    margin-left: 1rem;
  }
`;

function HeaderRight() {
  const authentication = useAuthentication();

  if (authentication.isLoggedIn) {
    return (
      <WrapperLoggedIn>
        <Navigations />
        <Profile />
      </WrapperLoggedIn>
    );
  }
  return (
    <WrapperNotLoggedIn>
      <Navigations />
    </WrapperNotLoggedIn>
  );
}

export default HeaderRight;
