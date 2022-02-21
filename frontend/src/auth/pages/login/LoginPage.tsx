import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { getSpacing, typography } from '../../../stylesheet';
import { LoginForm } from './LoginForm';

export const Logo = styled.img`
  height: ${getSpacing(12)};
  margin-bottom: ${getSpacing(6)};
`;

export const Title = styled.h1`
  ${typography.h1}
  margin-bottom: ${getSpacing(12)};
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LoginPage: FunctionComponent = () => {
  return (
    <LoginContainer>
      <Logo alt="Forge" src="/logo.png" />
      <Title>
        <FormattedMessage id="login.title" />
      </Title>
      <LoginForm />
    </LoginContainer>
  );
};
