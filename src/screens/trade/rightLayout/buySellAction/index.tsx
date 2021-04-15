import DownImage from 'assets/images/down.png';
import UpImage from 'assets/images/up.png';
import { RootState, useAppSelector } from 'boot/configureStore';
import { TypeUser } from 'constants/system';
import { Order } from 'models/orders';
import React, { useMemo } from 'react';
import { toast } from 'react-toastify';
import { createSelector } from 'reselect';
import { fetchOrder } from './services';
import './styled.css';

const BuySellAction = () => {
  // user type
  const makeSelectorTypeUser = () => createSelector(
    (state: RootState) => state.authState.accountInfor.type_user,
    (_: any, props: TypeUser) => props,
    (typeUser, props) => typeUser !== props ? typeUser : props
  );
  const selectorTypeUser = useMemo(makeSelectorTypeUser, []);
  const typeUser = useAppSelector(state => selectorTypeUser(state, TypeUser.REAL));

  // check open trade
  const makeSelectorTrade = () => createSelector(
    (state: RootState) => state.tradeState.isTrade,
    (_: any, props: boolean) => props,
    (isTrade, props) => isTrade !== props ? true : false
  );
  const selectorTrade = useMemo(makeSelectorTrade, []);
  const trade = useAppSelector(state => selectorTrade(state, false));

  const _btnBuy = () => {
    console.log(typeUser, "typeUser");
    const order: Order = {
      typeUser: typeUser,
      typeOrder: 0,
      amount: 10
    };
    fetchOrder(order).then((result) => {
      if (result) toast.info("Orders successfully!");
      else toast.error("Orders fail!");
    }).catch(() => toast.error("Orders fail!"));
  };

  const _btnSell = () => {
    const order: Order = {
      typeUser: typeUser,
      typeOrder: 0,
      amount: 10
    };
    fetchOrder(order).then((result) => {
      if (result) toast.info("Orders successfully!");
      else toast.error("Orders fail!");
    }).catch(() => toast.error("Orders fail!"));
  };

  console.log(trade);

  return (
    <div className="buy-sel-action">
      {trade ?
        <>
          <button className="btn btn-block btn-info btn-buy-sel-action" onClick={_btnBuy}>
            <img src={UpImage} className="btn-buy-sel-icon" />
            <span className="btn-buy-sel-text">BUY</span>
          </button>
          <button className="btn btn-block btn-danger btn-buy-sel-action mt-3" onClick={_btnSell}>
            <img src={DownImage} className="btn-buy-sel-icon" />
            <span className="btn-buy-sel-text">SELL</span>
          </button>
        </> :
        <>
          <button className="btn btn-block btn-disabled btn-secondary btn-buy-sel-action" aria-readonly={true}>
            <img src={UpImage} className="btn-buy-sel-icon" />
            <span className="btn-buy-sel-text">BUY</span>
          </button>
          <button className="btn btn-block btn-disabled btn-secondary btn-buy-sel-action mt-3" aria-readonly={true}>
            <img src={DownImage} className="btn-buy-sel-icon" />
            <span className="btn-buy-sel-text">SELL</span>
          </button>
        </>
      }
    </div>
  );
};

export default React.memo(BuySellAction);
