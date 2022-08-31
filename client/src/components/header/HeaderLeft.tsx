import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuthentication } from "../../providers/AuthenticationContextProvider";
import LinketdinLogo from "./LinketdinLogo";
import SearchBar from "./SearchBar";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Logo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  & > h1 {
    font-weight: 700;
  }
`;

function HeaderLeft() {
  const authentication = useAuthentication();

  return (
    <Wrapper>
      <Logo to="/">
        {!authentication.isLoggedIn && <h1>Linketd</h1>}
        <LinketdinLogo />
      </Logo>
      {authentication.isLoggedIn && <SearchBar />}
    </Wrapper>
  );
}

export default HeaderLeft;
