import React from "react";
import { useStore } from "effector-react";
import FillChanger from "../FillChanger";
import SettingField from "../SettingField";
import { $gridSettings, redrawGrid } from "../../../models/diagrams/index";

const BackgroundField = () => {
  const gridSettings = useStore($gridSettings);

  const onModalSubmit = (color: string) => {
    redrawGrid({
      ...gridSettings,
      backgroundColor: color,
    });
  };

  const onFieldDisable = () => {
    redrawGrid({
      ...gridSettings,
      backgroundColor: "white",
    });
  };

  return (
    <>
      <SettingField text="Background" onFieldDisable={onFieldDisable}>
        <FillChanger
          color={gridSettings.backgroundColor}
          onModalSubmit={onModalSubmit}
        />
      </SettingField>
    </>
  );
};

export default BackgroundField;
