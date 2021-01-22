import convert from 'color-convert';
import { RGB } from 'color-convert/conversions';


export type ColorType = 'background' | 'text';

export const invertRGBColor = ([ r, g, b ]: RGB, colorType: ColorType): RGB => {
  const [h, s, l] = convert.rgb.hsl(r, g, b);
  return convert.hsl.rgb([h, s, 100 - l]);
};
