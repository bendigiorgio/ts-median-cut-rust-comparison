type RGB = {
  r: number;
  g: number;
  b: number;
};

const buildRgb = (imageData: ImageData) => {
  const rgbValues: RGB[] = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    rgbValues.push({
      r: imageData.data[i],
      g: imageData.data[i + 1],
      b: imageData.data[i + 2],
    });
  }
  return rgbValues;
};

const findBiggestRange = (rgbData: RGB[]) => {
  let rMin = Number.MAX_VALUE;
  let gMin = Number.MAX_VALUE;
  let bMin = Number.MAX_VALUE;

  let rMax = Number.MIN_VALUE;
  let gMax = Number.MIN_VALUE;
  let bMax = Number.MIN_VALUE;

  rgbData.forEach((pixel) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  const biggestRange = Math.max(rRange, gRange, bRange);
  if (biggestRange === rRange) {
    return "r";
  } else if (biggestRange === gRange) {
    return "g";
  } else {
    return "b";
  }
};

const quantization = (
  rgbData: RGB[],
  depth: number,
  iteration: number = 4
): RGB[] => {
  const MAX_DEPTH = iteration;
  if (depth === MAX_DEPTH || rgbData.length === 0) {
    const color = rgbData.reduce(
      (prev, curr) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;

        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );

    color.r = Math.round(color.r / rgbData.length);
    color.g = Math.round(color.g / rgbData.length);
    color.b = Math.round(color.b / rgbData.length);
    return [color];
  }

  const componentToSortBy = findBiggestRange(rgbData);
  rgbData.sort((p1, p2) => {
    return p1[componentToSortBy] - p2[componentToSortBy];
  });

  const mid = rgbData.length / 2;
  return [
    ...quantization(rgbData.slice(0, mid), depth + 1),
    ...quantization(rgbData.slice(mid + 1), depth + 1),
  ];
};

export const medianCut = (imageData: ImageData, iterations: number) => {
  const rgbData = buildRgb(imageData);
  const palette = quantization(rgbData, 0, iterations);
  return palette;
};

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export const rgbToHex = ({ r, g, b }: RGB) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export const convertPaletteToHex = (palette: RGB[]) => {
  return palette.map((color) => rgbToHex(color));
};
