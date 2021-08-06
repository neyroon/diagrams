import React from "react";
import { useStore } from "effector-react";
import { $gridSettings } from "../models/diagrams/index";
import Rect from "./Components/Figures/Rect";
import Circle from "./Components/Figures/Circle";
import Ellipse from "./Components/Figures/Ellipse";
import Square from "./Components/Figures/Square";

const FigureSidebar = () => {
  const cellSize = useStore($gridSettings).cellSize;

  return (
    <>
      <Rect cellSize={cellSize} />
      <Square cellSize={cellSize} />
      <Circle cellSize={cellSize} />
      <Ellipse cellSize={cellSize} />
    </>
  );
};

export default FigureSidebar;
