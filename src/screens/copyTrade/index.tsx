import ContainerLayout from 'containers/components/layout/Container';
import SpinnerLoader from 'containers/components/loader';
import React, { lazy, Suspense } from 'react';
import { Nav, NavItem, Tab, TabContent } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

const copy_tradeComponent = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const components = {
    [t('common:copy_trade.community_tab')]: lazy(() => import('./community')),
    [t('common:copy_trade.expert_area_tab')]: lazy(() => import('./expert'))
  };

  const renderNavItems = () =>
    Object.keys(components).map((route) => (
      <NavItem key={`${route}-nav-item`}>
        <Nav.Link as={NavLink} to={`/copy-trade/${route}`} active={pathname === `/copy-trade/${route}`}>
          {t(`common:copy_trade.${route}`)}
        </Nav.Link>
      </NavItem>
    ));

  const renderRoutes = () =>
    Object.entries(components).map(([route, Component]) => (
      <Route key={`${route}-route`} path={`/copy-trade/${route}`}>
        <Tab.Pane active={pathname === `/copy-trade/${route}`}>
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
                  <Redirect from="/" to="/copy-trade/community" />
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

export default React.memo(copy_tradeComponent);
