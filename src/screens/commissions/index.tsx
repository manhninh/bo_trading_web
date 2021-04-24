import WinnerImg from 'assets/images/winner.png';
import ContainerLayout from 'containers/components/layout/Container';
import SpinnerLoader from 'containers/components/loader';
import _ from 'lodash';
import React, {lazy, Suspense} from 'react';
import {Nav, NavItem, Tab, TabContent} from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import {Redirect, Route, useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';
import './styled.css';

const components = {
  trading: lazy(() => import('./trading')),
  copy_trade: lazy(() => import('./copytrade')),
  history_withdraw: lazy(() => import('./historyWithdraw')),
  member_list: lazy(() => import('./memberList')),
};

const CommissionComponent = () => {
  const {pathname} = useLocation();

  const renderNavItems = () =>
    Object.keys(components).map((route) => (
      <NavItem key={`${route}-nav-item`}>
        <Nav.Link as={NavLink} to={`/commissions/${route}`} active={pathname === `/commissions/${route}`}>
          {_.startCase(route.split('_').join(' '))}
        </Nav.Link>
      </NavItem>
    ));

  const renderRoutes = () =>
    Object.entries(components).map(([route, Component]) => (
      <Route key={`${route}-route`} path={`/commissions/${route}`}>
        <Tab.Pane active={pathname === `/commissions/${route}`}>
          <Component />
        </Tab.Pane>
      </Route>
    ));

  return (
    <ContainerLayout>
      <>
        <div className="row">
          <div className="offset-lg-3 col-lg-3">
            <div className="user-block block block-bg text-center p-0 pb-3">
              <div className="avatar avatar-custom">
                <img src={WinnerImg} alt="..." className="img-fluid" />
              </div>
              <a href="#" className="user-title mt-0">
                <h1 className="h1 mt-0 text-warning">140$</h1>
                <span className="text-light">Commission Trade</span>
              </a>
              <div className="contributions">
                <button type="button" className="btn btn-link text-info">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="user-block block block-bg text-center p-0 pb-3">
              <div className="avatar avatar-custom">
                <img src={WinnerImg} alt="..." className="img-fluid" />
              </div>
              <a href="#" className="user-title mt-0">
                <h1 className="h1 mt-0 text-warning">120$</h1>
                <span className="text-light">Commission Copy Trade</span>
              </a>
              <div className="contributions">
                <button type="button" className="btn btn-link text-info">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Tab.Container>
              <Nav fill={true} justify={true} variant="tabs">
                {renderNavItems()}
              </Nav>
              <TabContent>
                <Suspense fallback={<SpinnerLoader />}>
                  <Switch>
                    <Redirect from="/" to="/commissions/trading" />
                    {renderRoutes()}
                  </Switch>
                </Suspense>
              </TabContent>
            </Tab.Container>
          </div>
        </div>
      </>
    </ContainerLayout>
  );
};

export default React.memo(CommissionComponent);
