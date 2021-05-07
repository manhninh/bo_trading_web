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
        </div>
        <div className="d-flex" style={{backgroundColor: '#312A89', padding: '40px 0'}}>
          <div className="d-inline-block" style={{width: '25%', marginLeft: '40px'}}>
            <div className="brand-big text-uppercase">
              <img src={process.env.PUBLIC_URL + '/logo512.png'} style={{height: '40px', marginBottom: '30px'}} />
            </div>
            <span className="text-light">
              Finimix is developed by professionals with year of experience in the information technology, finace and
              crypto fields to create a smart, secure, relible and susrainable investment platform.
            </span>
          </div>
          <div className="d-inline-block" style={{width: '70%'}}>
            <div className="d-flex" style={{justifyContent:"space-evenly", marginTop:"10px"}}>
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
