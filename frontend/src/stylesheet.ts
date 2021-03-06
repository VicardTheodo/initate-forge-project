import { css } from 'styled-components';

/**
 * This file is here to ensure UI consistency
 * You **MUST** sync with your designer at the start of the project to check
 * what colors/typos/grid unit you are going to use, and stick to it.
 */

// This file is where the variables are defined, so we can disable stylelint here
// stylelint-disable

/**
 * App spacing measurement convention
 * Use the getSpacing function below to compute padding and margin
 * and elements with fixed width/height
 */
const SPACING_UNIT = 5;
const MEASUREMENT_UNIT = 'px';
export const getSpacing = (multiplier: number): string =>
  `${multiplier * SPACING_UNIT}${MEASUREMENT_UNIT}`;

/**
 * Use this palette in your components
 * If a new color is in the mockups, check with the designer
 * that the project really need a new color and add it here.
 * As to naming, the best name is the name used by the designer
 */
export const colorPalette = {
  white: '#FFFFFF',
  greyLight: '#e0e0e0',
  greyDark: '#222',
  black: '#000000',
  blackTransparent: 'rgba(0, 0, 0, 0.24)',

  amberLight: '#FFC107',
  amber: '#D48406',
  amberDark: '#B95E04',
  blueLight: '#F4F9FB',
  red: '#FF7373',
};

export const fontFamily = {
  main: `'Lato', 'Helvetica', 'Arial', sans-serif`,
  code: 'Monospace',
};

export const typography = {
  main: css`
    font-family: ${fontFamily.main};
    font-weight: normal;
    font-size: 1rem;
    line-height: 1.5;
    color: ${colorPalette.greyDark};
  `,
  bold: css`
    font-weight: bold;
  `,
  light: css`
    font-weight: lighter;
  `,
  small: css`
    font-size: 0.9rem;
  `,
  h1: css`
    font-family: ${fontFamily.main};
    font-weight: bold;
    font-size: 1.5rem;
  `,
  code: css`
    font-family: ${fontFamily.code};
    font-size: 1.2em;
    color: ${colorPalette.amberDark};
  `,
};

export const borderRadius = {
  medium: '4px',
  large: '10px',
};
