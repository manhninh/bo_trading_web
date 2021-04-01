import ContainerLayout from 'containers/components/layout/Container';
import LoaderPage from 'containers/components/loader';
import React, { useEffect, useState } from 'react';
import StockChart from "./StockChart";
import { getData } from './utils';

const TradingComponent = () => {
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    getData().then(data => {
      setDataChart(data);
    });
  }, []);

  return (
    <ContainerLayout>
      {dataChart.length > 0 ?
        <StockChart data={dataChart} />
        : <LoaderPage />}
    </ContainerLayout>
  );
};

export default React.memo(TradingComponent);
