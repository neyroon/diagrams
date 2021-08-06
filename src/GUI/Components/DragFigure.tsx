import React, { useState } from "react";
import Draggable from "react-draggable";
import { Figure, FigureType } from "../../Figure";
import { addFigure } from "../../models/diagrams/index";
import { normalizeMoveCoordinate } from "../../utils";

type DragFigureProps = {
  type: FigureType;
  nodeRef: React.MutableRefObject<null>;
  children: React.ReactElement;
  cellSize: number;
  figureWidth: number;
  figureHeight: number;
};

const DragFigure: React.FC<DragFigureProps> = ({
  figureWidth,
  figureHeight,
  cellSize,
  nodeRef,
  type,
  children,
}) => {
  const [canvas, setCanvas] = useState<Element | null>(null);
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [margin, setMargin] = useState<Position>({
    x: 0,
    y: 0,
  });

  const onStartHandler = () => {
    const { x, y } = nodeRef.current.getBoundingClientRect();
    setMargin({ x, y });
  };

  const onDragHandler = (e) => {
    const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
    if (!elemBelow) return;
    if (elemBelow.id === "diagrams") {
      const { x, y } = elemBelow.getBoundingClientRect();

      if (canvas) {
        const correctX =
            x + normalizeMoveCoordinate(e.clientX - x, cellSize) - margin.x,
          correctY =
            y + normalizeMoveCoordinate(e.clientY - y, cellSize) - margin.y;

        if (correctX !== position.x || correctY !== position.y) {
          setPosition({ x: correctX, y: correctY });
        }
        return;
      }

      const correctX = x - margin.x;
      const correctY = y + normalizeMoveCoordinate(position.y - y, cellSize);
      setPosition({ x: correctX, y: correctY });
      setCanvas(elemBelow);
    } else {
      setPosition({ x: e.clientX - margin.x, y: e.clientY - margin.y });
      setCanvas(null);
    }
  };

  const onStopHandler = (e) => {
    setPosition({ x: 0, y: 0 });
    if (!canvas) return;
    const { x, y } = canvas.getBoundingClientRect();
    addFigure(
      new Figure(
        normalizeMoveCoordinate(e.clientX - x, cellSize),
        normalizeMoveCoordinate(e.clientY - y, cellSize),
        figureWidth,
        figureHeight,
        type
      )
    );
  };
  return (
    <Draggable
      axis="none"
      position={position}
      nodeRef={nodeRef}
      onStart={onStartHandler}
      onDrag={onDragHandler}
      onStop={onStopHandler}
    >
      {children}
    </Draggable>
  );
};

export default DragFigure;
