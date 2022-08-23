import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuthentication } from "../../providers/AuthenticationContextProvider";
import Navigations from "./Navigations";
import Profile from "./profile";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;

  & > a:last-child {
    margin-left: 1rem;
  }
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
