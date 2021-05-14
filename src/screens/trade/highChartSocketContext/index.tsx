import config from 'constants/config';
import {LOCAL_STORE} from 'constants/system';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import socketIOClient, {Socket} from 'socket.io-client';
import {calculatorDisconnect, calculatorEvents} from './calculatorEvents';
import {candlestickDisconnect, candlestickEvents} from './candlestickEvents';
import SocketContext, {OHLC, Volumes} from './context';

const SocketProvider = (props: any) => {
  const dispatch = useDispatch();
  const socketCandlestickRef = useRef<Socket | null>(null);
  const socketCalculatorRef = useRef<Socket | null>(null);

  const [value, setValue] = useState({
    ohlc: new Array<OHLC>(),
    indicators: new Array<OHLC>(),
    volumes: new Array<Volumes>(),
    real_data: null,
    real_volume: null,
    timeTick: 0,
  });

  // scoket nến
  useEffect(() => {
    if (!socketCandlestickRef.current) {
      socketCandlestickRef.current = socketIOClient(config.WS_CANDLESTICK?.toString() || '', {
        query: {
          token: localStorage.getItem(LOCAL_STORE.TOKEN)?.toString().split(' ')[1] || '',
        },
      });
      candlestickEvents({
        setValue,
        socketCandlestick: socketCandlestickRef?.current,
        dispatch,
      });
    }
    return () => {
      candlestickDisconnect(socketCandlestickRef?.current);
    };
  }, [candlestickEvents]);

  //socket tính toán
  useEffect(() => {
    if (!socketCalculatorRef.current) {
      socketCalculatorRef.current = socketIOClient(config.WS_CALCULATOR?.toString() || '', {
        query: {
          token: localStorage.getItem(LOCAL_STORE.TOKEN)?.toString().split(' ')[1] || '',
        },
      });
      calculatorEvents({
        socketCalculator: socketCalculatorRef.current,
        dispatch,
      });
    }
    return () => {
      calculatorDisconnect(socketCandlestickRef?.current);
    };
  }, [calculatorEvents]);

  return <SocketContext.Provider value={value}>{props.children}</SocketContext.Provider>;
};

export default React.memo(SocketProvider);
