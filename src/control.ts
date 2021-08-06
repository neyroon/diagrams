import { getDiagramsCanvas } from "./canvas";
import {
  mouseDown,
  mouseUp,
  mouseMove,
  mouseDbl,
  keydown,
} from "./models/diagrams/index";

export function signControlEvents() {
  const diagrams = getDiagramsCanvas();
  diagrams.addEventListener("mousedown", (e) =>
    mouseDown({ x: e.offsetX, y: e.offsetY })
  );
  diagrams.addEventListener("mousemove", (e) =>
    mouseMove({ x: e.offsetX, y: e.offsetY })
  );
  diagrams.addEventListener("mouseup", () => mouseUp());
  diagrams.addEventListener("mouseleave", () => mouseUp());
  diagrams.addEventListener("dblclick", (e) =>
    mouseDbl({ x: e.offsetX, y: e.offsetY })
  );

  document.addEventListener("keydown", (e: KeyboardEvent) => keydown(e));
}
