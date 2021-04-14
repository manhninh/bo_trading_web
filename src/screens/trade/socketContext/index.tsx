import config from 'constants/config';
import React, {useEffect, useRef, useState} from 'react';
import socketIOClient, {Socket} from 'socket.io-client';
import SocketContext, {Blocks} from './context';
import {socketDisconnect, socketEvents} from './events';

const SocketProvider = (props: any) => {
  const socketRef = useRef<Socket | null>(null);
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
    indicator: {
      oscillatorsBuy: 0,
      oscillatorsNeutral: 0,
      oscillatorsSell: 0,
      maBuy: 0,
      maNeutral: 0,
      maSell: 0,
      macdBuy: 0,
      macdNeutral: 0,
      macdSell: 0,
      totalBuy: 0,
      totalNeutral: 0,
      totalSell: 0,
      indicator_type: 0,
      indicator: 0,
    },
    isTrade: false,
  });

  useEffect(() => {
    if (!socketRef.current) socketRef.current = socketIOClient(config.WS_CANDLESTICK?.toString() || '');
    socketEvents({setValue, socket: socketRef?.current});
    return () => {
      socketDisconnect(socketRef?.current);
    };
  }, [socketEvents]);

  return <SocketContext.Provider value={value}>{props.children}</SocketContext.Provider>;
};

export default SocketProvider;
