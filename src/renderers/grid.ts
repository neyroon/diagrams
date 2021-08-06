import { getGridContext, getGridCanvas } from "../canvas";

type CellSettings = {
  size: number;
  strokeWidth?: number;
};

export const drawGrid = (
  smallCellSettings: CellSettings,
  bigCellSettings: CellSettings,
  strokeColor: string = "gray",
  backgroundColor: string = "white",
  isGridEnable: boolean = true
) => {
  const ctx = getGridContext();

  const fillBackground = () => {
    const { width, height } = getGridCanvas();
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  };

  if (!isGridEnable) {
    fillBackground();
    return;
  }

  const { size: smallSize, strokeWidth: smallStrokeWidth = 0.5 } =
    smallCellSettings;

  const { size: bigSize, strokeWidth: bigStrokeWidth = 1 } = bigCellSettings;

  const grid = `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> 
      <defs> 
          <pattern id="smallGrid" width="${smallSize}" height="${smallSize}" patternUnits="userSpaceOnUse"> 
              <path 
                d="M ${smallSize} 0 L 0 0 0 ${smallSize}" 
                fill="none" 
                stroke="${strokeColor}"
                stroke-width="${smallStrokeWidth}"
              /> 
          </pattern> 
          <pattern id="grid" width="${bigSize}" height="${bigSize}" patternUnits="userSpaceOnUse"> 
              <rect width="${bigSize}" height="${bigSize}" fill="url(#smallGrid)" /> 
              <path 
                d="M ${bigSize} 0 L 0 0 0 ${bigSize}" 
                fill="none" 
                stroke="${strokeColor}" 
                stroke-width="${bigStrokeWidth}"
              /> 
          </pattern> 
      </defs> 
      <rect width="100%" height="100%" fill="url(#grid)" /> 
  </svg>`;

  const img = new Image();
  const svg = new Blob([grid], { type: "image/svg+xml; charset=utf-8" });
  const url = URL.createObjectURL(svg);

  img.onload = function () {
    fillBackground();
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
  };

  img.src = url;
};
