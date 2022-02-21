import Link from 'next/link';
import { FunctionComponent, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '../../../auth/redux/actions';
import { selectIsUserLoggedIn } from '../../../auth/redux/selectors';
import { routes } from '../../../services/routes';
import { Button } from '../../Button/Button.style';

export const AuthButtons: FunctionComponent = () => {
  const dispatch = useDispatch();
  const logout = useCallback(() => dispatch(logoutUser.request()), [dispatch]);
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  return isUserLoggedIn ? (
    <Button onClick={logout}>
      <FormattedMessage id="header.logout" />
    </Button>
  ) : (
    <Link href={routes.LOGIN} passHref>
      <Button as="a">
        <FormattedMessage id="header.login" />
      </Button>
    </Link>
  );
};
