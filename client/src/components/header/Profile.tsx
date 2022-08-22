import React from "react";
import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "../../assets/arrow-icon.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 6rem;
  border-bottom: 0.125rem solid transparent;

  & > svg {
    width: 1.6rem;
    height: 1.6rem;
  }

`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    font-size: 0.7rem;
  }
`;

function Profile() {
  return (
    <Wrapper>
      <img src="" alt="" />
      <Text>
        <span>Me</span>
        <ArrowIcon />
      </Text>
    </Wrapper>
  );
}

export default Profile;
