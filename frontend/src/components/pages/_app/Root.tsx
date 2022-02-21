import { FunctionComponent } from 'react';
import { IntlProvider } from 'react-intl';
import Head from 'next/head';
import enMessages from '../../../translations/en.json';
import frMessages from '../../../translations/fr.json';
import { flattenMessages } from '../../../services/i18n/intl';

import { AppCrashFallback } from './AppCrashFallback/AppCrashFallback';
import { CSSReset } from './CSSReset.style';
import { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';

const locales = {
  fr: flattenMessages(frMessages),
  en: flattenMessages(enMessages),
};

interface RootProps {
  hasError: boolean;
  errorEventId?: string;
}

export const Root: FunctionComponent<RootProps> = props => (
  <ErrorBoundary
    FallbackComponent={AppCrashFallback}
    hasError={props.hasError}
    eventId={props.errorEventId}
  >
    <IntlProvider locale="en" messages={locales.en}>
      <CSSReset />
      <Head>
        <title>Forge</title>
      </Head>

      {props.children}
    </IntlProvider>
  </ErrorBoundary>
);
