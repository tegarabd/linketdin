import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  color: ${(props) => props.theme.error};
  font-weight: 500;
  text-align: center;
`;

function Errors({ errors }: { errors: Array<string> }) {
  return (
    <Wrapper>
      {errors.map((error, idx) => (
        <div key={idx}>{error}</div>
      ))}
    </Wrapper>
  );
}

export default Errors;
