import styled from "styled-components";
import Button from "./Button";

const ButtonDanger = styled(Button)`
  border: 1px solid ${(props) => props.theme.error};
  color: ${(props) => props.theme.error};
`;

export default ButtonDanger;
