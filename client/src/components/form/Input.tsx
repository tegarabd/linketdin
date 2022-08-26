import styled from "styled-components";

const Input = styled.input`
  border-radius: 0.5rem;
  padding: 0.25rem 1rem;
  border: 0.125rem solid ${(props) => props.theme.shadow};
`;

export default Input;
