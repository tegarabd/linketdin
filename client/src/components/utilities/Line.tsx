import styled from "styled-components";

const Line = styled.hr`
  margin: 0.5rem 0;
  border-top: 1px solid ${(props) => props.theme.shadow};
`;

export default Line;
