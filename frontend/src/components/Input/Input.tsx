import styled from 'styled-components';

import { borderRadius, colorPalette, getSpacing } from '../../stylesheet';

const getBorderColor = (hasError: boolean, originalColor: string): string =>
  hasError ? colorPalette.red : originalColor;

interface Props {
  hasError: boolean;
}

export const Input = styled.input<Props>`
  width: 100%;
  height: 60px;
  background-color: ${colorPalette.white};
  padding: 0 ${getSpacing(3)};
  border-radius: ${borderRadius.medium};
  border: 1px solid ${props => getBorderColor(props.hasError, colorPalette.blackTransparent)};

  :hover {
    border-color: ${props => getBorderColor(props.hasError, colorPalette.greyDark)};
  }

  :focus {
    outline: none;
    border-color: ${props => getBorderColor(props.hasError, colorPalette.amber)};
  }

  ::placeholder {
    color: ${colorPalette.blackTransparent};
  }
`;
