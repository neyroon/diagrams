import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import classNames from "classnames";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  AiOutlineVerticalAlignBottom,
  AiOutlineVerticalAlignMiddle,
  AiOutlineVerticalAlignTop,
  HiSwitchVertical,
} from "react-icons/all";
import Input from "../Input";
import { Figure } from "../../../Figure";
import { changeTextSettings } from "../../../models/figures";
import { IconType } from "react-icons/lib";

type FontCommonFieldsProps = {
  figure: Figure;
};

const FontCommonFields: React.FC<FontCommonFieldsProps> = ({ figure }) => {
  const onTextStyleChange = (value: keyof TextStyleType) => {
    const textSettings = { ...figure.textSettings };
    textSettings.style[value] = !textSettings.style[value];
    changeTextSettings(textSettings);
  };

  const onTextAlignChange = (value: TextAlignType) => {
    const textSettings = { ...figure.textSettings };
    textSettings.align = value;
    changeTextSettings(textSettings);
  };

  const onTextBaselineChange = (value: TextBaselineType) => {
    const textSettings = { ...figure.textSettings };
    textSettings.baseline = value;
    changeTextSettings(textSettings);
  };

  const onTextSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const textSettings = { ...figure.textSettings };
    textSettings.size = Number(e.target.value);
    changeTextSettings(textSettings);
  };

  const ButtonsTextStyleList: Array<{
    field: keyof TextStyleType;
    component: IconType;
  }> = [
    {
      field: "bold",
      component: FaBold,
    },
    {
      field: "italic",
      component: FaItalic,
    },
    {
      field: "underline",
      component: FaUnderline,
    },
  ];

  const ButtonsTextAlignList: Array<{
    field: TextAlignType;
    component: IconType;
  }> = [
    {
      field: "left",
      component: FaAlignLeft,
    },
    {
      field: "center",
      component: FaAlignCenter,
    },
    {
      field: "right",
      component: FaAlignRight,
    },
  ];

  const ButtonsTextBaselineList: Array<{
    field: TextBaselineType;
    component: IconType;
  }> = [
    {
      field: "bottom",
      component: AiOutlineVerticalAlignBottom,
    },
    {
      field: "middle",
      component: AiOutlineVerticalAlignMiddle,
    },
    {
      field: "top",
      component: AiOutlineVerticalAlignTop,
    },
  ];

  return (
    <div className="text-settings-buttons">
      <div className="text-btn-union">
        {ButtonsTextStyleList.map((btn) => {
          const Btn = btn.component;
          const btnClassName = classNames("text-btn", {
            active: figure.textSettings.style[btn.field],
          });
          return (
            <div
              key={btn.field}
              className={btnClassName}
              onClick={() => onTextStyleChange(btn.field)}
            >
              <Btn />
            </div>
          );
        })}
      </div>
      <div className="text-btn-union">
        <div
          className={classNames("text-btn", {
            active: figure.textSettings.orintation === "vertical",
          })}
        >
          <HiSwitchVertical />
        </div>
        <Input
          onChange={onTextSizeChange}
          value={figure.textSettings.size}
          min={1}
        />
      </div>
      <div className="text-btn-union">
        {ButtonsTextAlignList.map((btn) => {
          const Btn = btn.component;
          const btnClassName = classNames("text-btn", {
            active: btn.field === figure.textSettings.align,
          });
          return (
            <div
              key={btn.field}
              className={btnClassName}
              onClick={() => onTextAlignChange(btn.field)}
            >
              <Btn />
            </div>
          );
        })}
      </div>
      <div className="text-btn-union">
        {ButtonsTextBaselineList.map((btn) => {
          const Btn = btn.component;
          const btnClassName = classNames("text-btn", {
            active: btn.field === figure.textSettings.baseline,
          });
          return (
            <div
              key={btn.field}
              className={btnClassName}
              onClick={() => onTextBaselineChange(btn.field)}
            >
              <Btn />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FontCommonFields;
