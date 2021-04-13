import React from 'react';
import { Nav, Tab } from 'react-bootstrap';
import ContainerLayout from './containerLayout';
import CryptoChart from './cryptoChart';
import Indicator from './indicator';
import LastResult from './lastResult';
import SocketProvider from './socketContext';
import './styled.css';

const height = window.innerHeight - 322;

const TradingComponent = () => {
  return (
    <SocketProvider>
      <ContainerLayout>
        <div className="row">
          <div className="col-lg-12 pr-0" style={{ height }}>
            <CryptoChart height={height} />
          </div>
          <div className="col-lg-12 px-0">
            <div className="card text-center" style={{ height: '250px', marginBottom: 0, width: '100%' }}>
              <Tab.Container defaultActiveKey="indicator">
                <div className="card-header">
                  <Nav className="nav-tabs card-header-tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="indicator">Indicator</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="last_result">Last Result</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
                <div className="card-body py-0">
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
    </SocketProvider>
  );
};

export default React.memo(TradingComponent);
