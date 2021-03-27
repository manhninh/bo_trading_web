import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createBrowserHistory, History} from 'history';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {createLogger, LogEntryObject} from 'redux-logger';
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import thunk from 'redux-thunk';
import allReducers, {RootState} from './rootReducers';

const history: History = createBrowserHistory();

/** add middlewares */
const middlewares: any = [];

middlewares.push(routerMiddleware(history));

// middleware redux-thunk
middlewares.push(thunk);

// middleware redux logger
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    diff: true,
    collapsed: (_getState: any, _action: any, logEntry: LogEntryObject | undefined) => !logEntry?.error,
  });
  middlewares.push(logger);
}

/** config root reducer */
const allCombineReducers = combineReducers({
  ...allReducers,
  router: connectRouter(history),
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'auth/signOut') {
    state = {};
  }
  return allCombineReducers(state, action);
};

/** config redux-persist */
const persistConfig = {
  key: 'root',
  storage: localStorage,
  whitelist: ['authState'],
  blacklist: [''],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

/** create redux store */
const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

const persistor = persistStore(store);

export default {store, persistor, history};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
