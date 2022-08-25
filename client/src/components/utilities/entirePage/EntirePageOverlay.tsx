import styled from "styled-components";

interface Props {
  position?: string;
  followTheme?: boolean;
}

const EntirePageOverlay = styled.div<Props>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100vh;
  background-color: ${(props) =>
    props.followTheme ? props.theme.overlay : "rgba(0, 0, 0, 0.8)"};
  display: flex;
  padding: 5rem;
  justify-content: center;
  align-items: ${(props) => {
    switch (props.position) {
      case "top":
        return "flex-start";
      case "middle":
        return "center";
      default:
        return "center";
    }
  }};
`;

export default EntirePageOverlay;
