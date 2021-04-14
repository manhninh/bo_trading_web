import ETHUSDT from 'assets/images/eth.png';
import SpinnerLoader from 'containers/components/loader';
import React, {useContext, useEffect, useState} from 'react';
import SocketContext, {ContextType} from '../socketContext/context';
import {IProps} from './propsState';
import StockChart from './StockChart';
import './styled.css';

const CryptoChartComponent = (props: IProps) => {
  const [dataChart, setDataChart] = useState([]);
  const {real_data, timeTick, blocks} = useContext<ContextType>(SocketContext);

  useEffect(() => {
    let initialData: any = blocks;
    if (initialData.length > 0 && real_data) {
      real_data.open = initialData[initialData.length - 2].close;
      real_data.is_open = !real_data.is_open;
      initialData[initialData.length - 1] = real_data;

      if (timeTick === 0) {
        const newBlock = Object.assign({}, real_data);
        newBlock.open = initialData[initialData.length - 1].close;
        newBlock.close = initialData[initialData.length - 1].close;
        newBlock.high = initialData[initialData.length - 1].close;
        newBlock.low = initialData[initialData.length - 1].close;
        newBlock.is_open = !newBlock.is_open;
        initialData.push(newBlock);
        initialData[initialData.length - 2].is_open = !initialData[initialData.length - 2].is_open;
        initialData.shift();
      }
      setDataChart(initialData);
    }
  }, [timeTick]);

  return dataChart.length >= 77 && real_data ? (
    <>
      <img src={ETHUSDT} className="icon-eth" />
      <StockChart data={dataChart} height={props.height} />
    </>
  ) : (
    <SpinnerLoader />
  );
};

export default React.memo(CryptoChartComponent);
