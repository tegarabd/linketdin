import styled from "styled-components";

const ButtonSecondary = styled.button`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  transition: 300ms;

  &:hover {
    background-color: ${(props) => props.theme.shadow};
  }
`;

export default ButtonSecondary;
