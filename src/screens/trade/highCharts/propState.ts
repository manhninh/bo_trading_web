import {OHLC, Volumes} from '../highChartSocketContext/context';

export type IProps = {
  height: number;
  xAxisMin: number;
};

export type IState = {
  ohlc: OHLC[];
  volumes: Volumes[];
};
