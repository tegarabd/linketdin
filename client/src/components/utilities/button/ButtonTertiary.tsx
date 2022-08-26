import styled from "styled-components";
import Button from "./Button";

const ButtonTertiary = styled(Button)`
  border-radius: 0.5rem;
  transition: 300ms;
  &:hover {
    background-color: ${(props) => props.theme.shadow};
  }
`;

export default ButtonTertiary