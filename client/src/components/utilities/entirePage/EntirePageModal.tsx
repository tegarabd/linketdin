import ReactDOM from "react-dom";
import styled from "styled-components";
import EntirePageOverlay from "./EntirePageOverlay";
import { ReactComponent as CrossIcon } from "../../../assets/cross-icon.svg";
import Content from "../Content";
import Line from "../Line";
import ButtonSecondary from "../button/ButtonSecondary";

const Wrapper = styled(Content)`
  width: 35rem;
  max-height: 35rem;
  padding: 1rem;
  overflow: auto;
`;

const Upper = styled.div`
  display: flex;
  justify-content: space-between;
`;

function EntirePageModal({
  children,
  position,
  title,
  onClose,
}: {
  children: JSX.Element;
  position: string;
  title: string;
  onClose: VoidFunction;
}) {
  return ReactDOM.createPortal(
    <EntirePageOverlay onClick={onClose} position={position}>
      <Wrapper onClick={(event) => event.stopPropagation()}>
        <Upper>
          <h3>{title}</h3>
          <ButtonSecondary onClick={onClose}>
            <CrossIcon />
          </ButtonSecondary>
        </Upper>
        <Line />
        {children}
      </Wrapper>
    </EntirePageOverlay>,
    document.getElementById("modal")!
  );
}

export default EntirePageModal;
