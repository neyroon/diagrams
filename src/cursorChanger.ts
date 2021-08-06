import { ResizerPosition } from "./Figure";

export enum CursorStyle {
  DEFAULT = "default",
  MOVE = "move",
  E_RESIZE = "e-resize",
  N_RESIZE = "n-resize",
  NE_RESIZE = "ne-resize",
  NW_RESIZE = "nw-resize",
}

export const changeCursorStyle = (style: CursorStyle) =>
  (document.body.style.cursor = style);

export const changeCursorStyleByPosition = (position: ResizerPosition) => {
  switch (position) {
    case ResizerPosition.TOP_LEFT:
      changeCursorStyle(CursorStyle.NW_RESIZE);
      break;
    case ResizerPosition.TOP_MIDDLE:
      changeCursorStyle(CursorStyle.N_RESIZE);
      break;
    case ResizerPosition.TOP_RIGHT:
      changeCursorStyle(CursorStyle.NE_RESIZE);
      break;
    case ResizerPosition.MIDLLE_LEFT:
      changeCursorStyle(CursorStyle.E_RESIZE);
      break;
    case ResizerPosition.MIDDLE_RIGHT:
      changeCursorStyle(CursorStyle.E_RESIZE);
      break;
    case ResizerPosition.BOTTOM_LEFT:
      changeCursorStyle(CursorStyle.NE_RESIZE);
      break;
    case ResizerPosition.BOTTOM_MIDDLE:
      changeCursorStyle(CursorStyle.N_RESIZE);
      break;
    case ResizerPosition.BOTTOM_RIGHT:
      changeCursorStyle(CursorStyle.NW_RESIZE);
      break;
    default:
      changeCursorStyle(CursorStyle.DEFAULT);
      break;
  }
};
