import styled from 'styled-components';
import { getSpacing } from '../../../stylesheet';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${getSpacing(13)};
  padding: 0 ${getSpacing(4)};
`;
