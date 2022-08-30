import styled from "styled-components";

const Select = styled.select`
  border-radius: 0.5rem;
  padding: 0.25rem 1rem;
  border: 0.125rem solid ${(props) => props.theme.fontDimmed};
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.font};
`;

export default Select;
