import canvasTxt from "canvas-txt";
import {
  getDiagramsContext as ctx,
  getDiagramsCanvas as cnvs,
} from "../canvas";
import {
  POSITIONING_RECT_HEIGHT,
  POSITIONING_RECT_MARGIN,
  POSITIONING_RECT_WIDTH,
} from "../config";
import { RESIZER_RADIUS } from "../config";
import { Figure, FigureType } from "../Figure";

function drawRect(figure: Figure) {
  ctx().rect(figure.x, figure.y, figure.width, figure.height);
}

function drawCircle(figure: Figure) {
  const rX = figure.width / 2,
    rY = figure.height / 2,
    x = figure.x + rX,
    y = figure.y + rY;

  ctx().ellipse(x, y, rX, rY, 0, 0, Math.PI * 2);
}

export function clearAll() {
  ctx().clearRect(0, 0, cnvs().width, cnvs().height);
}

export function clear(figure: Figure, incrementalValue: number = 0) {
  ctx().clearRect(
    figure.x - incrementalValue,
    figure.y - incrementalValue,
    figure.width + incrementalValue * 2,
    figure.height + incrementalValue * 2
  );
}

export function clearWithResizers(figure: Figure) {
  const incrementalValue =
    RESIZER_RADIUS >= figure.lineSize ? RESIZER_RADIUS : figure.lineSize;
  ctx().clearRect(
    figure.x - incrementalValue,
    figure.y - incrementalValue,
    figure.width + incrementalValue * 2,
    figure.height + incrementalValue * 2
  );
}

const drawFigure = (figure: Figure) => {
  switch (figure.type) {
    case FigureType.RECTANGLE:
      drawRect(figure);
      break;
    case FigureType.ELLIPSE:
      drawCircle(figure);
      break;
  }
};

export function draw(figure: Figure) {
  ctx().save();
  ctx().fillStyle = figure.fillColor.current;
  ctx().strokeStyle = figure.strokeColor.current;
  ctx().lineWidth = figure.lineSize;
  ctx().globalAlpha = figure.opacity / 100;
  ctx().beginPath();
  drawFigure(figure);
  if (!figure.fillColor.isTransparent) {
    ctx().fill();
  }
  if (!figure.strokeColor.isTransparent && figure.lineSize !== 0) {
    ctx().stroke();
  }
  ctx().globalAlpha = 1;

  drawText(figure);

  ctx().restore();
}

export function drawText(figure: Figure) {
  const textSettings = figure.textSettings;
  ctx().fillStyle = textSettings.color.current;
  ctx().globalAlpha = textSettings.color.isTransparent
    ? 0
    : textSettings.opacity / 100;
  canvasTxt.vAlign = textSettings.baseline;
  canvasTxt.align = textSettings.align;
  canvasTxt.fontSize = textSettings.size;
  canvasTxt.fontStyle = `${textSettings.style.italic ? "italic" : ""}`;
  canvasTxt.fontWeight = `${textSettings.style.bold ? "bold" : ""}`;
  canvasTxt.drawText(
    ctx(),
    figure.text,
    figure.x,
    figure.y,
    figure.width,
    figure.height
  );
}

export function drawPositioningRectFigure(figure: Figure) {
  ctx().save();
  ctx().fillStyle = "#fff";
  const x = figure.x + figure.width / 2 - POSITIONING_RECT_WIDTH / 2;
  const y = figure.y + figure.height + POSITIONING_RECT_MARGIN;
  ctx().beginPath();
  ctx().rect(x, y, POSITIONING_RECT_WIDTH, POSITIONING_RECT_HEIGHT);
  ctx().fill();
  ctx().fillStyle = "#000";
  ctx().textAlign = "center";
  ctx().textBaseline = "middle";
  ctx().stroke();
  ctx().fillText(
    `${figure.x}, ${figure.y}`,
    x + POSITIONING_RECT_WIDTH / 2,
    y + POSITIONING_RECT_HEIGHT / 2
  );
  ctx().restore();
}

export function drawResizer(figure: Figure) {
  if (!figure.pickedResizer) return;
  ctx().save();

  ctx().strokeStyle = "blue";
  ctx().fillStyle = "blue";

  ctx().beginPath();
  ctx().arc(
    figure.pickedResizer.x,
    figure.pickedResizer.y,
    RESIZER_RADIUS,
    0,
    2 * Math.PI
  );
  ctx().fill();
  ctx().restore();
}

export function drawLineDash(figure: Figure) {
  ctx().save();

  ctx().strokeStyle = "blue";
  ctx().fillStyle = "blue";

  ctx().beginPath();
  ctx().setLineDash([2, 2]);
  ctx().rect(figure.x, figure.y, figure.width, figure.height);
  ctx().stroke();

  ctx().restore();
}

export function drawResizers(figure: Figure) {
  drawLineDash(figure);
  ctx().save();

  ctx().strokeStyle = "blue";
  ctx().fillStyle = "blue";

  for (const resizer of figure.resizers) {
    ctx().beginPath();
    ctx().arc(resizer.x, resizer.y, RESIZER_RADIUS, 0, 2 * Math.PI);
    ctx().fill();
  }

  ctx().restore();
}

export function redrawSelectedFigure(figure: Figure) {
  draw(figure);
  drawResizers(figure);
}
