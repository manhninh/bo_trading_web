import {RootState, useAppSelector} from 'boot/configureStore';
import React, {useMemo} from 'react';
import {createSelector} from 'reselect';
import './styled.css';

const ActionInfor = () => {
  // total buy
  const makeSelectorTotalBuy = () =>
    createSelector(
      (state: RootState) => state.tradeState.totalBuy,
      (_: any, props: number) => props,
      (totalBuy, props) => (totalBuy !== props ? totalBuy : props),
    );
  const selectorTotalBuy = useMemo(makeSelectorTotalBuy, []);
  const totalBuy = useAppSelector((state) => selectorTotalBuy(state, 0));

  // total sell
  const makeSelectorTotalSell = () =>
    createSelector(
      (state: RootState) => state.tradeState.totalSell,
      (_: any, props: number) => props,
      (totalSell, props) => (totalSell !== props ? totalSell : props),
    );
  const selectorTotalSell = useMemo(makeSelectorTotalSell, []);
  const totalSell = useAppSelector((state) => selectorTotalSell(state, 0));

  return (
    <>
      <div className="title display-flex action-infor">
        <h3 className="text-info">BUY</h3>
        <h3 className="text-info">-</h3>
        <h2 className="text-info">$ {totalBuy}</h2>
      </div>
      <div className="title display-flex action-infor">
        <h3 className="text-danger">SELL</h3>
        <h3 className="text-danger">-</h3>
        <h2 className="text-danger">$ {totalSell}</h2>
      </div>
    </>
  );
};

export default React.memo(ActionInfor);
