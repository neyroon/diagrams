import { createEvent, Event } from "effector";
import { Figure } from "../../Figure";

export const throughFigureCells: Event<{
  figure: Figure;
  func: (y: number, x: number) => void;
  x: number;
  y: number;
}> = createEvent();
export const arrangeFigure: Event<{
  figure: Figure;
  initX: number;
  initY: number;
}> = createEvent();
export const clearLocationFigure: Event<{
  figure: Figure;
  initX: number;
  initY: number;
}> = createEvent();
export const ascentFigure: Event<Figure> = createEvent();

export const addFigure: Event<Figure> = createEvent();

export const popSelectedFigure: Event<void> = createEvent();
export const changeSelectedFigure: Event<Figure> = createEvent();
export const addToSelectedFigures: Event<Figure> = createEvent();

export const setMouseData: Event<Partial<MouseData>> = createEvent();

export const mouseDown: Event<{ x: number; y: number }> = createEvent();
export const mouseUp: Event<void> = createEvent();
export const mouseMove: Event<{ x: number; y: number }> = createEvent();
export const mouseDbl: Event<{ x: number; y: number }> = createEvent();

export const resetEditableFigure: Event<void> = createEvent();

export const keydown: Event<KeyboardEvent> = createEvent();

export const pickFigure: Event<{ x: number; y: number }> = createEvent();
export const redrawFigures: Event<void> = createEvent();

export const drawGrid: Event<void> = createEvent();
export const redrawGrid: Event<{
  isGridEnable: boolean;
  cellSize: number;
  strokeColor: string;
  backgroundColor: string;
}> = createEvent();

export const moveFigureToFront = createEvent<void>();
export const moveFigureToBack = createEvent<void>();
export const bringFigureForward = createEvent<void>();
export const sendFigureBack = createEvent<void>();
