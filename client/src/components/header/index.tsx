import React from "react";
import styled from "styled-components";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.secondary};
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  height: var(--header-height);
  border-bottom: 1px solid ${props => props.theme.shadow};
  position: sticky;
  top: 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: var(--layout-xl-max-width);
  @media (min-width: 748px) and (max-width: 854px) {
    /* remove span in navigation */
  }
  @media (min-width: 855px) and (max-width: 1024px) {
    justify-content: start;
    gap: 1rem;
    /* change search bar to be navigation */
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
