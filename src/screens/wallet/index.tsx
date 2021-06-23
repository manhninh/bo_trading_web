import {useAppSelector} from 'boot/configureStore';
import config from 'constants/config';
import ContainerLayout from 'containers/components/layout/Container';
import SpinnerLoader from 'containers/components/loader';
import React, {lazy, Suspense, useCallback, useState} from 'react';
import {Nav, NavItem, Tab, TabContent} from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import {useTranslation} from 'react-i18next';
import {NavLink, Redirect, Route, useHistory, useLocation} from 'react-router-dom';
import {formatter2} from 'utils/formatter';
import DepositComponent from './deposit';
import './styled.css';
import TransferComponent from './transfer';
import {TYPE_WALLET} from './transfer/propState';
import WithdrawComponent from './withdraw';

const WalletComponent = () => {
  const {t, i18n} = useTranslation();
  const {pathname} = useLocation();
  const history = useHistory();
  const amount = useAppSelector((state) => state.authState.accountInfor.amount);
  const amount_trade = useAppSelector((state) => state.authState.accountInfor.amount_trade);
  const amount_expert = useAppSelector((state) => state.authState.accountInfor.amount_expert);
  const amount_copytrade = useAppSelector((state) => state.authState.accountInfor.amount_copytrade);
  const is_expert = useAppSelector((state) => state.authState.accountInfor.is_expert);

  const components = {
    [t('common:wallet.depositHistory')]: lazy(() => import('./deposit/history')),
    [t('common:wallet.tranferHistory')]: lazy(() => import('./transfer/history')),
    [t('common:wallet.withdrawHistory')]: lazy(() => import('./withdraw/history')),
  };

  const [state, setState] = useState({
    requestRefesh: null,
  });

  const onRequestRefesh = useCallback(
    (tabActive) => {
      setState({...state, requestRefesh: tabActive});
    },
    [state.requestRefesh],
  );

  const renderNavItems = () =>
    Object.keys(components).map((route) => (
      <NavItem key={`${route}-nav-item`}>
        <Nav.Link as={NavLink} to={`/wallet/${route}`} active={pathname === `/wallet/${route}`}>
          {t(`common:wallet.${route}`)}
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
              <div className="progress-details d-flex align-items-center justify-content-between mb-2">
                <div className="title">
                  <div className="icon text-center d-inline-block mr-3">
                    <i className="fab fa-trade-federation text-warning fs-2rem" />
                  </div>
                  <h2 className="fs-2rem text-warning text-bold d-inline-block mb-0">
                    {t('common:wallet.walletSpot')}
                  </h2>
                </div>
                <div className="number text-warning text-bold">{formatter2.format(amount)} USDF</div>
              </div>
              <DepositComponent />
              <TransferComponent
                onRequestRefesh={onRequestRefesh}
                onlyInAccount={false}
                amount={amount}
                type_wallet={TYPE_WALLET.SPOT}
              />
              <WithdrawComponent onRequestRefesh={onRequestRefesh} />
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <div className="statistic-block block block-custom">
              <div className="progress-details d-flex align-items-center justify-content-between mb-2">
                <div className="title">
                  <div className="icon text-center d-inline-block mr-3">
                    <i className="far fa-chart-bar text-success fs-2rem" />
                  </div>
                  <h2 className="fs-2rem text-success text-bold d-inline-block mb-0">
                    {t('common:wallet.walletTrade')}
                  </h2>
                </div>
                <div className="number text-success text-bold">$ {formatter2.format(amount_trade)}</div>
              </div>
              <TransferComponent
                onRequestRefesh={onRequestRefesh}
                onlyInAccount={true}
                amount={amount_trade}
                type_wallet={TYPE_WALLET.TRADE}
              />
            </div>
          </div>
          {/* <div className="col-md-6 col-xs-12">
            <div className="statistic-block block block-custom">
              <div className="progress-details d-flex align-items-center justify-content-between">
                <div className="title">
                  <div className="icon text-center d-inline-block mr-3">
                    <i className="icon-flow-branch text-light fs-2rem" />
                  </div>
                  <h2 className="text-light text-bold d-inline-block mb-0">{t('common:wallet.walletCopy')}</h2>
                </div>
                <div className="number text-light text-bold">{formatter2.format(amount_copytrade)} USDF</div>
              </div>
              <TransferComponent
                onRequestRefesh={onRequestRefesh}
                onlyInAccount={true}
                amount={amount_copytrade}
                type_wallet={TYPE_WALLET.COPY_TRADE}
              />
            </div>
          </div>
          <div className="col-md-6 col-xs-12">
            <div className="statistic-block block block-custom">
              <div className="progress-details d-flex align-items-center justify-content-between">
                <div className="title">
                  <div className="icon text-center d-inline-block mr-3">
                    <i className="icon-layers text-light fs-2rem" />
                  </div>
                  <h2 className="text-light text-bold d-inline-block mb-0">{t('common:wallet.walletExpert')}</h2>
                </div>
                <div className="number text-light text-bold">{formatter2.format(amount_expert)} USDF</div>
              </div>
              {is_expert ? (
                <TransferComponent
                  onRequestRefesh={onRequestRefesh}
                  onlyInAccount={true}
                  amount={amount_expert}
                  type_wallet={TYPE_WALLET.EXPERT}
                />
              ) : (
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => history.push(ROUTE_PATH.COPY_TRADE)}>
                  {t('common:wallet.active')}
                </button>
              )}
            </div>
          </div> */}
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
