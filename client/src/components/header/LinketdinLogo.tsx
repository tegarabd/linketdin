import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/logo-icon.svg";

const LinketdinLogo = styled(Logo)`
  width: 2.5rem;
  height: 2.5rem;
  fill: ${(props) => props.theme.accent};
`;

export default LinketdinLogo