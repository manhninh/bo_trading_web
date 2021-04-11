import ETHUSDT from 'assets/images/eth.png';
import config from 'constants/config';
import {EVENTS} from 'constants/socketEvent';
import SpinnerLoader from 'containers/components/loader';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import socketIOClient, {Socket} from 'socket.io-client';
import {setTimeTick} from '../redux/slice';
import {IProps} from './propsState';
import StockChart from './StockChart';
import './styled.css';

const CryptoChartComponent = (props: IProps) => {
  const dispatch = useDispatch();
  const [dataChart, setDataChart] = useState([]);
  const [candlestick, setCandlestick] = useState({
    data: {
      event_time: Date,
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
      is_open: false,
    },
    timeTick: 0,
  });
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    configWsCandlestick();
    return () => {
      socketRef.current?.off(EVENTS.BLOCKS_ETHUSDT);
      socketRef.current?.off(EVENTS.ETHUSDT_REALTIME);
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    let initialData: any = [...dataChart];
    if (initialData.length > 0 && candlestick.data) {
      candlestick.data.open = initialData[initialData.length - 2].close;
      candlestick.data.is_open = !candlestick.data.is_open;
      initialData[initialData.length - 1] = candlestick.data;

      if (candlestick.timeTick === 0) {
        const newBlock = Object.assign({}, candlestick.data);
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
  }, [candlestick.timeTick]);

  /** config socket connect */
  const configWsCandlestick = () => {
    socketRef.current = socketIOClient(config.WS_CANDLESTICK?.toString() || '');

    socketRef.current?.on('connect', () => {
      socketRef.current?.emit('ethusdt');
    });

    socketRef.current?.on(EVENTS.BLOCKS_ETHUSDT, function (result) {
      // thêm object vào mảng block cuối cùng để front-end runtime data
      let cryptoBlocks: any = [...result];
      cryptoBlocks.push(cryptoBlocks[cryptoBlocks.length - 1]);
      console.log(cryptoBlocks, 'cryptoBlocks');
      setDataChart(cryptoBlocks);
    });

    socketRef.current?.on(EVENTS.ETHUSDT_REALTIME, function (data) {
      dispatch(setTimeTick(data.timeTick % 30));
      setCandlestick({
        data: data.candlestick,
        timeTick: data.timeTick % 30,
      });
    });
  };

  return dataChart.length >= 77 && candlestick.data ? (
    <>
      <img src={ETHUSDT} className="icon-eth" />
      <StockChart data={dataChart} height={props.height} />
    </>
  ) : (
    <SpinnerLoader />
  );
};

export default React.memo(CryptoChartComponent);
