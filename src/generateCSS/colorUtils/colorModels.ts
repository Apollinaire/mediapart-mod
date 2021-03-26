import { Dimension, NumberNode, Percentage } from 'css-tree';
import { RGB, HSL } from 'color-convert/conversions';
import isNumber from 'lodash/isNumber';

type ColorValueType = NumberNode['type'] | Percentage['type'] | Dimension['type'];

const percentageToRGB = (percent: number): number => Math.round(2.55 * percent);
const percentageToAlpha = (percent: number): number => percent / 100;

export class HSLModel {
  count: number = 0;
  h: number = 0;
  s: number = 0;
  l: number = 0;
  a: number = 0;

  push(value: string, type: ColorValueType): void {
    const nbValue = parseFloat(value);
    if (isNaN(nbValue)) {
      throw Error(`invalid value in HSl: ${value} with type ${type}`);
    }

    switch (this.count) {
      case 0:
        if (type === 'Percentage') {
          throw Error(`invalid percentage hue "${value}"`);
        }
        this.h = nbValue % 360;
        break;
      case 1:
        this.s = nbValue;
        break;
      case 2:
        this.l = nbValue;
        break;
      case 3:
        this.a = type === 'Percentage' ? percentageToAlpha(nbValue) : nbValue;
        break;
    }

    this.count++;
  }

  toValues(): [hslValues: HSL, maybeAlpha: number | null] {
    if (this.count < 3) {
      throw Error('invalid or missing values in RGB');
    }
    return [[this.h, this.s, this.l], isNumber(this.a) ? this.a : null];
  }
}

export class RGBModel {
  count: number = 0;
  r: number = 0;
  g: number = 0;
  b: number = 0;
  a?: number;
  push(value: string, type: ColorValueType): void {
    const nbValue = parseFloat(value);
    if (isNaN(nbValue)) {
      throw Error(`invalid value in HSl: ${value} with type ${type}`);
    }

    switch (this.count) {
      case 0:
        if (type === 'Number') {
          this.r = nbValue;
        } else {
          this.r = percentageToRGB(nbValue);
        }
        break;
      case 1:
        if (type === 'Number') {
          this.g = nbValue;
        } else {
          this.g = percentageToRGB(nbValue);
        }
        break;
      case 2:
        if (type === 'Number') {
          this.b = nbValue;
        } else {
          this.b = percentageToRGB(nbValue);
        }
        break;
      case 3:
        this.a = type === 'Percentage' ? percentageToAlpha(nbValue) : nbValue;
        break;
    }

    this.count++;
  }

  toValues(): [rgbValues: RGB, maybeAlpha: number | null] {
    if (this.count < 3) {
      throw Error('invalid or missing values in RGB');
    }
    return [[this.r, this.g, this.b], isNumber(this.a) ? this.a : null];
  }
}
