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

export type ContextType = {
  blocks: Blocks[];
  real_data: Blocks | null;
  timeTick: number;
};

const SocketContext = createContext<ContextType>({
  blocks: new Array<Blocks>(),
  real_data: null,
  timeTick: 0,
});

export default SocketContext;
