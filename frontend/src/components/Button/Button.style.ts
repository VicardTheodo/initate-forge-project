import styled, { css } from 'styled-components';

import { borderRadius, colorPalette, getSpacing, typography } from '../../stylesheet';

export const Button = styled.button`
  padding: ${getSpacing(2)} ${getSpacing(4)};
  ${typography.bold}
  cursor: pointer;
  border: none;
  border-radius: ${borderRadius.medium};
  text-decoration: none;
  color: ${colorPalette.black};
  background-color: ${colorPalette.amberLight};
  &:hover,
  &:focus {
    background-color: ${colorPalette.amber};
  }

  transition: background-color 0.3s ease-in-out;
  @media screen and (prefers-reduced-motion) {
    transition: none;
  }

  ${({ disabled }) =>
    disabled === true &&
    css`
      cursor: default;
      pointer-events: none;
      background-color: ${colorPalette.greyLight};
      &:hover {
        background-color: ${colorPalette.greyLight};
      }
    `}
`;
