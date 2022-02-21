import styled from 'styled-components';

import { getSpacing, typography } from '../../../../stylesheet';

import { Button as BaseButton } from '../../../Button/Button.style';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const PageContent = styled.div`
  padding: ${getSpacing(8)} ${getSpacing(4)};
`;

export const Title = styled.h1`
  ${typography.h1}
`;

export const HelperList = styled.ul`
  list-style: disc inside;
  margin-top: ${getSpacing(2)};
`;

export const Button = styled(BaseButton)`
  padding: ${getSpacing(1)} ${getSpacing(2)};
`;
