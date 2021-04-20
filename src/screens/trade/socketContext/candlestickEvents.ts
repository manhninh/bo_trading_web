import {EVENTS, ROOM} from 'screens/trade/socketContext/socketConfig';
import {Socket} from 'socket.io-client';
import {setIndicator, setTimeTick} from '../redux/slice';
import {ContextType} from './context';

export const candlestickEvents = ({setValue, user_id, socketCandlestick, dispatch}) => {
  if (!socketCandlestick) return;

  socketCandlestick.on('connect', () => {
    /** join room ethusdt */
    socketCandlestick.emit(ROOM.ETHUSDT);
    /** join room indicator ethusdt */
    socketCandlestick.emit(ROOM.INDICATOR_ETHUSDT);
  });

  /** lấy dữ liệu nến sau khi join room ethusdt */
  socketCandlestick.on(EVENTS.BLOCKS_ETHUSDT, (result: any) => {
    // thêm object vào mảng block cuối cùng để front-end runtime data
    let blocks: any = [...result];
    blocks.push(blocks[blocks.length - 1]);
    setValue((state: ContextType) => ({...state, blocks}));
  });

  /** dữ liệu nến trả về từng giây */
  socketCandlestick.on(EVENTS.ETHUSDT_REALTIME, (result: any) => {
    const real_data = result.candlestick;
    const timeTick = result.timeTick % 30;
    const isTrade = result.timeTick >= 30 ? false : true;
    dispatch(setTimeTick({timeTick, isTrade}));
    setValue((state: ContextType) => ({...state, real_data, timeTick, isTrade}));
  });

  /** dữ liệu indicator trả về 4s/lần */
  socketCandlestick.on(EVENTS.INDICATOR_ETHUSDT, function (result: any) {
    dispatch(setIndicator(result));
  });
};

export const candlestickDisconnect = (socketCandlestick: Socket | null) => {
  if (!socketCandlestick) return;
  socketCandlestick.off(EVENTS.BLOCKS_ETHUSDT);
  socketCandlestick.off(EVENTS.ETHUSDT_REALTIME);
  socketCandlestick.off(EVENTS.USER_AMOUNT_CHANGE);
  socketCandlestick.disconnect();
};
