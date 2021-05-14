import moment from 'moment';
import {EVENTS, ROOM} from 'screens/trade/socketContext/socketConfig';
import {Socket} from 'socket.io-client';
import {addResultToBlocks, setIndicator, setResultBlocks, setTimeTick} from '../redux/slice';
import {OHLC, Volumes, ContextType} from './context';
import {random} from 'utils/formatter';

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
    // const blocks = result.slice(-66);
    // thêm object vào mảng block cuối cùng để front-end runtime data
    const ohlc: OHLC[] = [];
    const volumes: Volumes[] = [];
    result.map((item: any) => {
      ohlc.push([
        new Date(item.event_time).valueOf(),
        Number(item.open),
        Number(item.high),
        Number(item.low),
        Number(item.close),
      ]);
      const newVolume =
        Number(item.volume) <= 10
          ? Number(item.volume) + 10
          : Number(item.volume) >= 50
          ? 50 - random(1, 10)
          : Number(item.volume);
      volumes.push({
        x: new Date(item.event_time).valueOf(),
        y: newVolume,
        color: Number(item.open) > Number(item.close) ? '#F04B4B' : '#16CEB9',
      });
    });
    const newDate = new Date(
      moment(ohlc[ohlc.length - 1][0])
        .add(30, 'seconds')
        .toString(),
    ).valueOf();
    ohlc.push([
      newDate,
      ohlc[ohlc.length - 1][4],
      ohlc[ohlc.length - 1][4],
      ohlc[ohlc.length - 1][4],
      ohlc[ohlc.length - 1][4],
    ]);
    volumes.push({
      x: newDate,
      y: volumes[volumes.length - 1][1],
      color: '#16CEB9',
    });

    // đường ema
    // let period = 34;
    // let values = result.map((item: any) => Number(item.close));
    // let emaIndicator = EMA.calculate({period, values});
    // const ema10 = result.slice(-67);
    // const ema10Indicator = ema10.map((item: any, index: number) => {
    //   return {
    //     x: new Date(item.event_time).valueOf(),
    //     y: emaIndicator[index],
    //   };
    // });
    // console.log(ema10Indicator, 'ema10Indicator');
    // end: đường ema
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
    const newDate = new Date(real_data.event_time).valueOf();
    const realData = [
      newDate,
      Number(real_data.open),
      Number(real_data.high),
      Number(real_data.low),
      Number(real_data.close),
      Number(real_data.volume) <= 10 ? Number(real_data.volume) + 10 : Number(real_data.volume),
    ];
    const newVolume =
      Number(real_data.volume) <= 10
        ? Number(real_data.volume) + 10
        : Number(real_data.volume) >= 50
        ? 50 - random(1, 10)
        : Number(real_data.volume);
    const volumes = {
      x: newDate,
      y: newVolume,
      color: Number(real_data.open) > Number(real_data.close) ? '#F04B4B' : '#16CEB9',
    };
    setValue((state: ContextType) => ({...state, real_data: realData, real_volume: volumes, timeTick}));
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
