import React from 'react';
import './styled.css';

const HeaderLayout = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div className="navbar-header">
            <a href="index.html" className="navbar-brand">
              <div className="brand-big text-uppercase">
                <strong className="logoIOGO">IOGO</strong>
                <strong className="logoETH">ETH</strong>
              </div>
            </a>
          </div>
          <div className="right-menu list-inline no-margin-bottom">
            <div
              className="list-inline-item dropdown"
              style={{background: '#22252a', borderRadius: '0px 0px 10px 10px', marginRight: '2rem'}}>
              <a
                id="languages"
                rel="nofollow"
                data-target="#"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="nav-link language dropdown-toggle">
                <div style={{display: 'inline-block', marginLeft: '1rem'}}>
                  <span style={{display: 'block', marginBottom: 5}}>Demo</span>
                  <span style={{display: 'block'}}>$ 10.000.000</span>
                </div>
              </a>
              <div aria-labelledby="languages" className="dropdown-menu">
                <a rel="nofollow" href="#" className="dropdown-item">
                  <span>Real</span>
                  <span>$ 0</span>
                </a>
              </div>
            </div>
            <div className="list-inline-item">
              <input type="button" value="DEPOSIT" className="btn btn-primary" />
            </div>
            <div className="list-inline-item">
              <a id="logout" href="login.html" className="nav-link">
                <i className="icomoon-icon-user"></i>
                <span className="d-none d-sm-inline">Mr.Dung</span>
              </a>
            </div>
            <div className="list-inline-item">
              <a id="logout" href="login.html" className="nav-link">
                <span className="badge dashbg-3">1</span>
                <i className="icomoon-icon-notification"></i>
                <span className="d-none d-sm-inline">Notification</span>
              </a>
            </div>
            <div className="list-inline-item">
              <a id="logout" href="login.html" className="nav-link">
                <i className="icomoon-icon-support"></i>
                <span className="d-none d-sm-inline">Support</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default React.memo(HeaderLayout);
