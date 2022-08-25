import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  font-weight: 500;
  color: ${props => props.theme.accent};
`

export default StyledLink