import {RootState, useAppSelector} from 'boot/configureStore';
import React, {useMemo} from 'react';
import {Nav, Tab} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {createSelector} from 'reselect';
import Dashboard from 'screens/dashboard';
import ContainerLayout from './containerLayout';
import CryptoChart from './highCharts';
import Indicator from './indicator';
import LastResult from './lastResult';
import SocketProvider from './highChartSocketContext';
import './styled.css';

const height = window.innerHeight - 272;

const TradingComponent = () => {
  const {t} = useTranslation();
  const makeSelectorAuthState = () =>
    createSelector(
      (state: RootState) => state.authState.userToken,
      (_: any, props: string | null | undefined) => props,
      (authState, props) => (authState !== props ? authState : props),
    );
  const selectorAuthState = useMemo(makeSelectorAuthState, []);
  const authState = useAppSelector((state) => selectorAuthState(state, null));

  return authState ? (
    <ContainerLayout>
      <div className="row">
        <div className="col-lg-12 pr-0" style={{height}}>
          <SocketProvider>
            <CryptoChart height={height} />
          </SocketProvider>
        </div>
        <div className="col-lg-12 px-0">
          <div className="card text-center bottom-indicator">
            <Tab.Container defaultActiveKey="indicator">
              <div className="card-header card-header-custom">
                <Nav className="nav-tabs card-header-tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="indicator" className="nav-link-custom">
                      {t('common:trade.indicator')}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="last_result" className="nav-link-custom">
                      {t('common:trade.lastResult')}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className="card-body p-0">
                <Tab.Content>
                  <Tab.Pane eventKey="indicator">
                    <Indicator />
                  </Tab.Pane>
                  <Tab.Pane eventKey="last_result">
                    <LastResult />
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
          </div>
        </div>
      </div>
    </ContainerLayout>
  ) : (
    <Dashboard />
  );
};

export default React.memo(TradingComponent);
