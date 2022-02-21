import styled from 'styled-components';
import { borderRadius, colorPalette, getSpacing } from '../../stylesheet';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 ${getSpacing(26)};
`;

export const PageContent = styled.main`
  background-color: ${colorPalette.blueLight};
  border-radius: ${borderRadius.large};
  padding: ${getSpacing(6)};
  flex-grow: 1;
`;
