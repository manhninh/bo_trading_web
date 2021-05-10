import {useAppSelector} from 'boot/configureStore';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ROUTE_PATH} from 'routers/helpers';
import {restoreAccount, signOut} from 'routers/redux/slice';
import LogInPopupComponent from 'screens/authen/login/popup';
import RegisterPopupComponent from 'screens/authen/register/popup';
import {IProps, Props, State} from './propState';
import {fetchUserInfor} from './services';
import './styled.css';
import SwitchAccountComponent from './switchAccount';
import SwitchLanguageComponent from './switchLanguage';

const HeaderLayout = (props: IProps = Props) => {
  const { t } = useTranslation();
  const [state, setState] = useState<State>({
    openSignIn: false,
    openSignUp: false,
    isAuthen: false,
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const authState = useAppSelector((state) => state.authState.userToken);
  const username = useAppSelector((state) => state.authState.accountInfor.username);

  useEffect(() => {
    if (authState && !state.isAuthen) checkAuthenToken();
  }, [authState]);

  useEffect(() => {
    if (!authState && history.location.pathname === ROUTE_PATH.LOGIN)
      setState((prevState) => ({...prevState, openSignIn: true}));
    else if (!authState && history.location.pathname.includes(ROUTE_PATH.REGISTER))
      setState((prevState) => ({...prevState, openSignUp: true}));
  }, [history.location.pathname]);

  const checkAuthenToken = async () => {
    showLoading();
    try {
      const res = await fetchUserInfor();
      if (res.data && res.data.length > 0) {
        await dispatch(restoreAccount(res.data[0]));
        setState((state) => ({...state, isAuthen: true, openSignin: false}));
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

  const toggleSignUp = () => setState((prevState) => ({...prevState, openSignUp: !prevState.openSignUp}));

  const toggleSignIn = () => setState((prevState) => ({...prevState, openSignIn: !prevState.openSignIn}));

  const logOut = () => {
    setState((state) => ({...state, isAuthen: false}));
    dispatch(signOut());
    history.push(ROUTE_PATH.TRADE);
  };

  return (
    <>
      <header className="header">
        <nav className={`navbar navbar-expand-lg ${props.noBackground ? 'no-background' : ''}`}>
          <div className="container-fluid d-flex align-items-center justify-content-between">
            <div className="navbar-header">
              <a href={ROUTE_PATH.TRADE} className="navbar-brand">
                <div className="brand-big text-uppercase">
                  <img src={process.env.PUBLIC_URL + '/logo512.png'} style={{height: '40px', marginBottom: '10px'}} />
                </div>
              </a>
            </div>
            <div className="right-menu list-inline no-margin-bottom">
              {state.isAuthen ? (
                <>
                  <div className="list-inline-item dropdown visible">
                    <SwitchAccountComponent />
                  </div>
                  <div className="list-inline-item">
                    <button className="sidebar-toggle">
                      <i className="fas fa-align-justify"></i>
                    </button>
                  </div>
                  <div className="list-inline-item visible">
                    <a className="nav-link">
                      <i className="icomoon-icon-user text-danger"></i>
                      <span className="d-none d-sm-inline text-danger">{username}</span>
                    </a>
                  </div>
                </>
              ) : null}
              <div className={`list-inline-item dropdown visible ${!state.isAuthen ? 'lng-positision' : ''}`}>
                <SwitchLanguageComponent />
              </div>
              {state.isAuthen ? (
                <>
                  <div className="list-inline-item visible">
                    <a className="nav-link" onClick={logOut}>
                      <i className="icomoon-icon-logout"></i>
                      <span className="d-none d-sm-inline">{t('common:header.logout')}</span>
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="list-inline-item visible">
                    <input type="button" value="LogIn" className="btn btn-info btn-lg" onClick={toggleSignIn} />
                  </div>
                  <div className="list-inline-item visible">
                    <input type="button" value="Register" className="btn btn-danger btn-lg" onClick={toggleSignUp} />
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      {!state.isAuthen && (
        <>
          <LogInPopupComponent isOpen={state.openSignIn} callbackToogle={toggleSignIn} />
          <RegisterPopupComponent isOpen={state.openSignUp} callbackToogle={toggleSignUp} />
        </>
      )}
    </>
  );
};

export default React.memo(HeaderLayout);
