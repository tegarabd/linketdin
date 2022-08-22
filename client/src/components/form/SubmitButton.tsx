import styled from "styled-components";

const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.secondary};
  padding: 0.5rem;
  border-radius: 100vw;
  font-weight: 500;
  border: none;
  cursor: pointer;
`;

export default SubmitButton;
