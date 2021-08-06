import React, { ChangeEvent } from "react";
import { Figure } from "../../../Figure";
import { changeTextSettings } from "../../../models/figures";
import SettingField from "../SettingField";

type OpacityFieldProps = {
  figure: Figure;
};

const OpacityField: React.FC<OpacityFieldProps> = ({ figure }) => {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const textSettings = { ...figure.textSettings };
    textSettings.opacity = Number(e.target.value);
    changeTextSettings(textSettings);
  };

  return (
    <SettingField text="Opacity" canDisable={false}>
      <input
        style={{ width: 40 }}
        type="number"
        min={0}
        max={100}
        value={figure.textSettings.opacity}
        step={10}
        onChange={onInputChange}
      />
    </SettingField>
  );
};

export default OpacityField;
