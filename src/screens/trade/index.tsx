import SpinnerLoader from 'containers/components/loader';
import React, {useEffect, useState} from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import ContainerLayout from './ContainerLayout';
import StockChart from './StockChart';
import './styled.css';
import {getData} from './utils';
const height = window.innerWidth < 768 ? window.innerHeight - 270 : window.innerHeight - 372;

const TradingComponent = () => {
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    getData().then((data) => {
      setDataChart(data);
    });
  }, []);

  return (
    <ContainerLayout>
      <div className="row">
        <div className="col-lg-12" style={{height}}>
          {dataChart.length > 0 ? <StockChart data={dataChart} height={height} /> : <SpinnerLoader />}
        </div>
        <div className="col-lg-12">
          <div className="card" style={{height: '300px', marginBottom: 0, width: '100%'}}>
            <Tabs defaultActiveKey="indicator">
              <Tab eventKey="indicator" title="Indicator">
                <div>2222</div>
              </Tab>
              <Tab eventKey="last_result" title="Last Result">
                <div>222333</div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default React.memo(TradingComponent);
