import WinnerImg from 'assets/images/winner.png';
import React from 'react';
import { number2DecimalPlaces } from 'utils/formatter';
import { Commission } from './propState';
import './styled.css';

interface Iprops {
  commission: Commission | undefined;
  openPopup: (type, withdraw: number) => void;
}

const CommissionCopyTradeComponent = (props: Iprops) => {
  return (
    <div className="user-block block block-bg text-center p-0 pb-3">
      <div className="avatar avatar-custom">
        <img src={WinnerImg} alt="..." className="img-fluid" />
      </div>
      <a href="#" className="user-title mt-0">
        <h1 className="h1 mt-0 text-warning">{`$ ${number2DecimalPlaces(props.commission?.commission || 0)}`}</h1>
        <span className="text-light">Commission Copy Trade</span>
      </a>
      <div className="contributions">
        <button
          type="button"
          className="btn btn-link text-info shadow-none"
          onClick={() => props.openPopup(1, number2DecimalPlaces(props.commission?.commission || 0))}>
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default React.memo(CommissionCopyTradeComponent);
