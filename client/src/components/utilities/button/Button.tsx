import styled from "styled-components";

const Button = styled.button`
  border-radius: 100vw;
  font-weight: 500;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export default Button;
