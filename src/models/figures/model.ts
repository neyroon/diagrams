import { Direction, Figure, Resizer, ResizerPosition } from "./../../Figure";
import { clear, redrawSelectedFigure } from "../../renderers/figure";
import { $selectedFigures, $gridSettings } from "../diagrams/index";
import {
  changeFillColor,
  changeOpacity,
  changeLineColor,
  changeLineSize,
  changeText,
  changeTextSettings,
  resize,
  setResizers,
} from "./events";
import { sample } from "effector";

sample($gridSettings, resize, (gridSettings, resizeParams) => ({
  cellSize: gridSettings.cellSize,
  ...resizeParams,
})).watch(({ cellSize, figure, x, y }) => {
  let flag: boolean = false;

  switch (figure?.pickedResizer?.type) {
    case ResizerPosition.TOP_MIDDLE:
      flag = figure.resizeVertically(y, Direction.TOP, cellSize);
      break;

    case ResizerPosition.BOTTOM_MIDDLE:
      flag = figure.resizeVertically(y, Direction.BOTTOM, cellSize);
      break;

    case ResizerPosition.MIDLLE_LEFT:
      flag = figure.resizeHorizontally(x, Direction.LEFT, cellSize);
      break;

    case ResizerPosition.MIDDLE_RIGHT:
      flag = figure.resizeHorizontally(x, Direction.RIGHT, cellSize);
      break;

    case ResizerPosition.TOP_LEFT:
      flag =
        figure.resizeHorizontally(x, Direction.LEFT, cellSize) ||
        figure.resizeVertically(y, Direction.TOP, cellSize) ||
        false;
      break;

    case ResizerPosition.TOP_RIGHT:
      flag =
        figure.resizeHorizontally(x, Direction.RIGHT, cellSize) ||
        figure.resizeVertically(y, Direction.TOP, cellSize) ||
        false;
      break;

    case ResizerPosition.BOTTOM_LEFT:
      flag =
        figure.resizeHorizontally(x, Direction.LEFT, cellSize) ||
        figure.resizeVertically(y, Direction.BOTTOM, cellSize) ||
        false;
      break;
    case ResizerPosition.BOTTOM_RIGHT:
      flag =
        figure.resizeHorizontally(x, Direction.RIGHT, cellSize) ||
        figure.resizeVertically(y, Direction.BOTTOM, cellSize) ||
        false;
      break;
  }

  figure.needArrange = flag;
});

sample($gridSettings, setResizers, (gridSettings, figure) => ({
  cellSize: gridSettings.cellSize,
  figure,
})).watch(({ cellSize, figure }) => {
  figure.resizers = [
    new Resizer(
      figure.x - cellSize,
      figure.y - cellSize,
      ResizerPosition.TOP_LEFT
    ),
    new Resizer(
      figure.x + figure.width / 2,
      figure.y - cellSize,
      ResizerPosition.TOP_MIDDLE
    ),
    new Resizer(
      figure.x + figure.width + cellSize,
      figure.y - cellSize,
      ResizerPosition.TOP_RIGHT
    ),
    new Resizer(
      figure.x - cellSize,
      figure.y + figure.height / 2,
      ResizerPosition.MIDLLE_LEFT
    ),
    new Resizer(
      figure.x + figure.width + cellSize,
      figure.y + figure.height / 2,
      ResizerPosition.MIDDLE_RIGHT
    ),
    new Resizer(
      figure.x - cellSize,
      figure.y + figure.height + cellSize,
      ResizerPosition.BOTTOM_LEFT
    ),
    new Resizer(
      figure.x + figure.width / 2,
      figure.y + figure.height + cellSize,
      ResizerPosition.BOTTOM_MIDDLE
    ),
    new Resizer(
      figure.x + figure.width + cellSize,
      figure.y + figure.height + cellSize,
      ResizerPosition.BOTTOM_RIGHT
    ),
  ];
});

const redraw = (figure: Figure) => {
  const lineSize = figure.lineSize > 1 ? figure.lineSize : 0;
  clear(figure, lineSize);
  redrawSelectedFigure(figure);
};

$selectedFigures.on(changeFillColor, (figures, color) => {
  for (const figure of figures) {
    color
      ? (figure.fillColor = { current: color, isTransparent: false })
      : (figure.fillColor.isTransparent = true);
    redraw(figure);
  }
  return [...figures];
});

$selectedFigures.on(changeOpacity, (figures, opacity) => {
  for (const figure of figures) {
    figure.opacity = opacity;
    redraw(figure);
  }
  return [...figures];
});

$selectedFigures.on(changeLineColor, (figures, color) => {
  for (const figure of figures) {
    color
      ? (figure.strokeColor = { current: color, isTransparent: false })
      : (figure.strokeColor.isTransparent = true);
    redraw(figure);
  }
  return [...figures];
});

$selectedFigures.on(changeLineSize, (figures, size) => {
  for (const figure of figures) {
    figure.lineSize = size;
    redraw(figure);
  }
  return [...figures];
});

$selectedFigures.on(changeText, (figures, text) => {
  const figure = figures[0];
  figure.text = text;
  redraw(figure);
  return [figure];
});

$selectedFigures.on(changeTextSettings, (figures, settings) => {
  const figure = figures[0];

  figure.textSettings = settings;
  redraw(figure);
  return [figure];
});
