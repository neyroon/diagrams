import { getCanvasesSize } from "./canvas";
import { Field } from "./typings/field";

export function createField(cellSize: number): Field {
  return Array.from(
    Array(Math.trunc(getCanvasesSize().height / cellSize)),
    (_) =>
      Array.from(
        Array(Math.trunc(getCanvasesSize().width / cellSize)),
        (_) => []
      )
  );
}

export function copyField(field: Field): Field {
  const newField: Field = [];

  for (let i = 0; i < field.length; i++) {
    const row = [];

    for (let j = 0; j < field[i].length; j++) {
      const col = [];

      for (let k = 0; k < field[i][j].length; k++) {
        col.push(field[i][j][k]);
      }

      row.push(col);
    }

    newField.push(row);
  }

  return newField;
}

export function normalizeCoordinate(coordinate: number, CELL_SIZE: number) {
  return Math.trunc(coordinate / CELL_SIZE);
}

export function normalizeMoveCoordinate(coordinate: number, CELL_SIZE: number) {
  return normalizeCoordinate(coordinate, CELL_SIZE) * CELL_SIZE;
}
