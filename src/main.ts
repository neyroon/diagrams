import { signControlEvents } from "./control";
import { setCanvasesSize, getCanvasesParent } from "./canvas";
import { renderGUI } from "./GUI";
import { drawGrid } from "./models/diagrams/index";
import "./style.scss";

drawGrid();

renderGUI();

setCanvasesSize(
  getCanvasesParent().offsetWidth,
  getCanvasesParent().offsetHeight
);

window.addEventListener("resize", () => {
  setCanvasesSize(
    getCanvasesParent().offsetWidth,
    getCanvasesParent().offsetHeight
  );
  drawGrid();
});

signControlEvents();
