import {createContext} from 'react';

export type OHLC = {
  x: Date;
  y: [number, number, number, number];
};

export type Volumes = {
  x: Date;
  y: number;
};

export type ContextType = {
  ohlc: OHLC[];
  volumes: Volumes[];
  real_data: OHLC | null;
  timeTick: number;
};

const SocketContext = createContext<ContextType>({
  ohlc: new Array<OHLC>(),
  volumes: new Array<Volumes>(),
  real_data: null,
  timeTick: 0,
});

export default SocketContext;
