import { useAppSelector } from 'boot/configureStore';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentOrder } from 'screens/trade/redux/thunks';
import './styled.css';

const ActionInfor = () => {
  const dispatch = useDispatch();
  const totalBuy = useAppSelector((state) => state.tradeState.totalBuy);
  const totalSell = useAppSelector((state) => state.tradeState.totalSell);
  const type_user = useAppSelector((state) => state.authState.accountInfor.type_user);

  useEffect(() => {
    // lấy lại thông tin lệnh buy/sell đang có
    dispatch(fetchCurrentOrder());
  }, []);

  return (
    <>
      <div className="title display-flex action-infor" style={{ position: "absolute", top: "20.8rem" }}>
        <h5 className="text-info">BUY</h5>
        <h5 className="text-info">$ {totalBuy}</h5>
      </div>
      <div className="title display-flex action-infor" style={{ position: "absolute", top: "20.8rem", right: 0, textAlign: "right" }}>
        <h5 className="text-danger">SELL</h5>
        <h5 className="text-danger">{totalSell} $</h5>
      </div>
    </>
  );
};

export default React.memo(ActionInfor);
