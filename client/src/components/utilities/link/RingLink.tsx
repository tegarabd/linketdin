import { Link } from "react-router-dom";
import styled from "styled-components";

const RingLink = styled(Link)`
  cursor: pointer;
  padding: 0 2rem;
  border-radius: 100vw;
  border: 1px solid ${(props) => props.theme.accent};
  font-weight: 500;
  color: ${(props) => props.theme.accent};
  text-align: center;
  min-height: 2rem;
  min-width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-width: 0.125rem;
  }
`;

export default RingLink;
