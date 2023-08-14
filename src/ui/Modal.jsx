import { cloneElement, createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 0.8rem;
  right: 1.6rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  function close() {
    setOpenName("");
  }

  // const open = setOpenName; and in context would be open;
  // Lakse da se poziva setOpenName direktno, jasnije je sta se desava

  return (
    <ModalContext.Provider value={{ setOpenName, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { setOpenName } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => setOpenName(opensWindowName) });
  // check props on <Modal.Open opens="table">
}

function Window({ children, name, isRequesting, willOusideClickClose = true }) {
  // check props on <Modal.Window name="table">
  const { openName, close } = useContext(ModalContext);
  const { ref, setIsRequesting } = useOutsideClick(handleClose);

  function handleClose() {
    if (!isRequesting) close();
  }

  useEffect(() => {
    setIsRequesting(isRequesting);
    // Reset isRequesting when the modal opens & handle click outside modal
  }, [isRequesting, openName, setIsRequesting]);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={willOusideClickClose ? ref : null}>
        <Button disabled={isRequesting} onClick={handleClose}>
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { closeModal: handleClose })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
