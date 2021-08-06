type Position = {
  x: number;
  y: number;
};

type ColorType = {
  current: string;
  isTransparent: boolean;
};

type TextStyleType = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
};

type TextAlignType = "right" | "center" | "left";

type TextBaselineType = "top" | "middle" | "bottom";

type TextSettings = {
  align: TextAlignType;
  baseline: TextBaselineType;
  size: number;
  style: TextStyleType;
  orintation: "vertical" | "horizontal";
  color: ColorType;
  opacity: number;
};
