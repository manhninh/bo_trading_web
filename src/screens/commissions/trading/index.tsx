import React from 'react';
import HistoryTableComponent from 'screens/commissions/components/history';
import {NameRoutes} from '../components/history/propState';

const CommissionTrading = (props) => {
  const renderTable = {
    headers: ['User name', 'F1 - F8', 'Volume (USDF)', 'Commission (USDF)', 'Withdraw'],
    props: ['username', 'level', 'investment_amount', 'commission', 'is_withdraw'],
  };
  return (
    <HistoryTableComponent
      tabActive={NameRoutes.TRADING}
      renderTable={renderTable}
      requestRefesh={props?.requestRefesh}
    />
  );
};

export default React.memo(CommissionTrading);
