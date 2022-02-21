import Router from 'next/router';
import mockAxios from 'jest-mock-axios';
import { axe } from 'jest-axe';
import { LoginPage } from '../LoginPage';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../services/testing/reactTestingLibraryWrapper';
import { apiRoutes } from '../../../../services/api/apiRoutes';

jest.mock('../../../../services/sentry', () => ({
  Sentry: {
    configureScope: jest.fn(),
  },
}));

const push = jest.fn().mockResolvedValue(false);
Router.push = push;

afterEach(() => {
  mockAxios.reset();
});

test('AAU, I can see a login page without basic accessibility issues', async () => {
  const { container } = render(<LoginPage />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('AAU, I can login with a valid email and password', async () => {
  render(<LoginPage />, { wrapperOptions: { router: Router } });

  fireEvent.change(screen.getByPlaceholderText(/ex: comes@theodo.fr/i), {
    target: { value: 'test' },
  });
  fireEvent.change(screen.getByPlaceholderText(/xxxxxxxxxxx/i), { target: { value: 'test' } });
  fireEvent.click(screen.getByTestId(/form-submit/i));
  await waitFor(() =>
    expect(mockAxios.post).toHaveBeenCalledWith(apiRoutes.login, {
      email: 'test',
      password: 'test',
    }),
  );
  mockAxios.mockResponse({ data: { token: 'test token' } });
  await waitFor(() => expect(push).toHaveBeenCalledWith('/'));
});

test('AAU, when I try to login with an invalid email and password, I can see an error message', async () => {
  render(<LoginPage />);
  fireEvent.change(screen.getByPlaceholderText(/ex: comes@theodo.fr/i), {
    target: { value: 'test' },
  });
  fireEvent.change(screen.getByPlaceholderText(/xxxxxxxxxxx/i), { target: { value: 'test' } });
  fireEvent.click(screen.getByTestId(/form-submit/i));
  await waitFor(() =>
    expect(mockAxios.post).toHaveBeenCalledWith(apiRoutes.login, {
      email: 'test',
      password: 'test',
    }),
  );
  mockAxios.mockResponse({ data: { token: undefined } });
  await waitFor(() =>
    expect(screen.getByText('No token in login response body')).toBeInTheDocument(),
  );
});

test('AAU, I can see "required" validation for the email field', async () => {
  render(<LoginPage />);
  fireEvent.change(screen.getByPlaceholderText(/ex: comes@theodo.fr/i), {
    target: { value: '' },
  });
  fireEvent.click(screen.getByTestId(/form-submit/i));
  await waitFor(() => expect(mockAxios.post).not.toHaveBeenCalled());
  expect(screen.getByText('Email required')).toBeInTheDocument();
});
