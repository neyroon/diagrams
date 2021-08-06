import React from "react";
import SettingField from "../SettingField";
import FillChanger from "../FillChanger";
import { changeFillColor } from "../../../models/figures";
import { Figure } from "../../../Figure";

type FillProps = {
  figure: Figure;
};

const FillField: React.FC<FillProps> = ({ figure }) => {
  const onFieldDisable = () => {
    changeFillColor(null);
  };

  const onModalSubmit = (color: string) => {
    changeFillColor(color);
  };

  return (
    <>
      <SettingField text="Fill" onFieldDisable={onFieldDisable}>
        <FillChanger
          color={figure.fillColor.current}
          onModalSubmit={onModalSubmit}
        />
      </SettingField>
    </>
  );
};

export default FillField;
