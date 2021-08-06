import React from "react";
import { Figure } from "../../../Figure";
import { changeTextSettings } from "../../../models/figures";
import FillChanger from "../FillChanger";
import SettingField from "../SettingField";

type ColorFieldProps = {
  figure: Figure;
};

const ColorField: React.FC<ColorFieldProps> = ({ figure }) => {
  const onFieldDisable = () => {
    const textSettings = { ...figure.textSettings };
    textSettings.color.isTransparent = true;
    changeTextSettings(textSettings);
  };

  const onFieldEnable = () => {
    const textSettings = { ...figure.textSettings };
    textSettings.color.isTransparent = false;
    changeTextSettings(textSettings);
  };

  const onModalSubmit = (color: string) => {
    const textSettings = { ...figure.textSettings };
    textSettings.color.current = color;
    changeTextSettings(textSettings);
  };

  return (
    <>
      <SettingField
        text="Fill"
        onFieldDisable={onFieldDisable}
        onFieldEnable={onFieldEnable}
      >
        <FillChanger
          color={figure.textSettings.color.current}
          onModalSubmit={onModalSubmit}
        />
      </SettingField>
    </>
  );
};

export default ColorField;
