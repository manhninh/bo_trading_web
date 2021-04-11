import DownImage from 'assets/images/down.png';
import UpImage from 'assets/images/up.png';
import React from 'react';
import './styled.css';

const BuySellAction = () => {
  return (
    <div className="buy-sel-action">
      <button className="btn btn-block btn-info btn-buy-sel-action">
        <img src={UpImage} className="btn-buy-sel-icon" />
        <span className="btn-buy-sel-text">BUY</span>
      </button>
      <button className="btn btn-block btn-danger btn-buy-sel-action mt-3">
        <img src={DownImage} className="btn-buy-sel-icon" />
        <span className="btn-buy-sel-text">SELL</span>
      </button>
    </div>
  );
};

export default React.memo(BuySellAction);
