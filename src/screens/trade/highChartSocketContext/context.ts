import {createContext} from 'react';

export type OHLC = [number, number, number, number, number];

export type Volumes = {
  x: number;
  y: number;
  color: string;
};

export type ContextType = {
  ohlc: OHLC[];
  indicators: OHLC[];
  volumes: Volumes[];
  real_data: OHLC | null;
  real_volume: Volumes | null;
  timeTick: number;
};

const SocketContext = createContext<ContextType>({
  ohlc: new Array<OHLC>(),
  indicators: new Array<OHLC>(),
  volumes: new Array<Volumes>(),
  real_data: null,
  real_volume: null,
  timeTick: 0,
});

export default SocketContext;
