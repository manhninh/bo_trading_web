import BgLogin from 'assets/images/bg_login.png';
import {LoadingProvider} from 'containers/hooks/loadingProvider';
import React from 'react';
import {useHistory} from 'react-router';
import {ROUTE_PATH} from 'routers/helpers';
import LogInComponent from '../component';
import './styled.css';

const LogInFormComponent = () => {
  const history = useHistory();

  const gotoDashboard = () => {
    history.push(ROUTE_PATH.DASHBOARD);
  };

  return (
    <LoadingProvider>
      <div className="login-page">
        <div className="container d-flex align-items-center">
          <div className="form-holder has-shadow">
            <div className="row">
              <div className="col-lg-6">
                <div
                  className="info d-flex align-items-center"
                  style={{
                    backgroundImage: `url(${BgLogin})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}>
                  <div className="content">
                    <div className="logo">
                      <h1 className="d-inline-block">IOGO</h1> <h1 className="d-inline-block text-danger">ETH</h1>
                    </div>
                    <p>Nơi chấp cánh những giấc mơ biệt thự và siêu xe</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form d-flex align-items-center">
                  <div className="content">
                    <a href={ROUTE_PATH.DASHBOARD} className="logo-link">
                      <div className="text-uppercase">
                        <strong className="logoIOGO">IOGO</strong>
                        <strong className="logoETH">ETH</strong>
                      </div>
                    </a>
                    <LogInComponent fnAfterLogin={gotoDashboard} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadingProvider>
  );
};

export default React.memo(LogInFormComponent);
