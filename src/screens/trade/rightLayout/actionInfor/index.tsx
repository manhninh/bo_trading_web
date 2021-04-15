import React from 'react';
import './styled.css';

const ActionInfor = () => {
  return (
    <>
      <div className="title display-flex action-infor">
        <h3 className="text-info">BUY</h3>
        <h3 className="text-info">-</h3>
        <h2 className="text-info">$ 0</h2>
      </div>
      <div className="title display-flex action-infor">
        <h3 className="text-danger">SELL</h3>
        <h3 className="text-danger">-</h3>
        <h2 className="text-danger">$ 0</h2>
      </div>
    </>
  );
};

export default React.memo(ActionInfor);
