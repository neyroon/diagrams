import React, { ChangeEvent, useState } from "react";
import SettingField from "../SettingField";
import FillChanger from "../FillChanger";
import { changeLineColor, changeLineSize } from "../../../models/figures";
import { Figure } from "../../../Figure";

type LineFieldsProps = {
  figure: Figure;
};

const LineFields: React.FC<LineFieldsProps> = ({ figure }) => {
  const onFieldDisable = () => {
    changeLineColor(null);
  };

  const onModalSubmit = (color: string) => {
    changeLineColor(color);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeLineSize(Number(e.target.value));
  };

  return (
    <>
      <SettingField text="Line" onFieldDisable={onFieldDisable}>
        <input
          style={{ width: 40, marginRight: 10 }}
          type="number"
          min={0}
          value={figure.lineSize}
          onChange={onInputChange}
        />
        <FillChanger
          color={figure.strokeColor.current}
          onModalSubmit={onModalSubmit}
        />
      </SettingField>
    </>
  );
};

export default LineFields;
