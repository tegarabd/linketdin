import styled from "styled-components";
import Button from "./Button";

const ButtonPrimary = styled(Button)`
  background-color: ${(props) =>
    props.disabled ? props.theme.shadow : props.theme.accent};
  color: ${(props) =>
    props.disabled ? props.theme.fontDimmed : props.theme.secondary};
  padding: 0.5rem 1rem;
`;

export default ButtonPrimary;
