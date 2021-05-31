import React from 'react';

const CopyTradeComponent = () => {
  return (
    <div className="row" style={{ marginTop: "15%" }}>
      <div className="col-12">
        <div className=" text-center">
          <div className="brand-big">
            <img src={process.env.PUBLIC_URL + '/logo512.png'} />
          </div>
          <h1 className="text-danger">We're coming soon</h1>
          <p>We will launch our very soon</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CopyTradeComponent);
