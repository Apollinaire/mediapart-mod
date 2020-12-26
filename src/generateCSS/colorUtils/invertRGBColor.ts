import convert from "color-convert";

export const invertRGBColor = (
  r: number,
  g: number,
  b: number
): [number, number, number] => {
  const [h, s, l] = convert.rgb.hsl(r, g, b);
  return convert.hsl.rgb([h, s, 100 - l]);
};
