import styled from 'styled-components';

import { borderRadius, colorPalette, getSpacing, typography } from '../../../stylesheet';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${getSpacing(10)};
`;

export const Logo = styled.img`
  width: ${getSpacing(32)};
  margin-bottom: ${getSpacing(4)};
`;

export const Title = styled.h1`
  ${typography.h1}
  margin-bottom: ${getSpacing(12)};
`;

export const HowTo = styled.div`
  padding: ${getSpacing(6)};
  width: 100%;
  max-width: ${getSpacing(120)};
  box-sizing: border-box;
  border-radius: ${borderRadius.large};
  border: 1px dashed ${colorPalette.greyDark};
`;

export const DescriptionList = styled.ul`
  list-style: disc;
  margin-left: ${getSpacing(4)};
`;

export const DescriptionLine = styled.li`
  ${typography.light}
  padding-left: ${getSpacing(1)};
  margin-bottom: ${getSpacing(1)};
`;

export const Code = styled.code`
  ${typography.code}
  padding: ${getSpacing(1)};
`;
