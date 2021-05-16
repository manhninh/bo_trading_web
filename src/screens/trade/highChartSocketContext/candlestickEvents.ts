import moment from 'moment';
import {EVENTS, ROOM} from './socketConfig';
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
      volumes.push({
        x: new Date(item.event_time).valueOf(),
        y: item.volume,
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

    setValue((state: ContextType) => ({...state, ohlc, volumes}));
  });

  /** lấy dữ liệu 96 nến kết quả sau khi join room ethusdt */
  socketCandlestick.on(EVENTS.RESULT_ETHUSDT, (result: any) => {
    const blocks: any[] = [];
    let groupIndex = 1;
    for (let index = 0; index <= 5; index++) {
      const group = result[index];
      if (group) {
        if (index === 0) groupIndex = result[index]._id;
        const data = new Array();
        for (let i = 0; i <= 15; i++) {
          const current = group.el_number[i];
          data.push(current === null || current === undefined ? null : current);
        }
        blocks.push({groupIndex, data});
      } else {
        const data = new Array(16);
        data.fill(null);
        blocks.push({groupIndex, data});
      }
      groupIndex += 1;
    }
    dispatch(setResultBlocks(blocks));
  });

  /** kêt quả cuối cùng trả ra */
  socketCandlestick.on(EVENTS.LAST_RESULT, (result: any) => {
    dispatch(addResultToBlocks(result));
  });

  /** dữ liệu nến trả về từng giây */
  socketCandlestick.on(EVENTS.ETHUSDT_REALTIME, (result: any) => {
    const real_data = result.candlestick;
    const timeTick = result.timeTick % 30;
    const isTrade = result.timeTick >= 30 ? false : true;
    dispatch(setTimeTick({timeTick, isTrade}));
    const newDate = new Date(real_data.event_time).valueOf();
    const realData = [
      newDate,
      Number(real_data.open),
      Number(real_data.high),
      Number(real_data.low),
      Number(real_data.close),
    ];
    const volumes = {
      x: newDate,
      y: real_data.volume,
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
