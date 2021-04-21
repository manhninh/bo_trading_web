import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Indicator, TradeState} from './state';
import {fetchCurrentOrder} from './thunks';

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
  resultWinLoss: {
    amount_demo: null,
    amount_expert: null,
    amount_trade: null,
  },
  blocks: [],
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
    setWinLoss: (
      state: TradeState,
      action: PayloadAction<{amount_demo: number | null; amount_expert: number | null; amount_trade: number | null}>,
    ) => ({
      ...state,
      resultWinLoss: action.payload,
    }),
    setResultBlocks: (state: TradeState, action: PayloadAction<{result: boolean}[]>) => ({
      ...state,
      blocks: action.payload,
    }),
    addResultToBlocks: (state: TradeState, action: PayloadAction<{result: boolean}>) => {
      const newBlocks = [...state.blocks, action.payload];
      newBlocks.shift();
      return {
        ...state,
        blocks: newBlocks,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentOrder.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.length > 0) {
          let totalBuy = 0;
          let totalSell = 0;
          payload.map((item: any) => {
            if (item.status_order && item.status_order) {
              totalSell = item.amount_order;
              state.totalSell = totalSell;
            } else {
              totalBuy = item.amount_order;
              state.totalBuy = totalBuy;
            }
          });
        }
      })
      .addCase(fetchCurrentOrder.rejected, (_state, action) => {
        throw action.payload;
      });
  },
});

export const {
  setTimeTick,
  setIndicator,
  setTotalBuy,
  setTotalSell,
  setWinLoss,
  setResultBlocks,
  addResultToBlocks,
} = tradeSlice.actions;

export default tradeSlice.reducer;
