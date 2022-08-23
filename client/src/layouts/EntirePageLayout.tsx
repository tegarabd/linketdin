import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(
    100vh - var(--header-height) - var(--footer-height) - 1rem - 1rem
  );
`;

const Content = styled.div`
  background-color: ${(props) => props.theme.secondary};
  width: 25rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.5rem;

  & > h1,
  span {
    text-align: center;
  }
`;

function EntirePageLayout({ children }: { children: ReactNode | ReactNode[] }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default EntirePageLayout;
