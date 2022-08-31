import styled from "styled-components";
import Button from "./Button";

const ButtonTertiary = styled(Button)`
  color: ${(props) => props.theme.fontDimmed};
  &:hover {
    color: ${(props) => props.theme.font};
    background-color: ${(props) => props.theme.shadow};
  }
`;

export default ButtonTertiary;
