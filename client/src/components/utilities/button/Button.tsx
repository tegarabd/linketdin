import styled from "styled-components";

const Button = styled.button`
  padding: 0.5rem;
  border-radius: 100vw;
  font-weight: 500;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export default Button;
