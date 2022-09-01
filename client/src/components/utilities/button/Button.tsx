import styled from "styled-components";

interface Props {
  size?: string;
}

const Button = styled.button<Props>`
  border-radius: 100vw;
  font-size: ${(props) => (props.size === "small" ? "small" : "normal")};
  font-weight: 500;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: ${(props) => (props.size === "small" ? "0.25rem 0.5rem" : "0.5rem 1rem")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export default Button;
