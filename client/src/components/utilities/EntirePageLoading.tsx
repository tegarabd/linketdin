import ReactDOM from "react-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  border: 1rem solid ${(props) => props.theme.accent};
  border-bottom: 1rem solid transparent;
`;

function EntirePageLoading() {
  return ReactDOM.createPortal(
    <Wrapper>
      <Loading />
    </Wrapper>,
    document.getElementById("loading")!
  );
}

export default EntirePageLoading;
