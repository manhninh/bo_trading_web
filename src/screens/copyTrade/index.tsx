import React from 'react';
import ContainerLayout from 'containers/components/layout/Container';

const CopyTradeComponent = () => {
  return (
    <ContainerLayout>
      <div className="row" style={{marginTop:"15%"}}>
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
    </ContainerLayout>
  );
};

export default React.memo(CopyTradeComponent);
