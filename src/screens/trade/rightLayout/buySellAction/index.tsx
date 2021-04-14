import DownImage from 'assets/images/down.png';
import UpImage from 'assets/images/up.png';
import { useAppSelector } from 'boot/configureStore';
import { Order } from 'models/orders';
import React from 'react';
import { toast } from 'react-toastify';
import { fetchOrder } from './services';
import './styled.css';

const BuySellAction = ({ isTrade }) => {
  const accountInfor = useAppSelector(state => state.authState.accountInfor);

  const _btnBuy = () => {
    const order: Order = {
      typeUser: accountInfor.type_user,
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
      typeUser: accountInfor.type_user,
      typeOrder: 0,
      amount: 10
    };
    fetchOrder(order).then((result) => {
      if (result) toast.info("Orders successfully!");
      else toast.error("Orders fail!");
    }).catch(() => toast.error("Orders fail!"));
  };

  return (
    <div className="buy-sel-action">
      {isTrade ?
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
