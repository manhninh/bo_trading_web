import {OHLC, Volumes} from '../apexChartSocketContext/context';

export type IProps = {
  height: number;
};

export type IState = {
  ohlc: OHLC[];
  volumes: Volumes[];
  updateLastData: any[] | null;
  addData: OHLC | null;
};
