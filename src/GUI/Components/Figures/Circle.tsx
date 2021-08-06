import React from "react";
import {
  CIRCLE_SIZE,
  THUMBNAIL_CIRCLE_SIZE,
  THUMBNAIL_FIGURE_HEIGHT,
  THUMBNAIL_FIGURE_WIDTH,
} from "../../../config";
import { FigureType } from "../../../Figure";
import DragFigure from "../DragFigure";

type CircleProps = {
  cellSize: number;
};

const Circle: React.FC<CircleProps> = ({ cellSize }) => {
  const nodeRef = React.useRef(null);
  return (
    <DragFigure
      type={FigureType.ELLIPSE}
      nodeRef={nodeRef}
      cellSize={cellSize}
      figureWidth={CIRCLE_SIZE}
      figureHeight={CIRCLE_SIZE}
    >
      <svg
        ref={nodeRef}
        className="figure"
        width={THUMBNAIL_FIGURE_WIDTH}
        height={THUMBNAIL_FIGURE_HEIGHT}
      >
        <circle
          cx={THUMBNAIL_FIGURE_WIDTH / 2}
          cy={THUMBNAIL_FIGURE_HEIGHT / 2}
          r={THUMBNAIL_CIRCLE_SIZE / 2 - 2}
        ></circle>
      </svg>
    </DragFigure>
  );
};

export default Circle;
