import { Context } from 'next-redux-wrapper';
import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleWare, { Task } from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';

import { rootInitialState, rootReducers } from './reducers';
import { rootSagas } from './sagas';
import { RootState } from './types';

type ReduxSagaStore<S> = S & { sagaTask: Task };

/* istanbul ignore next */
const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware);
};

export const configureStore = (
  context: Context | undefined,
  initialState: RootState = rootInitialState,
): Store<RootState> => {
  const sagaMiddleware = createSagaMiddleWare();

  const store = createStore(rootReducers, initialState, bindMiddleware([sagaMiddleware]));
  const reduxSagaStore: ReduxSagaStore<typeof store> = {
    ...store,
    sagaTask: sagaMiddleware.run(rootSagas),
  };

  return reduxSagaStore;
};

export const appWrapper = createWrapper<RootState>(configureStore);
