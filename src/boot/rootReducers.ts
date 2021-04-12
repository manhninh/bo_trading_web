import commonState from 'containers/redux/slice';
import authState from 'routers/redux/slice';
import tradeState from 'screens/trade/redux/slice';

const rootReducers = {
  authState,
  commonState,
  tradeState,
};

export default rootReducers;
