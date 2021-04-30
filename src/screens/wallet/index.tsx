import {useAppSelector} from 'boot/configureStore';
import config from 'constants/config';
import ContainerLayout from 'containers/components/layout/Container';
import SpinnerLoader from 'containers/components/loader';
import _ from 'lodash';
import React, {lazy, Suspense, useEffect, useState} from 'react';
import {Nav, NavItem, Tab, TabContent} from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import {NavLink, Redirect, Route, useLocation} from 'react-router-dom';
import {formatter2} from 'utils/formatter';
import DepositComponent from './deposit';
import './styled.css';
import TransferComponent from './transfer';
import WithdrawComponent from './withdraw';

const components = {
  deposit_history: lazy(() => import('./deposit/history')),
  transfer_history: lazy(() => import('./transfer/history')),
  withdraw_history: lazy(() => import('./withdraw/history')),
};

const WalletComponent = () => {
  const {pathname} = useLocation();
  const amount = useAppSelector((state) => state.authState.accountInfor.amount);
  const amount_trade = useAppSelector((state) => state.authState.accountInfor.amount_trade);
  const amount_expert = useAppSelector((state) => state.authState.accountInfor.amount_expert);
  const amount_copytrade = useAppSelector((state) => state.authState.accountInfor.amount_copytrade);

  const [state, setState] = useState({
    requestRefesh: null,
  });

  useEffect(() => {
    if (state.requestRefesh) {
      setTimeout(() => {
        setState({...state, requestRefesh: null});
      }, 1000);
    }
  }, [state.requestRefesh]);

  const onRequestRefesh = (tabActive) => {
    setState({...state, requestRefesh: tabActive});
  };

  const onChangeReCaptcha = (token: string) => {
    console.log(token);
  };

  const renderNavItems = () =>
    Object.keys(components).map((route) => (
      <NavItem key={`${route}-nav-item`}>
        <Nav.Link as={NavLink} to={`/wallet/${route}`} active={pathname === `/wallet/${route}`}>
          {_.startCase(route.split('_').join(' '))}
        </Nav.Link>
      </NavItem>
    ));

  const renderRoutes = () =>
    Object.entries(components).map(([route, Component]) => (
      <Route key={`${route}-route`} path={`/wallet/${route}`}>
        <Tab.Pane active={pathname === `/wallet/${route}`}>
          <Component requestRefesh={state.requestRefesh} />
        </Tab.Pane>
      </Route>
    ));

  return (
    <GoogleReCaptchaProvider reCaptchaKey={config.GOOGLE_RECAPTCHA_SITE_KEY} scriptProps={{async: true}}>
      <ContainerLayout>
        <div className="row">
          <div className="col-md-6 col-xs-12">
            <div className="statistic-block block block-custom">
              <div className="progress-details d-flex align-items-center justify-content-between">
                <div className="title">
                  <div className="icon text-center d-inline-block mr-3">
                    <i className="fab fa-trade-federation text-warning fs-2rem" />
                  </div>
                  <h2 className="text-warning text-bold d-inline-block mb-0">Wallet Spot</h2>
                </div>
                <div className="number text-warning text-bold">{formatter2.format(amount)} USDF</div>
              </div>
              <DepositComponent />
              <TransferComponent onRequestRefesh={onRequestRefesh} onlyInAccount={false} />
              <WithdrawComponent onRequestRefesh={onRequestRefesh} />
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <div className="statistic-block block block-custom">
              <div className="progress-details d-flex align-items-center justify-content-between">
                <div className="title">
                  <div className="icon text-center d-inline-block mr-3">
                    <i className="far fa-chart-bar text-success fs-2rem" />
                  </div>
                  <h2 className="text-success text-bold d-inline-block mb-0">Wallet Trade</h2>
                </div>
                <div className="number text-success text-bold">{formatter2.format(amount_trade)} USDF</div>
              </div>
              <TransferComponent onRequestRefesh={onRequestRefesh} onlyInAccount={true} />
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <div className="statistic-block block block-custom">
              <div className="progress-details d-flex align-items-center justify-content-between">
                <div className="title">
                  <div className="icon text-center d-inline-block mr-3">
                    <i className="icon-flow-branch text-light fs-2rem" />
                  </div>
                  <h2 className="text-light text-bold d-inline-block mb-0">Wallet Copy</h2>
                </div>
                <div className="number text-light text-bold">{formatter2.format(amount_copytrade)} USDF</div>
              </div>
              <TransferComponent onRequestRefesh={onRequestRefesh} onlyInAccount={true} />
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <div className="statistic-block block block-custom">
              <div className="progress-details d-flex align-items-center justify-content-between">
                <div className="title">
                  <div className="icon text-center d-inline-block mr-3">
                    <i className="icon-layers text-light fs-2rem" />
                  </div>
                  <h2 className="text-light text-bold d-inline-block mb-0">Wallet Expert</h2>
                </div>
                <div className="number text-light text-bold">{formatter2.format(amount_expert)} USDF</div>
              </div>
              <button type="button" className="btn btn-sm btn-danger">
                Active
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Tab.Container>
              <Nav fill={true} justify={true} variant="tabs">
                {renderNavItems()}
              </Nav>
              <TabContent>
                <Suspense fallback={<SpinnerLoader />}>
                  <Switch>
                    <Redirect from="/" to="/wallet/deposit_history" />
                    {renderRoutes()}
                  </Switch>
                </Suspense>
              </TabContent>
            </Tab.Container>
          </div>
        </div>
      </ContainerLayout>
    </GoogleReCaptchaProvider>
  );
};

export default React.memo(WalletComponent);
