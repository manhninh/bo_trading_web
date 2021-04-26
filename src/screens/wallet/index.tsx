import ContainerLayout from 'containers/components/layout/Container';
import SpinnerLoader from 'containers/components/loader';
import _ from 'lodash';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Nav, NavItem, Tab, TabContent } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { NavLink, Redirect, Route, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();
  const [state, setState] = useState({
    requestRefesh: null
  });

  useEffect(() => {
    if (state.requestRefesh) {
      setTimeout(() => {
        setState({ ...state, requestRefesh: null });
      }, 1000);
    }
  }, [state.requestRefesh]);

  const onRequestRefesh = (tabActive) => {
    setState({ ...state, requestRefesh: tabActive });
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
    <ContainerLayout>
      <div className="row">
        <div className="text-center action-img">
          <div className="action-bottom">
            <DepositComponent />
            <TransferComponent onRequestRefesh={onRequestRefesh} />
            <WithdrawComponent onRequestRefesh={onRequestRefesh} />
          </div>
        </div>
        <div className="block right-body py-0">
          <div className="row">
            <div className="col-lg-12">
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
        </div>
      </div>
    </ContainerLayout>
  );
};

export default React.memo(WalletComponent);
