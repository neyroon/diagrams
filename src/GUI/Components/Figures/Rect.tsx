import React from "react";
import {
  FIGURE_HEIGHT,
  FIGURE_WIDTH,
  THUMBNAIL_FIGURE_HEIGHT,
  THUMBNAIL_FIGURE_WIDTH,
} from "../../../config";
import { FigureType } from "../../../Figure";
import DragFigure from "../DragFigure";

type RectProps = {
  cellSize: number;
};

const Rect: React.FC<RectProps> = ({ cellSize }) => {
  const nodeRef = React.useRef(null);
  return (
    <DragFigure
      type={FigureType.RECTANGLE}
      nodeRef={nodeRef}
      cellSize={cellSize}
      figureWidth={FIGURE_WIDTH}
      figureHeight={FIGURE_HEIGHT}
    >
      <svg
        ref={nodeRef}
        className="figure"
        width={THUMBNAIL_FIGURE_WIDTH}
        height={THUMBNAIL_FIGURE_HEIGHT}
      >
        <rect
          y={THUMBNAIL_FIGURE_HEIGHT / 4}
          width={THUMBNAIL_FIGURE_WIDTH}
          height={THUMBNAIL_FIGURE_HEIGHT / 2}
        ></rect>
      </svg>
    </DragFigure>
  );
};

export default Rect;
