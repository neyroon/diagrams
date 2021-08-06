import { createStore } from "effector";
import {
  CELL_SIZE,
  GRID_STROKE_COLOR,
  GRID_BACKGROUND_COLOR,
} from "../../config";
import { Figure } from "../../Figure";
import { Field } from "../../typings/field";
import { createField } from "../../utils";

export const $gridSettings = createStore<{
  isGridEnable: boolean;
  cellSize: number;
  strokeColor: string;
  backgroundColor: string;
}>({
  isGridEnable: true,
  cellSize: CELL_SIZE,
  strokeColor: GRID_STROKE_COLOR,
  backgroundColor: GRID_BACKGROUND_COLOR,
});

export const $field = createStore<Field>(createField(CELL_SIZE));
export const $selectedFigures = createStore<Array<Figure>>([]);
export const $mouseData = createStore<MouseData>({
  isMouseDown: false,
  isMoving: false,
  offset: { x: 0, y: 0 },
  x: 0,
  y: 0,
});
export const $figures = createStore<Array<Figure>>([]);
export const $editableFigure = createStore<Figure | null>(null);
