import { Component } from 'react';
import { NextComponentType, NextPageContext } from 'next';
import Router from 'next/router';

import { RootState } from '../../../redux/types';

const getDisplayName = (WrappedPage: NextComponentType): string =>
  WrappedPage.displayName ?? WrappedPage.name ?? 'Component';

export const withAuthSync = (WrappedPage: NextComponentType): NextComponentType =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedPage)})`;

    static async getInitialProps(ctx: NextPageContext<RootState>) {
      const tokenAccess = ctx.store.getState().login.token;

      if (ctx.res && (tokenAccess === null || tokenAccess === '')) {
        ctx.res.writeHead(302, { Location: '/login' });
        ctx.res.end();
      }

      const isServer = typeof window === 'undefined';
      if (!isServer && tokenAccess === null) {
        await Router.push('/login');
      }

      const componentProps =
        WrappedPage.getInitialProps !== undefined ? await WrappedPage.getInitialProps(ctx) : {};

      return { ...componentProps };
    }

    render() {
      return <WrappedPage {...this.props} />;
    }
  };
