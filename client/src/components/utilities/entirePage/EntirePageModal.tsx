import ReactDOM from "react-dom";
import styled from "styled-components";
import EntirePageOverlay from "./EntirePageOverlay";
import { ReactComponent as CrossIcon } from "../../../assets/cross-icon.svg";
import Content from "../Content";
import Line from "../Line";
import { ReactNode } from "react";
import ButtonTertiary from "../button/ButtonTertiary";
import { useScroll } from "../../../hooks/useScroll";

const Wrapper = styled(Content)`
  width: 35rem;
  max-height: 35rem;
  padding: 1rem;
  overflow: auto;
`;

const Upper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function EntirePageModal({
  children,
  position,
  title,
  onClose,
}: {
  children: ReactNode | ReactNode[];
  position: string;
  title: string;
  onClose: VoidFunction;
}) {
  const { makeWindowScrollable, makeWindowUnscrollable } = useScroll();
  makeWindowUnscrollable();

  const close = () => {
    makeWindowScrollable();
    onClose();
  };

  return ReactDOM.createPortal(
    <EntirePageOverlay
      onClick={close}
      position={position}
    >
      <Wrapper onClick={(event) => event.stopPropagation()}>
        <Upper>
          <h3>{title}</h3>
          <ButtonTertiary onClick={close}>
            <CrossIcon />
          </ButtonTertiary>
        </Upper>
        <Line />
        {children}
      </Wrapper>
    </EntirePageOverlay>,
    document.getElementById("modal")!
  );
}

export default EntirePageModal;
