import React, { ChangeEvent, useState } from "react";
import FillChanger from "../FillChanger";
import Modal from "../Modal";
import SettingField from "../SettingField";
import { ColorPicker, useColor } from "react-color-palette";
import { useStore } from "effector-react";
import { $gridSettings, redrawGrid } from "../../../models/diagrams/index";

const GridField = () => {
  const gridSettings = useStore($gridSettings);
  const [cellSize, setCellSize] = useState(gridSettings.cellSize);

  const onModalSubmit = (color: string) => {
    redrawGrid({
      ...gridSettings,
      strokeColor: color,
    });
  };

  const onFieldDisable = () => {
    redrawGrid({
      ...gridSettings,
      isGridEnable: false,
    });
  };

  const onFieldEnable = () => {
    redrawGrid({
      ...gridSettings,
      isGridEnable: true,
    });
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCellSize(Number(e.target.value));
    redrawGrid({
      ...gridSettings,
      cellSize: Number(e.target.value),
    });
  };
  return (
    <>
      <SettingField
        text="Grid"
        onFieldDisable={onFieldDisable}
        onFieldEnable={onFieldEnable}
      >
        <input
          style={{ width: 40, marginRight: 10 }}
          type="number"
          min={1}
          value={cellSize}
          onChange={onInputChange}
        />
        <FillChanger
          color={gridSettings.strokeColor}
          onModalSubmit={onModalSubmit}
        />
      </SettingField>
    </>
  );
};

export default GridField;
