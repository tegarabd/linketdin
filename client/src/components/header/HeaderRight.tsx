import React from "react";
import styled from "styled-components";
import { useAuthentication } from "../../providers/AuthenticationContextProvider";
import Navigations from "./Navigations";
import Profile from "./Profile";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

function HeaderRight() {
  const authentication = useAuthentication();

  return (
    <Wrapper>
      <Navigations />
      {authentication.isLoggedIn && <Profile />}
    </Wrapper>
  );
}

export default HeaderRight;
