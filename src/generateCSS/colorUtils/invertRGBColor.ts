import convert from 'color-convert';
import { RGB } from 'color-convert/conversions';

export type ColorType = 'background' | 'text';

export const invertRGBColor = ([r, g, b]: RGB, colorType: ColorType): RGB => {
  const [h, s, l] = convert.rgb.hsl(r, g, b);
  return convert.hsl.rgb([h, s, invertLightness(l, colorType)]);
};

const invertLightness = (lightness: number, colorType: ColorType) => {
  switch (colorType) {
    case 'background':
      return Math.max(100 - lightness, 16);
    case 'text':
      return Math.min(100 - lightness, 93);
    default:
      return lightness;
  }
};
