import { useAppSelector } from 'boot/configureStore';
import { useLoading } from 'containers/hooks/loadingProvider/userLoading';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ROUTE_PATH } from 'routers/helpers';
import { restoreToken, signOut } from 'routers/redux/slice';
import LogInPopupComponent from 'screens/authen/login/popup';
import RegisterPopupComponent from 'screens/authen/register/popup';
import { Props, State } from './propState';
import { fetchUserInfor } from './services';
import './styled.css';

const HeaderLayout = (props: Props) => {
  const [state, setState] = useState<State>({
    isOpenSignin: false,
    isOpenSignup: false,
    isAuthen: false
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const authState = useAppSelector((state) => state.authState);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    if (authState.userToken) checkAuthenToken();
  }, [authState.userToken]);

  const checkAuthenToken = async () => {
    showLoading();
    try {
      const res = await fetchUserInfor();
      if (res.data && res.data.length > 0) {
        await dispatch(restoreToken(res.data[0]));
        setState(state => ({ ...state, isAuthen: true }));
        toggleSignIn();
      } else {
        dispatch(signOut());
        history.push(ROUTE_PATH.LOGIN);
      }
    } catch (error) {
      dispatch(signOut());
      history.push(ROUTE_PATH.LOGIN);
    } finally {
      hideLoading();
    }
  };

  const toggleSignUp = () => setState((prevState) => ({ ...prevState, isOpenSignup: !prevState.isOpenSignup }));

  const toggleSignIn = () => setState((prevState) => ({ ...prevState, isOpenSignin: !prevState.isOpenSignin }));
  console.log("sss");
  return (
    <>
      <header className="header">
        <nav className={`navbar navbar-expand-lg ${props.noBackground ? 'no-background' : ''}`}>
          <div className="container-fluid d-flex align-items-center justify-content-between">
            <div className="navbar-header">
              <a href={ROUTE_PATH.DASHBOARD} className="navbar-brand">
                <div className="brand-big text-uppercase">
                  <strong className="logoIOGO">IOGO</strong>
                  <strong className="logoETH">ETH</strong>
                </div>
              </a>
            </div>
            <div className="right-menu list-inline no-margin-bottom">
              {state.isAuthen ?
                <>
                  <div className="list-inline-item dropdown visible">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="danger"
                        className="nav-link language dropdown-toggle"
                        style={{ borderRadius: '0', marginRight: '2rem' }}>
                        <div style={{ display: 'inline-block', marginLeft: '1rem', textAlign: 'left' }}>
                          <span style={{ display: 'block', marginBottom: 5, fontSize: 14 }}>Demo</span>
                          <span style={{ display: 'block', fontSize: 18, fontWeight: 'bold' }}>$ 10.000.000</span>
                        </div>
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ borderRadius: '0px 0px 10px 10px' }}>
                        <Dropdown.Item
                          href="#/action-1"
                          className="dropdown-item"
                          style={{ borderRadius: '0px 0px 10px 10px', background: '#28a745' }}>
                          <div style={{ marginLeft: '1rem', textAlign: 'left' }}>
                            <span style={{ display: 'block', marginBottom: 5, fontSize: 14, color: '#FFFFFF' }}>Real</span>
                            <span style={{ display: 'block', fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>$ 0</span>
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
                    <a id="logout" href="login.html" className="nav-link">
                      <i className="fas fa-sign-out-alt"></i>
                      <span className="d-none d-sm-inline">Log out</span>
                    </a>
                  </div>
                </>
                :
                <>
                  <div className="list-inline-item visible">
                    <input
                      type="button"
                      value="LogIn"
                      className="btn btn-primary"
                      onClick={toggleSignIn} />
                  </div>
                  <div className="list-inline-item visible">
                    <input
                      type="button"
                      value="Register"
                      className="btn btn-danger"
                      onClick={toggleSignUp}
                    />
                  </div>
                </>}
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
