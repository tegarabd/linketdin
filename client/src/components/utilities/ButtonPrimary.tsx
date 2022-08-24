import styled from "styled-components";
import Button from "./Button";

const ButtonPrimary = styled(Button)`
  background-color: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.secondary};
`;

export default ButtonPrimary;
