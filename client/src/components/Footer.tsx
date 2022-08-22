import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
  height: var(--footer-height);
`;

function Footer() {
  return (
    <Wrapper>
      <span>Footer</span>
    </Wrapper>
  );
}

export default Footer;
