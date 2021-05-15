import {OHLC, Volumes} from '../highChartSocketContext/context';

export type IProps = {
  height: number;
};

export type IState = {
  ohlc: OHLC[];
  volumes: Volumes[];
};
