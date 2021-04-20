import {useAppSelector} from 'boot/configureStore';
import React from 'react';
import './styled.css';

const ActionInfor = () => {
  const totalBuy = useAppSelector((state) => state.tradeState.totalBuy);
  const totalSell = useAppSelector((state) => state.tradeState.totalSell);

  console.log('ActionInfor');
  return (
    <>
      <div className="title display-flex action-infor">
        <h5 className="text-info">BUY</h5>
        <h5 className="text-info">-</h5>
        <h5 className="text-info">$ {totalBuy}</h5>
      </div>
      <div className="title display-flex action-infor">
        <h5 className="text-danger">SELL</h5>
        <h5 className="text-danger">-</h5>
        <h5 className="text-danger">$ {totalSell}</h5>
      </div>
    </>
  );
};

export default React.memo(ActionInfor);
