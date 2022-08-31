import styled from "styled-components";
import Button from "./Button";

const ButtonSecondary = styled(Button)`
  border: 1px solid ${(props) => props.theme.accent};
  color: ${(props) => props.theme.accent};
  margin: 1px;

  &:hover {
    border-width: 2px;
    margin: 0;
  }
`;

export default ButtonSecondary;
