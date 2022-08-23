import styled from "styled-components";

const Line = styled.hr`
  border-top: 1px solid ${(props) => props.theme.fontDimmed};
`;

export default Line;
