import DownImage from 'assets/images/down.png';
import UpImage from 'assets/images/up.png';
import {RootState, useAppSelector} from 'boot/configureStore';
import {TypeUser, TYPE_ORDER} from 'constants/system';
import {Order} from 'models/orders';
import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {createSelector} from 'reselect';
import {restoreAccount} from 'routers/redux/slice';
import {setTotalBuy, setTotalSell} from 'screens/trade/redux/slice';
import {IProps, Props} from './propState';
import {fetchOrder} from './services';
import './styled.css';

const BuySellAction = (props: IProps = Props) => {
  const dispatch = useDispatch();
  const buyRef = React.useRef(0);
  const sellRef = React.useRef(0);
  // user type
  const makeSelectorTypeUser = () =>
    createSelector(
      (state: RootState) => state.authState.accountInfor.type_user,
      (_: any, props: TypeUser) => props,
      (typeUser, props) => (typeUser !== props ? typeUser : props),
    );
  const selectorTypeUser = useMemo(makeSelectorTypeUser, []);
  const typeUser = useAppSelector((state) => selectorTypeUser(state, TypeUser.REAL));

  // user amount
  const makeSelectorAmountUser = () =>
    createSelector(
      (state: RootState) => state.authState.accountInfor,
      (_: any, props: TypeUser) => props,
      (typeUser, _props) => {
        switch (typeUser.type_user) {
          case 1:
            return typeUser.amount_demo;
          case 2:
            return typeUser.amount_expert;
          case 3:
            return typeUser.amount_copytrade;
          default:
            return typeUser.amount_trade;
        }
      },
    );
  const selectorAmountUser = useMemo(makeSelectorAmountUser, []);
  const amountUser = useAppSelector((state) => selectorAmountUser(state, typeUser));

  // check open trade
  const makeSelectorTrade = () =>
    createSelector(
      (state: RootState) => state.tradeState.isTrade,
      (_: any, props: boolean) => props,
      (isTrade, props) => {
        if (isTrade !== props) return true;
        else {
          buyRef.current = 0;
          sellRef.current = 0;
          return false;
        }
      },
    );
  const selectorTrade = useMemo(makeSelectorTrade, []);
  const trade = useAppSelector((state) => selectorTrade(state, false));

  const _btnBuy = () => {
    if (props.place === 0) return;
    const totalBuy = buyRef.current + props.place;
    if (amountUser - totalBuy - sellRef.current > 0) {
      // lưu total buy
      buyRef.current = totalBuy;
      // truyền totalbuy xuống giá trị bên dưới để hiển thị
      dispatch(setTotalBuy(totalBuy));
      // thay đổi số tiền hiển thị
      _changeAmountHeader(amountUser - props.place);
      // call api buy
      const order: Order = {
        typeUser: typeUser,
        typeOrder: TYPE_ORDER.BUY,
        amount: props.place,
      };
      fetchOrder(order)
        .then((result) => {
          if (!result) toast.error('Orders fail!');
        })
        .catch(() => toast.error('Orders fail!'));
    } else toast.error('Your balance is not enough!');
  };

  const _btnSell = () => {
    if (props.place === 0) return;
    const totalSell = sellRef.current + props.place;
    if (amountUser - totalSell - buyRef.current > 0) {
      // lưu total sell
      sellRef.current = totalSell;
      // truyền total sell xuống giá trị bên dưới để hiển thị
      dispatch(setTotalSell(totalSell));
      // thay đổi số tiền hiển thị
      _changeAmountHeader(amountUser - props.place);
      // call api sell
      const order: Order = {
        typeUser: typeUser,
        typeOrder: TYPE_ORDER.SELL,
        amount: props.place,
      };
      fetchOrder(order)
        .then((result) => {
          if (!result) toast.error('Orders fail!');
        })
        .catch(() => toast.error('Orders fail!'));
    } else toast.error('Your balance is not enough!');
  };

  const _changeAmountHeader = (amount: number) => {
    const accountInfor: any = {};
    switch (typeUser) {
      case 1:
        accountInfor.amount_demo = amount;
        break;
      case 2:
        accountInfor.amount_expert = amount;
        break;
      default:
        accountInfor.amount_trade = amount;
        break;
    }
    dispatch(restoreAccount(accountInfor));
  };

  return (
    <div className="buy-sel-action">
      {trade ? (
        <>
          <button className="btn btn-block btn-info btn-buy-sel-action" onClick={_btnBuy}>
            <img src={UpImage} className="btn-buy-sel-icon" />
            <span className="btn-buy-sel-text">BUY</span>
          </button>
          <button className="btn btn-block btn-danger btn-buy-sel-action mt-3" onClick={_btnSell}>
            <img src={DownImage} className="btn-buy-sel-icon" />
            <span className="btn-buy-sel-text">SELL</span>
          </button>
        </>
      ) : (
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
      )}
    </div>
  );
};

export default React.memo(BuySellAction);
