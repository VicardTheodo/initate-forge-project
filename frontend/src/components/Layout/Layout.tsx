import { FunctionComponent } from 'react';
import { Header } from './Header/Header';
import { Container, PageContent } from './Layout.style';

export const Layout: FunctionComponent = props => {
  return (
    <Container>
      <Header />
      <PageContent>{props.children}</PageContent>
    </Container>
  );
};
