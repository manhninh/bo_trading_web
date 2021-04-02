import React from 'react';
import CountDownTimer from "./CountDown";
import './styled.css';

const RightLayout = () => {
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className="d-flex align-items-stretch" style={{ width: '400px' }}>
      <div className="card" style={{ marginBottom: 0, width: '100%', padding: '0.5rem' }}>
        <div className="block" style={{ background: '#49505A', borderRadius: '10px' }}>
          <div className="title">
            <strong className="d-block">Income</strong>
          </div>
          <div className="block-body">
            <div className="stats-2 d-flex">
              <div className="stats-2-content">
                <strong className="d-block text-primary" style={{ fontSize: 26 }}>
                  + 95%
                </strong>
              </div>
              <div className="stats-2-content">
                <strong className="d-block text-primary" style={{ fontSize: 20, marginLeft: '1.5rem' }}>
                  + 950%
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="block">
          <div className="title">
            <strong className="d-block">Amount</strong>
          </div>
          <div className="block-body">
            <div className="form-group">
              <input type="email" placeholder="$ 0" className="form-control input-amount" />
            </div>
            <div className="form-group">
              <div className="input-group-append d-flex justify-content-between">
                <button type="button" className="btn btn-secondary btn-outline-secondary" style={{ width: '20%' }}>
                  <i className="fas fa-plus" />
                </button>
                <button type="button" className="btn btn-secondary btn-outline-secondary" style={{ width: '20%' }}>
                  <i className="fas fa-minus" />
                </button>
                <button type="button" className="btn btn-secondary btn-outline-secondary" style={{ width: '20%' }}>
                  <i className="fas fa-times" />
                </button>
                <button type="button" className="btn btn-secondary btn-outline-secondary" style={{ width: '20%' }}>
                  <i className="fas fa-divide" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <CountDownTimer />
      </div>
    </div>
  );
};

export default React.memo(RightLayout);
