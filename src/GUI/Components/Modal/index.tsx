import React from "react";
import ReactDOM from "react-dom";
import "./modal.scss";

type ModalProps = {
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ onClose, onSubmit, children }) => {
  return ReactDOM.createPortal(
    <>
      <div className="modal-alpha" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button onClick={onSubmit}>ok</button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
