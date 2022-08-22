import React from "react";
import styled from "styled-components";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.secondary};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--header-height);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  @media (min-width: 1200px) {
    width: var(--layout-xl-max-width);
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <HeaderLeft />
        <HeaderRight />
      </HeaderContent>
    </HeaderWrapper>
  );
}

export default Header;
