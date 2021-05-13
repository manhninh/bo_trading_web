import ETHUSDT from 'assets/images/eth.png';
import SpinnerLoader from 'containers/components/loader';
import moment from 'moment';
import React, {useContext, useEffect, useRef, useState} from 'react';
import SocketContext, {ContextType, OHLC, Volumes} from '../apexChartSocketContext/context';
import {IProps, IState} from './propState';
import StockChart from './StockChart';
import './styled.css';
import CanvasJSReact from 'assets/canvasjs-stock-1.2.16/canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const CryptoChartComponent = (props: IProps) => {
  const chart = useRef();
  const {real_data, timeTick, ohlc, volumes} = useContext<ContextType>(SocketContext);
  const [dataChart, setDataChart] = useState<IState>({
    ohlc: new Array<OHLC>(),
    volumes: new Array<Volumes>(),
    updateLastData: null,
    addData: null,
  });

  useEffect(() => {
    let initialData: any = dataChart.ohlc;
    if (real_data) {
      if (initialData.length <= 0) {
        setDataChart({ohlc, volumes, updateLastData: [], addData: null});
      } else {
        const currentChart: any = chart.current;
        if (timeTick === 0) {
          const newBlock = Object.assign({}, real_data);
          newBlock['y'][0] = initialData[initialData.length - 1]['y'][3];
          newBlock['y'][1] = initialData[initialData.length - 1]['y'][3];
          newBlock['y'][2] = initialData[initialData.length - 1]['y'][3];
          newBlock['y'][3] = initialData[initialData.length - 1]['y'][3];
          currentChart?.addData(newBlock);
          // setDataChart((state) => ({...state, addData: newBlock, ohlc: initialData, updateLastData: null}));
        } else {
          real_data['y'][0] = initialData[initialData.length - 2]['y'][3];
          // setDataChart((state) => ({...state, updateLastData: real_data['y'], addData: null}));
          currentChart?.updateLastData(real_data['y']);
        }
      }
    }
  }, [timeTick]);

  return dataChart.ohlc.length >= 66 && real_data ? (
    <StockChart
      ref={chart}
      height={props.height}
      ohlc={dataChart.ohlc}
      volumes={dataChart.volumes}
      // updateLastData={dataChart.updateLastData}
      // addData={dataChart.addData}
    />
  ) : (
    <SpinnerLoader />
  );
};

export default React.memo(CryptoChartComponent);
