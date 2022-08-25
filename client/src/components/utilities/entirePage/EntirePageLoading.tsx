import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import EntirePageOverlay from "./EntirePageOverlay";

const spinningAnimation = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  border: 1rem solid ${(props) => props.theme.accent};
  border-bottom: 1rem solid transparent;
  animation: ${spinningAnimation} 1s linear infinite;
`;

function EntirePageLoading() {
  return ReactDOM.createPortal(
    <EntirePageOverlay position="center" followTheme>
      <Loading />
    </EntirePageOverlay>,
    document.getElementById("loading")!
  );
}

export default EntirePageLoading;
