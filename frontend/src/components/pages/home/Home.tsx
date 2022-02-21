import { FunctionComponent } from 'react';

import { Layout } from '../../Layout/Layout';
import { withAuthSync } from '../withAuthSync/withAuthSync';
import {
  Code,
  DescriptionLine,
  DescriptionList,
  HomeContainer,
  HowTo,
  Logo,
  Title,
} from './Home.style';

const HomeUI: FunctionComponent = () => (
  <Layout>
    <HomeContainer>
      <Logo alt="Forge" src="/logo.png" />

      <Title>Welcome to Forge, you’ve just launched your project</Title>

      <HowTo>
        <DescriptionList>
          <DescriptionLine>
            To create a page or a component, run <Code>yarn generate</Code>.
          </DescriptionLine>

          <DescriptionLine>
            The style is centralized in the <Code>src/stylesheet.ts</Code>. From there, you can
            manage colors, font properties, spacing unit...
          </DescriptionLine>

          <DescriptionLine>
            Redesign the <Code>src/components/AppCrashFallback</Code> that will display when there
            is a javascript error.
          </DescriptionLine>

          <DescriptionLine>
            Read more about the tools and built-in features in the <Code>README.md</Code>.
          </DescriptionLine>
        </DescriptionList>
      </HowTo>
    </HomeContainer>
  </Layout>
);

export const Home = withAuthSync(HomeUI);
