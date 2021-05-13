import moment from 'moment';
import {EVENTS, ROOM} from 'screens/trade/socketContext/socketConfig';
import {Socket} from 'socket.io-client';
import {addResultToBlocks, setIndicator, setResultBlocks, setTimeTick} from '../redux/slice';
import {OHLC, Volumes, ContextType} from './context';

export const candlestickEvents = ({setValue, socketCandlestick, dispatch}) => {
  if (!socketCandlestick) return;

  socketCandlestick.on('connect', () => {
    /** join room ethusdt */
    socketCandlestick.emit(ROOM.ETHUSDT);
    /** join room indicator ethusdt */
    socketCandlestick.emit(ROOM.INDICATOR_ETHUSDT);
  });

  /** lấy dữ liệu nến sau khi join room ethusdt */
  socketCandlestick.on(EVENTS.BLOCKS_ETHUSDT, (result: any) => {
    console.log(result, 'result');
    // thêm object vào mảng block cuối cùng để front-end runtime data
    const ohlc: OHLC[] = [];
    const volumes: Volumes[] = [];
    result.map((item: any) => {
      ohlc.push({
        x: new Date(item.event_time),
        y: [item.open, item.high, item.low, item.close],
      });
      volumes.push({
        x: new Date(item.event_time),
        y: item.volume,
      });
    });
    const newDate = moment(ohlc[ohlc.length - 1]['x'])
      .add(30, 'seconds')
      .toString();
    ohlc.push({
      x: new Date(newDate),
      y: ohlc[ohlc.length - 1]['y'],
    });

    // volumes.push(volumes[volumes.length - 1]);
    setValue((state: ContextType) => ({...state, ohlc, volumes}));
  });

  /** lấy dữ liệu kết quả nến để tổng hợp sau khi join room ethusdt */
  socketCandlestick.on(EVENTS.RESULT_ETHUSDT, (result: any) => {
    dispatch(setResultBlocks(result));
  });

  /** dữ liệu nến trả về từng giây */
  socketCandlestick.on(EVENTS.ETHUSDT_REALTIME, (result: any) => {
    const real_data = result.candlestick;
    const timeTick = result.timeTick % 30;
    const isTrade = result.timeTick >= 30 ? false : true;
    if (result.timeTick === 0) {
      let newResult: boolean | null = null;
      if (real_data.open < real_data.close) newResult = false;
      else if (real_data.open > real_data.close) newResult = true;
      if (newResult) dispatch(addResultToBlocks({result: newResult}));
    }
    dispatch(setTimeTick({timeTick, isTrade}));
    const realData = {
      x: new Date(real_data.event_time),
      y: [Number(real_data.open), Number(real_data.high), Number(real_data.low), Number(real_data.close)],
    };
    setValue((state: ContextType) => ({...state, real_data: realData, timeTick}));
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
