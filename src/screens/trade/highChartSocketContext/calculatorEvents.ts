import { signOut } from 'routers/redux/slice';
import { setWinLoss } from 'screens/trade/redux/slice';
import { EVENTS, ROOM } from './socketConfig';
import { Socket } from 'socket.io-client';

export const calculatorEvents = ({ socketCalculator, dispatch }) => {
  if (!socketCalculator) return;

  socketCalculator.on('connect', () => {
    /** tạo zoom với user_id để nhận socket emit */
    socketCalculator.emit(ROOM.USER_CONNECTED);
  });

  /** khi gặp lỗi với socket tính toán sẽ đẩy ra trang home */
  socketCalculator.on('connect_error', () => {
    dispatch(signOut());
  });

  /** thay đổi số tiền */
  socketCalculator.on(EVENTS.RESULT_BUY_SELL, function (result: any) {
    dispatch(setWinLoss(result));
  });
};

export const calculatorDisconnect = (socketCalculator: Socket | null) => {
  if (!socketCalculator) return;
  socketCalculator.disconnect();
};
