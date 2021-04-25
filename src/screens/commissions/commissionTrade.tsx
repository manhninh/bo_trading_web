import WinnerImg from 'assets/images/winner.png';
import React from 'react';
import './styled.css';

const CommissionTradeComponent = () => {
  return (
    <div className="user-block block block-bg text-center p-0 pb-3">
      <div className="avatar avatar-custom">
        <img src={WinnerImg} alt="..." className="img-fluid" />
      </div>
      <a href="#" className="user-title mt-0">
        <h1 className="h1 mt-0 text-warning">140$</h1>
        <span className="text-light">Commission Trade</span>
      </a>
      <div className="contributions">
        <button type="button" className="btn btn-link text-info">
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default React.memo(CommissionTradeComponent);
