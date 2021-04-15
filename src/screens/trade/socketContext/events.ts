import { EVENTS, ROOM } from 'screens/trade/socketContext/socketConfig';
import { Socket } from 'socket.io-client';
import { setTimeTick } from '../redux/slice';
import { ContextType } from './context';

export const socketEvents = ({ setValue, socket, dispatch }) => {
  if (!socket) return;

  socket.on('connect', () => {
    socket.emit(ROOM.ETHUSDT);
    socket.emit(ROOM.INDICATOR_ETHUSDT);
  });

  socket.on(EVENTS.BLOCKS_ETHUSDT, (result: any) => {
    // thêm object vào mảng block cuối cùng để front-end runtime data
    let blocks: any = [...result];
    blocks.push(blocks[blocks.length - 1]);
    setValue((state: ContextType) => ({ ...state, blocks }));
  });

  socket.on(EVENTS.ETHUSDT_REALTIME, (result: any) => {
    const real_data = result.candlestick;
    const timeTick = result.timeTick % 30;
    const isTrade = result.timeTick >= 30 ? false : true;
    dispatch(setTimeTick({ timeTick, isTrade }));
    setValue((state: ContextType) => ({ ...state, real_data, timeTick, isTrade }));
  });

  socket.on(EVENTS.INDICATOR_ETHUSDT, function (result: any) {
    setValue((state: ContextType) => ({ ...state, indicator: result }));
  });
};

export const socketDisconnect = (socket: Socket | null) => {
  if (!socket) return;
  socket.off(EVENTS.BLOCKS_ETHUSDT);
  socket.off(EVENTS.ETHUSDT_REALTIME);
  socket.off(EVENTS.INDICATOR_ETHUSDT);
  socket.disconnect();
};
