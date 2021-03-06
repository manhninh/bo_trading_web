import {useAppSelector} from 'boot/configureStore';
import {TypeUser} from 'constants/system';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useMediaQuery} from 'react-responsive';
import {useHistory} from 'react-router';
import {ROUTE_PATH} from 'routers/helpers';
import {restoreAccount, signOut} from 'routers/redux/slice';
import LogInPopupComponent from 'screens/authen/login/popup';
import RegisterPopupComponent from 'screens/authen/register/popup';
import {IProps, Props, State} from './propState';
import {fetchUpdateAmountDemo, fetchUserInfor} from './services';
import './styled.css';
import SwitchAccountComponent from './switchAccount';
import SwitchLanguageComponent from './switchLanguage';

const HeaderLayout = (props: IProps = Props) => {
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1024px)'});
  const {t} = useTranslation();
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
  const type_user = useAppSelector((state) => state.authState.accountInfor.type_user);

  useEffect(() => {
    if (authState && !state.isAuthen) checkAuthenToken();
  }, [authState]);

  useEffect(() => {
    if (!authState && history.location.pathname === ROUTE_PATH.LOGIN)
      setState((prevState) => ({...prevState, openSignIn: true}));
    else if (!authState && history.location.pathname.includes(ROUTE_PATH.REGISTER))
      setState((prevState) => ({...prevState, openSignUp: true}));
  }, [history.location.pathname]);

  useEffect(() => {
    setState((prevState) => ({...prevState, openSignIn: props.openLogin}));
  }, [props.openLogin]);

  useEffect(() => {
    setState((prevState) => ({...prevState, openSignUp: props.openRegister}));
  }, [props.openRegister]);

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

  const toggleSignUp = () => {
    setState((prevState) => ({...prevState, openSignUp: !prevState.openSignUp}));
    if (props.cbOpenRegister) props.cbOpenRegister();
  };

  const toggleSignIn = () => {
    setState((prevState) => ({...prevState, openSignIn: !prevState.openSignIn}));
    if (props.cbOpenLogin) props.cbOpenLogin();
  };

  const logOut = () => {
    setState((state) => ({...state, isAuthen: false}));
    dispatch(signOut());
    history.push(ROUTE_PATH.TRADE);
  };

  const resetAmountDemo = () => {
    const accountInfor: any = {
      amount_demo: 10000,
    };
    fetchUpdateAmountDemo();
    dispatch(restoreAccount(accountInfor));
  };

  return (
    <>
      {!state.isAuthen ? (
        <>
          <div className="header-top">
            <div className="container d-flex align-items-center">
              <a href={ROUTE_PATH.TRADE} className="logo">
                <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="" className="h-30" />
              </a>
              <div className="login_or_register d-flex align-items-center">
                <a href="javascript:void(0)" onClick={toggleSignIn}>
                  Login
                </a>
                <a className="active" href="javascript:void(0)" onClick={toggleSignUp}>
                  Sign up
                </a>
              </div>
            </div>
          </div>
          <LogInPopupComponent isOpen={state.openSignIn} callbackToogle={toggleSignIn} />
          <RegisterPopupComponent isOpen={state.openSignUp} callbackToogle={toggleSignUp} />
        </>
      ) : (
        <>
          <header className="header">
            <nav className={`navbar navbar-expand-lg ${props.noBackground ? 'no-background' : ''}`}>
              <div className="container-fluid d-flex align-items-center justify-content-between">
                <div className="navbar-header">
                  <a href={ROUTE_PATH.TRADE} className="navbar-brand">
                    <div className="brand-big text-uppercase">
                      <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="" className="h-30" />
                    </div>
                  </a>
                </div>
                <div className="right-menu list-inline no-margin-bottom">
                  {state.isAuthen ? (
                    <>
                      <div className="list-inline-item dropdown visible">
                        <SwitchAccountComponent />
                      </div>
                      {type_user === TypeUser.DEMO ? (
                        <div className="list-inline-item visible">
                          <button className="btn btn-link btn-sm none-box-shadow p-0" onClick={resetAmountDemo}>
                            <i className="fas fa-redo-alt text-success" style={{fontSize: '1.5rem'}} />
                          </button>
                        </div>
                      ) : null}
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
                      <div className="list-inline-item">
                        <a className="nav-link" onClick={logOut}>
                          <i className="icomoon-icon-logout"></i>
                          {isDesktopOrLaptop ? (
                            <span className="d-none d-sm-inline">{t('common:header.logout')}</span>
                          ) : null}
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="list-inline-item visible">
                        <input type="button" value="LogIn" className="btn btn-info btn-lg" onClick={toggleSignIn} />
                      </div>
                      <div className="list-inline-item visible">
                        <input
                          type="button"
                          value="Register"
                          className="btn btn-danger btn-lg"
                          onClick={toggleSignUp}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </header>
        </>
      )}
    </>
  );
};

export default React.memo(HeaderLayout);
