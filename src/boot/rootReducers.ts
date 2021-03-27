import {combineReducers} from '@reduxjs/toolkit';
import authState from 'routers/redux/slice';

const rootReducers = combineReducers({
  authState,
});

export type RootState = ReturnType<typeof rootReducers>;

export default rootReducers;
