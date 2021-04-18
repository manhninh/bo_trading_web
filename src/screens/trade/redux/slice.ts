import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Indicator, TradeState} from './state';

const initialTradeState: TradeState = {
  timeTick: 0,
  isTrade: false,
  indicator: {
    oscillatorsBuy: 0,
    oscillatorsNeutral: 0,
    oscillatorsSell: 0,
    maBuy: 0,
    maNeutral: 0,
    maSell: 0,
    macdBuy: 0,
    macdNeutral: 0,
    macdSell: 0,
    totalBuy: 0,
    totalNeutral: 0,
    totalSell: 0,
    indicator_type: 0,
    indicator: 0,
  },
  totalBuy: 0,
  totalSell: 0,
};

const tradeSlice = createSlice({
  name: 'tradeSlice',
  initialState: initialTradeState,
  reducers: {
    setTimeTick: (state: TradeState, action: PayloadAction<{timeTick: number; isTrade: boolean}>) => ({
      ...state,
      timeTick: action.payload.timeTick,
      isTrade: action.payload.isTrade,
    }),
    setIndicator: (state: TradeState, action: PayloadAction<Indicator>) => ({
      ...state,
      indicator: action.payload,
    }),
    setTotalBuy: (state: TradeState, action: PayloadAction<number>) => ({
      ...state,
      totalBuy: action.payload,
    }),
    setTotalSell: (state: TradeState, action: PayloadAction<number>) => ({
      ...state,
      totalSell: action.payload,
    }),
  },
});

export const {setTimeTick, setIndicator, setTotalBuy, setTotalSell} = tradeSlice.actions;

export default tradeSlice.reducer;
