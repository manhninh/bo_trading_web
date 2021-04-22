import {useAppSelector} from 'boot/configureStore';
import config from 'constants/config';
import {LOCAL_STORE} from 'constants/system';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import socketIOClient, {Socket} from 'socket.io-client';
import {calculatorDisconnect, calculatorEvents} from './calculatorEvents';
import {candlestickDisconnect, candlestickEvents} from './candlestickEvents';
import SocketContext, {Blocks} from './context';

const SocketProvider = (props: any) => {
  const dispatch = useDispatch();
  const socketCandlestickRef = useRef<Socket | null>(null);
  const socketCalculatorRef = useRef<Socket | null>(null);
  const user_id = useAppSelector((state) => state.authState.accountInfor._id);

  const [value, setValue] = useState({
    blocks: new Array<Blocks>(),
    real_data: {
      event_time: new Date(),
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
      is_open: false,
    },
    timeTick: 0,
  });

  // scoket nến
  useEffect(() => {
    if (!socketCandlestickRef.current)
      socketCandlestickRef.current = socketIOClient(config.WS_CANDLESTICK?.toString() || '');
    candlestickEvents({
      setValue,
      user_id,
      socketCandlestick: socketCandlestickRef?.current,
      dispatch,
    });
    return () => {
      candlestickDisconnect(socketCandlestickRef?.current);
    };
  }, [candlestickEvents]);

  //socket tính toán
  useEffect(() => {
    if (!socketCalculatorRef.current)
      socketCalculatorRef.current = socketIOClient(config.WS_CALCULATOR?.toString() || '', {
        query: {
          token: localStorage.getItem(LOCAL_STORE.TOKEN)?.toString().split(' ')[1] || '',
        },
      });
    calculatorEvents({
      setValue,
      user_id,
      socketCalculator: socketCalculatorRef?.current,
      dispatch,
    });
    return () => {
      calculatorDisconnect(socketCandlestickRef?.current);
    };
  }, [calculatorEvents]);

  return <SocketContext.Provider value={value}>{props.children}</SocketContext.Provider>;
};

export default React.memo(SocketProvider);
