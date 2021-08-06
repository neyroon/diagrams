import React, { CSSProperties, useEffect, useState } from "react";

type SettingFieldProps = {
  text: string;
  onFieldEnable?: () => void;
  onFieldDisable?: () => void;
  canDisable?: boolean;
  children?: React.ReactNode;
};

const SettingFieldCss: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const SettingField: React.FC<SettingFieldProps> = ({
  text,
  onFieldEnable,
  onFieldDisable,
  canDisable = true,
  children,
}) => {
  const [isSettingFieldOpen, setIsSettingFieldOpen] = useState(true);

  if (!canDisable)
    return (
      <div style={SettingFieldCss}>
        <div>{text}</div>
        <div style={{ display: "flex" }}>{children}</div>
      </div>
    );

  useEffect(() => {
    isSettingFieldOpen
      ? typeof onFieldEnable === "function" && onFieldEnable()
      : typeof onFieldDisable === "function" && onFieldDisable();
  }, [isSettingFieldOpen]);

  const onSettingFieldChange = () => {
    setIsSettingFieldOpen(!isSettingFieldOpen);
  };

  return (
    <div style={SettingFieldCss}>
      <label>
        <input
          type="checkbox"
          checked={isSettingFieldOpen}
          onChange={onSettingFieldChange}
        />
        {text}
      </label>
      <div style={{ display: "flex" }}>{isSettingFieldOpen && children}</div>
    </div>
  );
};

export default SettingField;
