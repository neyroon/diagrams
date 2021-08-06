import { clearWithResizers } from "./renderers/figure";
import { FIGURE_INITIAL_TEXT_SETTINGS, RESIZER_RADIUS } from "./config";
import { setResizers } from "./models/figures";

export enum FigureType {
  RECTANGLE,
  ELLIPSE,
}

export enum Direction {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}

export enum ResizerPosition {
  TOP_LEFT,
  TOP_MIDDLE,
  TOP_RIGHT,
  MIDLLE_LEFT,
  MIDDLE_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_MIDDLE,
  BOTTOM_RIGHT,
}

export class Resizer {
  constructor(
    public x: number,
    public y: number,
    public type: ResizerPosition
  ) {}
}

export class Figure {
  public resizers: Array<Resizer> = [];
  public pickedResizer: Resizer | null = null;
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public type: FigureType = FigureType.RECTANGLE,
    public needArrange: boolean = false,
    public fillColor: ColorType = {
      current: "#fff",
      isTransparent: false,
    },
    public text: string = "",
    public textSettings: TextSettings = FIGURE_INITIAL_TEXT_SETTINGS,
    public isTextEditing: boolean = false,
    public opacity: number = 100,
    public strokeColor: ColorType = {
      current: "#000",
      isTransparent: false,
    },
    public lineSize: number = 1
  ) {
    setResizers(this);
  }

  flipResizer(resizer: Resizer): Resizer {
    const temp = this.resizers.find((r) => resizer.type === r.type);
    if (!temp) return resizer;
    const index = this.resizers.indexOf(temp);
    return this.resizers[this.resizers.length - 1 - index];
  }

  pickResizer(x: number, y: number) {
    this.pickedResizer = this.hoveredResizer(x, y);
  }

  resizeVertically(y: number, dir: Direction, cellSize: number): boolean {
    if (!this.pickedResizer) return false;
    const diff = this.pickedResizer.y - y;

    if (!(Math.abs(diff) > cellSize / 2)) return false;

    clearWithResizers(this);
    dir === Direction.TOP
      ? this.resizeVerticallyTop(diff, cellSize)
      : this.resizeVerticallyBottom(diff, cellSize);

    setResizers(this);

    if (this.height < 0) {
      this.height = Math.abs(this.height);
      this.y -= this.height;
      setResizers(this);
      this.pickedResizer = this.flipResizer(this.pickedResizer);
    }

    return true;
  }

  resizeHorizontally(x: number, dir: Direction, cellSize: number): boolean {
    if (!this.pickedResizer) return false;

    const diff = this.pickedResizer.x - x;
    if (!(Math.abs(diff) > cellSize / 2)) return false;
    clearWithResizers(this);
    dir === Direction.LEFT
      ? this.resizeHorizontallyLeft(diff, cellSize)
      : this.resizeHorizontallyRight(diff, cellSize);
    setResizers(this);

    if (this.width < 0) {
      this.width = Math.abs(this.width);
      this.x -= this.width;
      setResizers(this);
      this.pickedResizer = this.flipResizer(this.pickedResizer);
    }

    return true;
  }

  resizeVerticallyTop(diff: number, cellSize: number) {
    if (!this.pickedResizer) return;

    if (diff > 0) {
      this.y -= cellSize;
      this.pickedResizer.y -= cellSize;
      this.height += cellSize;
    } else {
      this.y += cellSize;
      this.pickedResizer.y += cellSize;
      this.height -= cellSize;
    }
  }

  resizeVerticallyBottom(diff: number, cellSize: number) {
    if (!this.pickedResizer) return;

    if (diff > 0) {
      this.pickedResizer.y -= cellSize;
      this.height -= cellSize;
    } else {
      this.pickedResizer.y += cellSize;
      this.height += cellSize;
    }
  }

  resizeHorizontallyLeft(diff: number, cellSize: number) {
    if (!this.pickedResizer) return;
    if (diff > 0) {
      this.x -= cellSize;
      this.pickedResizer.x -= cellSize;
      this.width += cellSize;
    } else {
      this.x += cellSize;
      this.pickedResizer.x += cellSize;
      this.width -= cellSize;
    }
  }

  resizeHorizontallyRight(diff: number, cellSize: number) {
    if (!this.pickedResizer) return;
    if (diff > 0) {
      this.pickedResizer.x -= cellSize;
      this.width -= cellSize;
    } else {
      this.pickedResizer.x += cellSize;
      this.width += cellSize;
    }
  }

  isPicked(x: number, y: number) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

  move(x: number, y: number) {
    this.x = x;
    this.y = y;
    setResizers(this);
  }

  hoveredResizer(x: number, y: number): Resizer | null {
    let result: Resizer | null = null;

    for (const resizer of this.resizers) {
      if (
        x >= resizer.x - RESIZER_RADIUS &&
        x <= resizer.x + RESIZER_RADIUS &&
        y >= resizer.y - RESIZER_RADIUS &&
        y <= resizer.y + RESIZER_RADIUS
      ) {
        result = resizer;
        break;
      }
    }

    return result;
  }
}
