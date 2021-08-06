const parent = document.getElementById("app") as HTMLDivElement;

const grid = document.getElementById("grid") as HTMLCanvasElement;
const gridContext = grid.getContext("2d") as CanvasRenderingContext2D;

const diagrams = document.getElementById("diagrams") as HTMLCanvasElement;
const diagramsContext = diagrams.getContext("2d") as CanvasRenderingContext2D;

const common = document.getElementById("common") as HTMLCanvasElement;
const commonContext = common.getContext("2d") as CanvasRenderingContext2D;

export const getCanvasesParent = () => parent;

export const getCanvasesSize = (): { width: number; height: number } => ({
  width: grid.width,
  height: grid.height,
});

export const getDiagramsCanvas = () => diagrams;

export const getGridCanvas = () => grid;

export const getCommonCanvas = () => common;

export const getDiagramsContext = () => diagramsContext;

export const getGridContext = () => gridContext;

export const getCommonContext = () => commonContext;

export const setCanvasesSize = (width: number, height: number) => {
  diagrams.width = width;
  diagrams.height = height;

  grid.width = width;
  grid.height = height;

  common.width = width;
  common.height = height;
};
