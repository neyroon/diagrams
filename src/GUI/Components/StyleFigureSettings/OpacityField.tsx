import React, { ChangeEvent } from "react";
import SettingField from "../SettingField";
import { Figure } from "../../../Figure";
import { changeOpacity } from "../../../models/figures";

type OpacityFieldProps = {
  figure: Figure;
};

const OpacityField: React.FC<OpacityFieldProps> = ({ figure }) => {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeOpacity(Number(e.target.value));
  };

  return (
    <SettingField text="Opacity" canDisable={false}>
      <input
        style={{ width: 40 }}
        type="number"
        min={0}
        max={100}
        value={figure.opacity}
        step={10}
        onChange={onInputChange}
      />
    </SettingField>
  );
};

export default OpacityField;
