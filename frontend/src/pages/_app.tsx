import nextCookie from 'next-cookies';
import App, { AppContext, AppInitialProps } from 'next/app';

import { loginUser } from '../auth/redux/actions';
import { appWrapper } from '../redux/store';
import { refreshToken } from '../services/api/auth/refresh';
import { captureException } from '../services/sentry';

import { Root } from '../components/pages/_app/Root';

interface AppProps extends AppInitialProps {
  hasError: boolean;
  errorEventId?: string;
}

class MyApp extends App<AppProps> {
  static async getInitialProps(props: AppContext): Promise<AppProps> {
    const { Component, ctx } = props;
    const { refreshToken: cookieRefreshToken } = nextCookie(ctx);
    const isServer = typeof window === 'undefined';
    if (isServer && cookieRefreshToken !== undefined) {
      try {
        const token = await refreshToken(cookieRefreshToken);
        ctx.store.dispatch(loginUser.success({ token }));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }

    try {
      const pageProps =
        Component.getInitialProps !== undefined ? await Component.getInitialProps(ctx) : {};

      return { pageProps, hasError: false, errorEventId: undefined };
    } catch (error) {
      // Capture errors that happen during a page's getInitialProps.
      // This will work on both client and server sides.
      const errorEventId = captureException(error, ctx);

      return {
        hasError: true,
        errorEventId,
        pageProps: {},
      };
    }
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { Component, pageProps, hasError, errorEventId } = this.props;

    return (
      <Root hasError={hasError} errorEventId={errorEventId}>
        <Component {...pageProps} />
      </Root>
    );
  }
}

export default appWrapper.withRedux(MyApp);
