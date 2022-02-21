import {
  fireEvent,
  render,
  screen,
} from '../../../../../services/testing/reactTestingLibraryWrapper';
import { Sentry } from '../../../../../services/sentry';

import { AppCrashFallback } from '../AppCrashFallback';

jest.mock('../../../../../services/sentry', () => ({
  Sentry: {
    showReportDialog: jest.fn(),
  },
}));
const mockSentry = Sentry as jest.Mocked<typeof Sentry & { showReportDialog: () => void }>;

test('AAU, when I click on the feedback button, I open the sentry report dialog', () => {
  const eventId = 'testId';
  render(<AppCrashFallback eventId={eventId} />);

  fireEvent.click(screen.getByRole('button', { name: /tell us what happened/i }));

  expect(mockSentry.showReportDialog).toHaveBeenCalledWith({ eventId });
});
