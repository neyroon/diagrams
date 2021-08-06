import {
  arrangeFigure,
  clearLocationFigure,
  ascentFigure,
  addFigure,
  changeSelectedFigure,
  popSelectedFigure,
  setMouseData,
  mouseDown,
  pickFigure,
  mouseUp,
  mouseMove,
  drawGrid,
  redrawGrid,
  addToSelectedFigures,
  mouseDbl,
  redrawFigures,
  keydown,
  resetEditableFigure,
  throughFigureCells,
  moveFigureToFront,
  moveFigureToBack,
  bringFigureForward,
  sendFigureBack,
} from "./events";
import {
  $editableFigure,
  $field,
  $figures,
  $gridSettings,
  $mouseData,
  $selectedFigures,
} from "./store";
import {
  copyField,
  createField,
  normalizeCoordinate,
  normalizeMoveCoordinate,
} from "../../utils";
import {
  clearAll,
  clearWithResizers,
  draw,
  drawLineDash,
  drawResizer,
  drawResizers,
  redrawSelectedFigure,
  drawPositioningRectFigure,
} from "../../renderers/figure";
import { combine, sample } from "effector";
import { getCanvasesSize } from "../../canvas";
import {
  changeCursorStyle,
  changeCursorStyleByPosition,
  CursorStyle,
} from "../../cursorChanger";
import { drawGrid as DrawGrid } from "../../renderers/grid";
import { resize } from "../figures";

sample($gridSettings, throughFigureCells, (gridSettings, eventParams) => ({
  cellSize: gridSettings.cellSize,
  ...eventParams,
})).watch(({ cellSize, figure, func, x, y }) => {
  for (
    let i = normalizeCoordinate(y, cellSize);
    i < normalizeCoordinate(y + figure.height, cellSize);
    i++
  ) {
    for (
      let j = normalizeCoordinate(x, cellSize);
      j < normalizeCoordinate(x + figure.width, cellSize);
      j++
    ) {
      func(i, j);
    }
  }
});

$field
  .on(arrangeFigure, (field, { figure, initX, initY }) => {
    const newField = copyField(field);
    throughFigureCells({
      figure,
      func: (y, x) => {
        newField[y][x].push(figure);
      },
      x: initX,
      y: initY,
    });
    return newField;
  })
  .on(clearLocationFigure, (field, { figure, initX, initY }) => {
    const newField = copyField(field);
    throughFigureCells({
      figure,
      func: (y, x) => {
        const cell = newField[y][x];
        cell.pop();
      },
      x: initX,
      y: initY,
    });

    return newField;
  })
  .on(ascentFigure, (field, figure) => {
    const newField = copyField(field);
    throughFigureCells({
      figure,
      func: (y, x) => {
        const cell = newField[y][x];
        if (cell.length > 1) {
          const index = cell.indexOf(figure);
          const figureFromCell = cell.splice(index, 1)[0];
          cell.push(figureFromCell);
        }
      },
      x: figure.x,
      y: figure.y,
    });
    return newField;
  })
  .on(
    sample($figures, redrawGrid, (figures, redrawGridParams) => ({
      figures,
      ...redrawGridParams,
    })),
    (field, { figures, cellSize }) => {
      const newField = createField(cellSize);
      for (const figure of figures) {
        throughFigureCells({
          figure,
          func: (y, x) => {
            newField[y][x].push(figure);
          },
          x: figure.x,
          y: figure.y,
        });
      }

      return newField;
    }
  )
  .on(
    sample(
      combine({
        selectedFigures: $selectedFigures,
        gridSettings: $gridSettings,
      }),
      moveFigureToFront
    ),
    (field, { selectedFigures, gridSettings }) => {
      const newField = createField(gridSettings.cellSize);
      for (const figure of selectedFigures) {
        throughFigureCells({
          figure,
          func: (y, x) => {
            const correctY = normalizeCoordinate(y, gridSettings.cellSize);
            const correctX = normalizeCoordinate(x, gridSettings.cellSize);
            const figures = newField[correctX][correctY];
            const idx = figures.indexOf(figure);
            if (idx >= figures.length - 1) return;
            let tmp = figures[idx];
            figures[idx] = figures[idx + 1];
            figures[idx + 1] = tmp;
          },
          x: figure.x,
          y: figure.y,
        });
      }
      return newField;
    }
  )
  .on(
    sample(
      combine({
        selectedFigures: $selectedFigures,
        gridSettings: $gridSettings,
      }),
      moveFigureToBack
    ),
    (field, { selectedFigures, gridSettings }) => {
      const newField = createField(gridSettings.cellSize);
      for (const figure of selectedFigures) {
        throughFigureCells({
          figure,
          func: (y, x) => {
            const correctY = normalizeCoordinate(y, gridSettings.cellSize);
            const correctX = normalizeCoordinate(x, gridSettings.cellSize);
            const figures = newField[correctX][correctY];
            const idx = figures.indexOf(figure);
            if (idx <= 0) return;
            let tmp = figures[idx];
            figures[idx] = figures[idx - 1];
            figures[idx - 1] = tmp;
          },
          x: figure.x,
          y: figure.y,
        });
      }
      return newField;
    }
  );

$selectedFigures
  .on(addToSelectedFigures, (figures, figure) => [...figures, figure])
  .on(changeSelectedFigure, (figures, figure) => {
    for (const f of figures) {
      clearWithResizers(f);
      draw(f);
    }
    return [figure];
  })
  .on(popSelectedFigure, (figures) => {
    const newFigures = [...figures];
    newFigures.pop();
    return newFigures;
  });

$mouseData.on(setMouseData, (mouseData, newMouseData) => ({
  ...mouseData,
  ...newMouseData,
}));

$figures
  .on(addFigure, (figures, figure) => {
    const newFigures = [...figures];
    newFigures.push(figure);
    return newFigures;
  })
  .on(
    sample($selectedFigures, moveFigureToFront),
    (figures, selectedFigures) => {
      const newFigures = [...figures];
      for (const figure of selectedFigures) {
        const idx = newFigures.indexOf(figure);
        if (idx >= newFigures.length - 1) return;
        let tmp = newFigures[idx];
        newFigures[idx] = newFigures[idx + 1];
        newFigures[idx + 1] = tmp;
      }
      return newFigures;
    }
  )
  .on(
    sample($selectedFigures, moveFigureToBack),
    (figures, selectedFigures) => {
      const newFigures = [...figures];
      for (const figure of selectedFigures) {
        const idx = newFigures.indexOf(figure);
        if (idx <= 0) return;
        let tmp = newFigures[idx];
        newFigures[idx] = newFigures[idx - 1];
        newFigures[idx - 1] = tmp;
      }
      return newFigures;
    }
  );

$editableFigure
  .on(
    sample(
      combine({ field: $field, gridSettings: $gridSettings }),
      mouseDbl,
      ({ field, gridSettings }, { x, y }) => ({ field, gridSettings, x, y })
    ),
    (_, { field, gridSettings, x, y }) => {
      const correctY = normalizeCoordinate(y, gridSettings.cellSize);
      const correctX = normalizeCoordinate(x, gridSettings.cellSize);
      const figures = field[correctY][correctX];
      const figure = figures[figures.length - 1];
      if (figure) {
        figure.isTextEditing = true;
      }
      return figure;
    }
  )
  .on(resetEditableFigure, (figure) => {
    if (figure) {
      figure.isTextEditing = false;
    }
    return null;
  });

sample($editableFigure, keydown, (figure, e) => ({ figure, e })).watch(
  ({ figure, e }) => {
    if (figure) {
      if (e.key.length === 1) {
        figure.text += e.key;
      } else {
        switch (e.key) {
          case "Backspace":
            figure.text = figure.text.slice(0, -1);
            break;
          case "Enter":
            figure.text += "\n";
            break;
        }
      }
      redrawSelectedFigure(figure);
    }
  }
);

addFigure.watch((figure) => {
  arrangeFigure({ figure, initX: figure.x, initY: figure.y });
  changeSelectedFigure(figure);
  redrawFigures();
});

sample($figures, [$figures, redrawFigures]).watch((figures) => {
  clearAll();
  for (const figure of figures) {
    draw(figure);
  }
});

sample($selectedFigures, mouseDown, (selectedFigures, { x, y }) => ({
  selectedFigures,
  x,
  y,
})).watch(({ selectedFigures, x, y }) => {
  if (selectedFigures.length > 0) {
    const figure = selectedFigures[0];
    figure.pickResizer(x, y);
    if (!figure.isPicked(x, y) && !figure.hoveredResizer(x, y)) {
      redrawFigures();
      popSelectedFigure();
    } else {
      setMouseData({
        offset: { x: x - figure.x, y: y - figure.y },
        isMouseDown: true,
      });
      resetEditableFigure();
      return;
    }
  }
  pickFigure({ x, y });
});

sample(
  combine({ field: $field, gridSettings: $gridSettings }),
  pickFigure,
  ({ field, gridSettings }, { x, y }) => ({
    field,
    gridSettings,
    x,
    y,
  })
).watch(({ field, gridSettings, x, y }) => {
  const correctY = normalizeCoordinate(y, gridSettings.cellSize);
  const correctX = normalizeCoordinate(x, gridSettings.cellSize);
  const figures = field[correctY][correctX];
  const figure = figures[figures.length - 1];
  if (!figure) return;

  redrawSelectedFigure(figure);

  ascentFigure(figure);
  changeSelectedFigure(figure);
  setMouseData({
    x: figure.x,
    y: figure.y,
    offset: { x: x - figure.x, y: y - figure.y },
    isMouseDown: true,
  });
});

sample(
  combine({ selectedFigures: $selectedFigures, mouseData: $mouseData }),
  mouseUp
).watch(({ selectedFigures, mouseData }) => {
  const figure = selectedFigures[0];

  if (figure) {
    drawResizers(figure);
    figure.pickedResizer = null;
  }
  if (mouseData.isMoving) {
    clearLocationFigure({ figure, initX: mouseData.x, initY: mouseData.y });
    arrangeFigure({ figure, initX: figure.x, initY: figure.y });
    redrawFigures();
    setMouseData({
      x: figure.x,
      y: figure.y,
      isMoving: false,
    });
  }
  setMouseData({
    isMouseDown: false,
  });
});

sample(
  combine({
    selectedFigures: $selectedFigures,
    mouseData: $mouseData,
    gridSettings: $gridSettings,
  }),
  mouseMove,
  ({ selectedFigures, mouseData, gridSettings }, { x, y }) => ({
    selectedFigures,
    mouseData,
    gridSettings,
    x,
    y,
  })
).watch(({ selectedFigures, mouseData, gridSettings, x, y }) => {
  const figure = selectedFigures[0];

  if (!figure) {
    changeCursorStyle(CursorStyle.DEFAULT);
    return;
  }

  if (figure.pickedResizer) {
    changeCursorStyleByPosition(figure.pickedResizer.type);
    resize({ figure, x, y });

    if (figure.needArrange) {
      clearLocationFigure({ figure, initX: mouseData.x, initY: mouseData.y });
      redrawFigures();
      drawResizer(figure);
      arrangeFigure({ figure, initX: mouseData.x, initY: mouseData.y });
      setMouseData({
        x: figure.x,
        y: figure.y,
      });
      figure.needArrange = false;
    }

    return;
  }

  if (!mouseData.isMouseDown) {
    let resizer = figure.hoveredResizer(x, y);

    if (resizer) {
      changeCursorStyleByPosition(resizer.type);
    } else if (figure.isPicked(x, y)) {
      changeCursorStyle(CursorStyle.MOVE);
    } else {
      changeCursorStyle(CursorStyle.DEFAULT);
    }
    return;
  }

  let correctX = normalizeMoveCoordinate(
      x - mouseData.offset.x,
      gridSettings.cellSize
    ),
    correctY = normalizeMoveCoordinate(
      y - mouseData.offset.y,
      gridSettings.cellSize
    );

  if (correctX <= 0) correctX = 1;
  else if (correctX + figure.width >= getCanvasesSize().width)
    correctX = getCanvasesSize().width - figure.width;

  if (correctY <= 0) correctY = 1;
  else if (correctY + figure.height >= getCanvasesSize().height)
    correctY = getCanvasesSize().height - figure.height;

  if (figure.x !== correctX || figure.y !== correctY) {
    figure.move(correctX, correctY);
    redrawFigures();
    drawLineDash(figure);
    drawPositioningRectFigure(figure);
    mouseData.isMoving = true;
  }
});

sample($gridSettings, drawGrid).watch((settings) => {
  DrawGrid(
    { size: settings.cellSize },
    { size: settings.cellSize * 4 },
    settings.strokeColor
  );
});

$gridSettings.on(redrawGrid, (_, settings) => {
  console.log("grid");
  DrawGrid(
    { size: settings.cellSize },
    { size: settings.cellSize * 4 },
    settings.strokeColor,
    settings.backgroundColor,
    settings.isGridEnable
  );
  return { ...settings };
});
