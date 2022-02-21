import React, { FunctionComponent } from 'react';
import { Logo } from './Logo';
import { AuthButtons } from './AuthButtons';
import { HeaderContainer } from './Header.style';

export const Header: FunctionComponent = () => {
  return (
    <HeaderContainer>
      <Logo />
      <AuthButtons />
    </HeaderContainer>
  );
};
