import React from "react";
import {
  FIGURE_HEIGHT,
  FIGURE_WIDTH,
  THUMBNAIL_FIGURE_HEIGHT,
  THUMBNAIL_FIGURE_WIDTH,
} from "../../../config";
import { FigureType } from "../../../Figure";
import DragFigure from "../DragFigure";

type EllipseProps = {
  cellSize: number;
};

const Ellipse: React.FC<EllipseProps> = ({ cellSize }) => {
  const nodeRef = React.useRef(null);
  return (
    <DragFigure
      type={FigureType.ELLIPSE}
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
        <ellipse
          cx={THUMBNAIL_FIGURE_WIDTH / 2}
          cy={THUMBNAIL_FIGURE_HEIGHT / 2}
          rx={THUMBNAIL_FIGURE_WIDTH / 2 - 1}
          ry={THUMBNAIL_FIGURE_HEIGHT / 3}
        ></ellipse>
      </svg>
    </DragFigure>
  );
};

export default Ellipse;
