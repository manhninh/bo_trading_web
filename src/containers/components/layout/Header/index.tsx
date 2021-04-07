import React, {useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import LogInPopupComponent from 'screens/authen/loginPopup';
import RegisterPopupComponent from 'screens/authen/register/popup';
import {Props, State} from './propState';
import './styled.css';

const HeaderLayout = (props: Props) => {
  const [state, setState] = useState<State>({
    isOpenSignin: false,
    isOpenSignup: false,
  });

  const toggleSignUp = () => setState((prevState) => ({...prevState, isOpenSignup: !prevState.isOpenSignup}));

  const toggleSignIn = () => setState((prevState) => ({...prevState, isOpenSignin: !prevState.isOpenSignin}));

  return (
    <>
      <header className="header">
        <nav className={`navbar navbar-expand-lg ${props.noBackground ? 'no-background' : ''}`}>
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
              <div className="list-inline-item dropdown visible">
                <Dropdown>
                  <Dropdown.Toggle
                    variant="danger"
                    className="nav-link language dropdown-toggle"
                    style={{borderRadius: '0', marginRight: '2rem'}}>
                    <div style={{display: 'inline-block', marginLeft: '1rem', textAlign: 'left'}}>
                      <span style={{display: 'block', marginBottom: 5, fontSize: 14}}>Demo</span>
                      <span style={{display: 'block', fontSize: 18, fontWeight: 'bold'}}>$ 10.000.000</span>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{borderRadius: '0px 0px 10px 10px'}}>
                    <Dropdown.Item
                      href="#/action-1"
                      className="dropdown-item"
                      style={{borderRadius: '0px 0px 10px 10px', background: '#28a745'}}>
                      <div style={{marginLeft: '1rem', textAlign: 'left'}}>
                        <span style={{display: 'block', marginBottom: 5, fontSize: 14, color: '#FFFFFF'}}>Real</span>
                        <span style={{display: 'block', fontSize: 18, fontWeight: 'bold', color: '#FFFFFF'}}>$ 0</span>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="list-inline-item">
                <button className="sidebar-toggle">
                  <i className="fas fa-align-justify"></i>
                </button>
              </div>
              <div className="list-inline-item visible">
                <input type="button" value="DEPOSIT" className="btn btn-primary header-deposit" />
              </div>
              <div className="list-inline-item visible">
                <a id="logout" href="login.html" className="nav-link">
                  <i className="icomoon-icon-user"></i>
                  <span className="d-none d-sm-inline">phammanhninh</span>
                </a>
              </div>
              <div className="list-inline-item visible">
                <a id="logout" href="login.html" className="nav-link">
                  <span className="badge dashbg-3">1</span>
                  <i className="icomoon-icon-notification"></i>
                  <span className="d-none d-sm-inline">Notification</span>
                </a>
              </div>
              <div className="list-inline-item visible">
                <input type="button" value="LogIn" className="btn btn-primary header-deposit" onClick={toggleSignIn} />
              </div>
              <div className="list-inline-item visible">
                <input
                  type="button"
                  value="Register"
                  className="btn btn-warning header-deposit"
                  onClick={toggleSignUp}
                />
              </div>
            </div>
          </div>
        </nav>
      </header>
      <LogInPopupComponent isOpen={state.isOpenSignin} callbackToogle={toggleSignIn} />
      <RegisterPopupComponent isOpen={state.isOpenSignup} callbackToogle={toggleSignUp} />
    </>
  );
};

export default React.memo(HeaderLayout);
