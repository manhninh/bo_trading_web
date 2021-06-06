import {RootState, useAppSelector} from 'boot/configureStore';
import React, {useMemo} from 'react';
import {Nav, Tab} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {useMediaQuery} from 'react-responsive';
import {createSelector} from 'reselect';
import Dashboard from 'screens/dashboard';
import ContainerLayout from './containerLayout';
import CryptoChart from './highCharts';
import SocketProvider from './highChartSocketContext';
import Indicator from './indicator';
import LastResult from './lastResult';
import './styled.css';

const TradingComponent = () => {
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1024px)'});
  const isTablet = useMediaQuery({query: '(min-width: 768px) and (max-width: 1023px)'});
  const isMobile = useMediaQuery({query: '(max-width: 767px)'});
  const height = window.innerHeight - (isDesktopOrLaptop ? 272 : 370);
  const xAxisMin = isDesktopOrLaptop ? 43 : isMobile ? 83 : 63;

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
        <div className="col-12 px-0" style={{height}}>
          <SocketProvider>
            <CryptoChart height={height} xAxisMin={xAxisMin} />
          </SocketProvider>
        </div>
        {isDesktopOrLaptop ? (
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
        ) : (
          <LastResult />
        )}
      </div>
    </ContainerLayout>
  ) : (
    <Dashboard />
  );
};

export default React.memo(TradingComponent);
