import React from "react";
import { Figures } from "../../../typings/field";
import OpacityField from "./OpacityField";
import ColorField from "./ColorField";
import FontCommonFields from "./FontCommonFields";
import "./textFigure.scss";

type TextFigureProps = {
  figures: Figures;
};

const TextFigure: React.FC<TextFigureProps> = ({ figures }) => {
  const figure = figures[0];
  return (
    <>
      <FontCommonFields figure={figure} />
      <hr />
      <ColorField figure={figure} />
      <hr />
      <OpacityField figure={figure} />
      <hr />
    </>
  );
};

export default TextFigure;
