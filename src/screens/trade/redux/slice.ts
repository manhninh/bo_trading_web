import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TradeState} from './state';

export const initialTradeState: TradeState = {
  timeTick: 0,
};

const tradeSlice = createSlice({
  name: 'tradeSlice',
  initialState: initialTradeState,
  reducers: {
    setTimeTick: (state: TradeState, action: PayloadAction<number>) => ({
      ...state,
      timeTick: action.payload,
    }),
  },
});

export const {setTimeTick} = tradeSlice.actions;

export default tradeSlice.reducer;
