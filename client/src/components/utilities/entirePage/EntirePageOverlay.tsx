import styled from "styled-components";

interface Props {
  position?: string;
  followTheme?: boolean;
}

const EntirePageOverlay = styled.div<Props>`
  position: fixed;
  inset: 0;
  z-index: 999;
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
