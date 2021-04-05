import React from 'react';
import CountDownTimer from "./CountDown";
import './styled.css';

const RightLayout = () => {
  return (
    <>
      <div className="block block-container">
        <div className="title">
          <strong className="d-block">Income</strong>
        </div>
        <div className="block-body">
          <div className="stats-2 d-flex">
            <div className="stats-2-content">
              <strong className="d-block text-primary" style={{ fontSize: 22 }}>
                + 95000%
                </strong>
            </div>
            <div className="stats-2-content">
              <strong className="d-block text-primary" style={{ fontSize: 16, marginLeft: '.5rem' }}>
                + 95000%
                </strong>
            </div>
          </div>
        </div>
      </div>
      <div className="block block-container">
        <div className="title">
          <strong className="d-block">Amount</strong>
        </div>
        <div className="block-body">
          <div className="form-group">
            <input type="email" placeholder="$ 0" className="form-control input-amount" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <div className="input-group-append d-flex justify-content-between">
              <button type="button" className="btn btn-secondary btn-outline-secondary">
                <i className="fas fa-plus" />
              </button>
              <button type="button" className="btn btn-secondary btn-outline-secondary">
                <i className="fas fa-minus" />
              </button>
              <button type="button" className="btn btn-secondary btn-outline-secondary">
                <i className="fas fa-times" />
              </button>
              <button type="button" className="btn btn-secondary btn-outline-secondary">
                <i className="fas fa-divide" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <CountDownTimer />
      <div className="btn-group buy-sel-action justify-content-center">
        <button className="btn btn-lg btn-info">
          <i className="fas fa-chevron-circle-up" /> BUY
          </button>
        <button className="btn btn-lg btn-danger">
          <i className="fas fa-chevron-circle-down" /> SELL
          </button>
      </div>
    </>
  );
};

export default React.memo(RightLayout);
