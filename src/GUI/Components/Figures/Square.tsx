import React from "react";
import {
  FIGURE_HEIGHT,
  FIGURE_WIDTH,
  THUMBNAIL_FIGURE_HEIGHT,
  THUMBNAIL_FIGURE_WIDTH,
} from "../../../config";
import { FigureType } from "../../../Figure";
import DragFigure from "../DragFigure";

type SquareProps = {
  cellSize: number;
};

const Square: React.FC<SquareProps> = ({ cellSize }) => {
  const nodeRef = React.useRef(null);
  return (
    <DragFigure
      type={FigureType.RECTANGLE}
      nodeRef={nodeRef}
      cellSize={cellSize}
      figureWidth={FIGURE_HEIGHT}
      figureHeight={FIGURE_HEIGHT}
    >
      <svg
        ref={nodeRef}
        className="figure"
        width={THUMBNAIL_FIGURE_HEIGHT}
        height={THUMBNAIL_FIGURE_HEIGHT}
      >
        <rect
          width={THUMBNAIL_FIGURE_HEIGHT}
          height={THUMBNAIL_FIGURE_HEIGHT}
        ></rect>
      </svg>
    </DragFigure>
  );
};

export default Square;
