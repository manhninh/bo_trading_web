import commonState from 'containers/redux/slice';
import authState from 'routers/redux/slice';

const rootReducers = {
  authState,
  commonState
};

export default rootReducers;