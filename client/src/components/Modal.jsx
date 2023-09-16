import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "var(--color-grey-0)",
  borderRadius: "var(--border-radius-lg)",
  boxShadow: "var(--shadow-lg)",
  padding: "3.2rem 4rem",
  transition: "all 0.5s",
};

const OverlayStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100vh",
  backgroundColor: "var(--backdrop-color)",
  backdropFilter: "blur(4px)",
  zIndex: "1000",
  transition: "all 0.5s",
};

const ButtonStyle = {
  background: "none",
  border: "none",
  padding: "0.4rem",
  borderRadius: "var(--border-radius-sm)",
  transform: "translateX(0.8rem)",
  transition: "all 0.2s",
  position: "absolute",
  top: "1.2rem",
  right: "1.9rem",
};

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens: opensWindowName, children }) {
  const { open } = useContext(ModalContext);

  // clone element with additional props and other things (here children)
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ name, children }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  // createPortal renders the component outside the main DOM structure (outside the #root and directly inside the body)
  // and still keeps it in its correct place in react dom. You can specify its position in main DOM with the second argument
  return createPortal(
    <Box sx={OverlayStyle}>
      <Box sx={ModalStyle} ref={ref}>
        <Button sx={ButtonStyle} onClick={close}>
          <CloseIcon />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </Box>
    </Box>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
