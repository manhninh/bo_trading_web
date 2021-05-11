import {MaxAmountPlace, PlaceType} from 'constants/system';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import ActionInfor from './actionInfor';
import BuySellAction from './buySellAction';
import CountDownTimer from './countDown';
import './styled.css';

const RightLayout = () => {
  const {t} = useTranslation();
  const [place, setPlace] = useState(1);

  const onChangeAmount = (e: any) => {
    const {value} = e.target;
    setPlace(value ? parseInt(value.toString().replace(/,/g, '')) : 0);
  };

  const handClickPlace = (type: PlaceType) => () => {
    let value: number;
    switch (type) {
      case PlaceType.Add:
        value = place + 1 >= MaxAmountPlace ? place : place + 1;
        break;
      case PlaceType.Subtract:
        value = place >= 1 ? place - 1 : 0;
        break;
      case PlaceType.Multiply:
        value = place * 2 >= MaxAmountPlace ? place : place * 2;
        break;
      default:
        value = Math.round(place / 2);
        break;
    }
    setPlace(value);
  };

  return (
    <>
      <div className="block block-container">
        <div className="title">
          <strong className="d-block">{t('common:rightbar.profit')}</strong>
        </div>
        <div className="block-body">
          <div className="stats-2 d-flex">
            <div className="stats-2-content">
              <strong className="d-block text-primary profit-text">+ 95%</strong>
            </div>
            <div className="stats-2-content">
              <strong className="d-block text-primary profit-result">+ ${((place || 0) * 95) / 100}</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="block block-container">
        <div className="title">
          <strong className="d-block">{t('common:rightbar.invesment')}</strong>
        </div>
        <div className="block-body">
          <div className="form-group">
            <div className="amount-wrapper">
              <span className="text-currency">$</span>
              <NumberFormat
                thousandSeparator={true}
                decimalScale={0}
                maxLength={5}
                allowNegative={false}
                autoComplete="off"
                placeholder="0"
                className="text-input"
                onChange={onChangeAmount}
                value={place}
              />
            </div>
          </div>
          <div className="form-group mb-0">
            <div className="input-group-append d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary btn-outline-secondary"
                onClick={handClickPlace(PlaceType.Add)}>
                <i className="fas fa-plus" />
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-outline-secondary"
                onClick={handClickPlace(PlaceType.Subtract)}>
                <i className="fas fa-minus" />
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-outline-secondary"
                onClick={handClickPlace(PlaceType.Multiply)}>
                <i className="fas fa-times" />
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-outline-secondary"
                onClick={handClickPlace(PlaceType.Devide)}>
                <i className="fas fa-divide" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="time-action">
        <BuySellAction place={place} />
        <CountDownTimer />
      </div>
      <ActionInfor />
    </>
  );
};

export default React.memo(RightLayout);
