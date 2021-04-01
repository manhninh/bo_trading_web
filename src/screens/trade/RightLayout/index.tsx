import {ReactComponent as DevideSvg} from 'assets/images/devide.svg';
import React from 'react';
import './styled.css';

const RightLayout = () => {
  return (
    <div className="d-flex align-items-stretch" style={{width: '400px'}}>
      <div className="card" style={{marginBottom: 0, width: '100%', padding: '0.5rem'}}>
        <div className="block" style={{background: '#49505A', borderRadius: '10px'}}>
          <div className="title">
            <strong className="d-block">Income</strong>
          </div>
          <div className="block-body">
            <div className="stats-2 d-flex">
              <div className="stats-2-content">
                <strong className="d-block text-primary" style={{fontSize: 26}}>
                  + 95%
                </strong>
              </div>
              <div className="stats-2-content">
                <strong className="d-block text-primary" style={{fontSize: 20, marginLeft: '1rem'}}>
                  + 950%
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="block" style={{background: '#49505A', borderRadius: '10px'}}>
          <div className="title">
            <strong className="d-block">Amount</strong>
          </div>
          <div className="block-body">
            <div className="form-group">
              <input type="email" placeholder="$ 0" className="form-control input-amount" />
            </div>
            <div className="form-group">
              <div className="input-group-append d-flex justify-content-between">
                <button className="btn btn-secondary" style={{width: '20%'}}>
                  <i className="fa fa-plus" />
                </button>
                <button className="btn btn-secondary" style={{width: '20%'}}>
                  <i className="fa fa-minus" />
                </button>
                <button className="btn btn-secondary" style={{width: '20%'}}>
                  <i className="fa fa-times" />
                </button>
                <button className="btn btn-secondary" style={{width: '20%'}}>
                  <DevideSvg />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RightLayout);
