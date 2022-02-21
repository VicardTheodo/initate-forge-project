import Router from 'next/dist/client/router';
import mockAxios from 'jest-mock-axios';

import { rootInitialState } from '../../../../redux/reducers';
import { apiRoutes } from '../../../../services/api/apiRoutes';
import { routes } from '../../../../services/routes';
import { pushArgsFromLinkHref } from '../../../../services/testing/utils';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../services/testing/reactTestingLibraryWrapper';

import { Header } from '../Header';

const pushMock = jest.fn().mockResolvedValue(false);
Router.push = pushMock; // needed for Router.push in redux/Login/sagas

const loggedInStore = {
  ...rootInitialState,
  login: { ...rootInitialState.login, token: 'token' },
};

test('AAU, when I click the logo, I am taken to the home page', async () => {
  const push = jest.fn().mockResolvedValue(false);
  render(<Header />, { wrapperOptions: { router: { push } } });
  const logo = await screen.findByRole('img', { name: /forge/i });
  fireEvent.click(logo);
  expect(push).toHaveBeenCalledWith(...pushArgsFromLinkHref(routes.HOME));
});

test('AAU, when I am not logged in I click the login button, I am taken to the login page', async () => {
  const push = jest.fn().mockResolvedValue(false);
  render(<Header />, { wrapperOptions: { router: { push } } });
  expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /log out/i })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: /login/i }));
  await waitFor(() => {
    expect(push).toHaveBeenCalledWith(...pushArgsFromLinkHref(routes.LOGIN));
  });
});

test('AAU, when I am logged in, I can see the logout button and click it', async () => {
  render(<Header />, {
    wrapperOptions: {
      initialReduxState: loggedInStore,
    },
  });
  expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /log out/i }));
  expect(mockAxios.post).toHaveBeenCalledWith(apiRoutes.logout, undefined, {
    headers: { Authorization: 'Bearer token' },
  });
  mockAxios.mockResponse({ data: 'logout' });
  await waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith(routes.LOGIN);
  });
  expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /log out/i })).not.toBeInTheDocument();
});
