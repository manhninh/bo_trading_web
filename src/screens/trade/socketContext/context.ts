import {createContext} from 'react';

export type Blocks = {
  event_time: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  is_open: boolean;
};

export type Indicator = {
  oscillatorsBuy: number;
  oscillatorsNeutral: number;
  oscillatorsSell: number;
  maBuy: number;
  maNeutral: number;
  maSell: number;
  macdBuy: number;
  macdNeutral: number;
  macdSell: number;
  totalBuy: number;
  totalNeutral: number;
  totalSell: number;
  indicator_type: number;
  indicator: number;
};

export type ContextType = {
  blocks: Blocks[];
  real_data: Blocks | null;
  timeTick: number;
  indicator: Indicator;
  isTrade: boolean;
};

const SocketContext = createContext<ContextType>({
  blocks: new Array<Blocks>(),
  real_data: null,
  timeTick: 0,
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
  isTrade: false,
});

export default SocketContext;
