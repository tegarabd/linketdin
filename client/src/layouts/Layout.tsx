import React from "react";
import styled from "styled-components";
import Main from "../components/Main";

const Wrapper = styled.div`
  margin: 1rem;
  width: var(--layout-none-max-width);
  @media (min-width: 1200px) {
    width: var(--layout-xl-max-width);
  }
`;

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Main>{children}</Main>
    </Wrapper>
  );
}

export default Layout;
