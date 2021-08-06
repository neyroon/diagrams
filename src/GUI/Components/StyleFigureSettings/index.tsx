import React from "react";
import FillField from "./FillField";
import { Figures } from "../../../typings/field";
import LineFields from "./LineFields";
import OpacityField from "./OpacityField";

type StyleFigureProps = {
  figures: Figures;
};

const StyleFigureSettings: React.FC<StyleFigureProps> = ({ figures }) => {
  const figure = figures[0];

  return (
    <>
      <FillField figure={figure} />
      <hr />
      <LineFields figure={figure} />
      <hr />
      <OpacityField figure={figure} />
      <hr />
    </>
  );
};

export default StyleFigureSettings;
