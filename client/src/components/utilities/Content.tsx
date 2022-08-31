import styled from "styled-components";

interface Props {
  padding?: string
}

const Content = styled.div<Props>`
  background-color: ${(props) => props.theme.secondary};
  padding: ${(props) => (props.padding ? props.padding : "0.5rem")};
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
`;

export default Content;
