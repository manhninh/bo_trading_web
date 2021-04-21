import ContainerLayout from 'containers/components/layout/Container';
import SpinnerLoader from 'containers/components/loader';
import _ from 'lodash';
import React, {lazy, Suspense} from 'react';
import {Nav, NavItem, Tab, TabContent} from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import {NavLink, Redirect, Route, useLocation} from 'react-router-dom';
import './styled.css';

const components = {
  profile: lazy(() => import('./profile')),
  security: lazy(() => import('./security')),
};

const SettingComponent = () => {
  const {pathname} = useLocation();

  const renderNavItems = () =>
    Object.keys(components).map((route) => (
      <NavItem key={`${route}-nav-item`}>
        <Nav.Link as={NavLink} to={`/settings/${route}`} active={pathname === `/settings/${route}`}>
          {_.startCase(route)}
        </Nav.Link>
      </NavItem>
    ));

  const renderRoutes = () =>
    Object.entries(components).map(([route, Component]) => (
      <Route key={`${route}-route`} path={`/settings/${route}`}>
        <Tab.Pane active={pathname === `/settings/${route}`}>
          <Component />
        </Tab.Pane>
      </Route>
    ));

  return (
    <ContainerLayout>
      <div className="row">
        <div className="col-lg-12">
          <Tab.Container>
            <Nav fill={true} justify={true} variant="tabs">
              {renderNavItems()}
            </Nav>
            <TabContent>
              <Suspense fallback={<SpinnerLoader />}>
                <Switch>
                  <Redirect from="/" to="/settings/profile" />
                  {renderRoutes()}
                </Switch>
              </Suspense>
            </TabContent>
          </Tab.Container>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default React.memo(SettingComponent);
