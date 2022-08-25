import styled from "styled-components";

const Content = styled.div`
  background-color: ${(props) => props.theme.secondary};
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.shadow};
`;

export default Content;
