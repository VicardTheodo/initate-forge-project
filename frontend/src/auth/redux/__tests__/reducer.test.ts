import { hydrate } from '../../../redux/actions';
import { rootInitialState } from '../../../redux/reducers';
import { RootState } from '../../../redux/types';
import { authReducer, initialState } from '../reducer';

describe('Login Reducer', () => {
  it('handles next-redux-wrapper HYRDATE action', () => {
    const payload: RootState = {
      ...rootInitialState,
      login: { token: 'testtoken', loginError: null },
    };
    const action = hydrate(payload);

    const loginState = authReducer(initialState, action);
    expect(loginState).toEqual(payload.login);
  });
});
