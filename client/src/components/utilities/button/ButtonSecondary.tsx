import styled from "styled-components";

const ButtonSecondary = styled.button`
  cursor: pointer;
  padding: 0 2rem;
  border-radius: 100vw;
  border: 1px solid ${(props) => props.theme.accent};
  font-weight: 500;
  color: ${(props) => props.theme.accent};
  text-align: center;
  min-height: 2rem;
  min-width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-width: 0.125rem;
  }
`;

export default ButtonSecondary;
