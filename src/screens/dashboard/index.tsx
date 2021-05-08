import HeaderLayout from 'containers/components/layout/Header';
import {LoadingProvider} from 'containers/hooks/loadingProvider';
import React from 'react';
import './styled.css';
import {Scrollbars} from 'react-custom-scrollbars';

const DashboardComponent = () => {
  return (
    <LoadingProvider>
      <Scrollbars style={{height: '100vh'}}>
        <div className="background-home">
          <HeaderLayout noBackground={true} />
          <div className="bg-step5" />
          <div className="bg-step6" />
          <div className="bg-step1" />
          <div className="bg-step2" />
          <div className="bg-step3" />
          <div className="bg-step4" />
        </div>
        <div className="d-flex footer-home">
          <div className="d-inline-block footer-left">
            <div className="brand-big text-uppercase">
              <img src={process.env.PUBLIC_URL + '/logo512.png'} className="footer-img" />
            </div>
            <span className="text-light footer-font">
              Finimix is developed by professionals with year of experience in the information technology, finace and
              crypto fields to create a smart, secure, relible and susrainable investment platform.
            </span>
          </div>
          <div className="d-inline-block w-70-per">
            <div className="d-flex footer-right">
              <a href="#">Term of use</a>
              <a href="#">Privacy</a>
              <a href="#">Contact with us</a>
              <a href="#">Address</a>
            </div>
          </div>
        </div>
      </Scrollbars>
    </LoadingProvider>
  );
};

export default React.memo(DashboardComponent);
