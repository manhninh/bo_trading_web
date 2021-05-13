import {OHLC, Volumes} from '../highChartSocketContext/context';

export type IProps = {
  height: number;
};

export type IState = {
  isLoading: boolean;
  ohlc: OHLC[];
  volumes: Volumes[];
  options: any;
};
