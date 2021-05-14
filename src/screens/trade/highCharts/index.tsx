import ETHUSDT from 'assets/images/eth.png';
import SpinnerLoader from 'containers/components/loader';
import moment from 'moment';
import React, {useContext, useEffect, useRef, useState} from 'react';
import SocketContext, {ContextType, OHLC, Volumes} from '../highChartSocketContext/context';
import {IProps, IState} from './propState';
import StockChart from './StockChart';
import './styled.css';

const CryptoChartComponent = (props: IProps) => {
  const chartComponent = useRef(null);
  const {real_data, real_volume, timeTick, ohlc, indicators, volumes} = useContext<ContextType>(SocketContext);
  const [dataChart, setDataChart] = useState<IState>({
    ohlc: new Array<OHLC>(),
    indicators: new Array<OHLC>(),
    volumes: new Array<Volumes>(),
  });

  useEffect(() => {
    let initialData: any = dataChart.ohlc;
    if (real_data && real_volume) {
      if (initialData.length <= 0) {
        console.log(indicators, "indicators")
        setDataChart({ohlc, volumes, indicators});
      } else {
        const currentChart: any = chartComponent.current;
        if (timeTick === 0) currentChart.addData(real_data, real_volume);
        else currentChart.updateLastData(real_data, real_volume);
      }
    }
  }, [timeTick]);
  console.log('sss');

  return dataChart.ohlc.length > 0 ? (
    <StockChart
      ref={chartComponent}
      height={props.height}
      indicators={dataChart.indicators}
      ohlc={dataChart.ohlc}
      volumes={dataChart.volumes}
    />
  ) : (
    <SpinnerLoader />
  );
};

export default React.memo(CryptoChartComponent);
