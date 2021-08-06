import React, { CSSProperties, useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import Modal from "./Modal";

type FillChangerProps = {
  color: string;
  onModalOpen?: (color: string) => void;
  onModalSubmit?: (color: string) => void;
  onModalClose?: (color: string) => void;
};

const ButtonCss: CSSProperties = {
  backgroundColor: "#eee",
  width: "45px",
  height: "20px",
};

const FillChanger: React.FC<FillChangerProps> = ({
  color,
  onModalOpen,
  onModalSubmit,
  onModalClose,
}) => {
  const [_color, setColor] = useColor("hex", color);
  const [fillColor, setFillColor] = useState(color);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onOpen = () => {
    setIsModalOpen(true);
    onModalOpen && onModalOpen(_color.hex);
  };

  const onSubmit = () => {
    setIsModalOpen(false);
    setFillColor(_color.hex);
    onModalSubmit && onModalSubmit(_color.hex);
  };

  const onClose = () => {
    setIsModalOpen(false);
    onModalClose && onModalClose(_color.hex);
  };

  const ButtonDivCss: CSSProperties = {
    backgroundColor: fillColor,
    padding: "7px",
  };

  return (
    <div className="fill-changer">
      <button className="fill-changer__btn" onClick={onOpen} style={ButtonCss}>
        <div style={ButtonDivCss}></div>
      </button>
      {isModalOpen && (
        <Modal onClose={onClose} onSubmit={onSubmit}>
          <ColorPicker
            width={400}
            height={400}
            color={_color}
            onChange={setColor}
          />
        </Modal>
      )}
    </div>
  );
};

export default FillChanger;
