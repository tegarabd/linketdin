import styled from "styled-components";

const Textarea = styled.textarea`
  width: 100%;
  min-height: 10rem;
  border-radius: 0.5rem;
  padding: 0.25rem 1rem;
  border: 0.125rem solid ${(props) => props.theme.fontDimmed};
  resize: none;
`;

export default Textarea;
