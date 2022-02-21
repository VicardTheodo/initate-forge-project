import { combineReducers, Reducer } from 'redux';

import { authReducer, initialState } from '../auth/redux/reducer';
import { RootState } from './types';

/**
 * Example of the Login module which should export a reducer.
 */

/**
 * Creates the main reducer with the asynchronously loaded ones
 */

export const rootInitialState: RootState = {
  login: initialState,
};

export const rootReducers: Reducer<RootState> = combineReducers({
  login: authReducer,
});
