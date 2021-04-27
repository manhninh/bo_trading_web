import React from 'react';
import HistoryTableComponent from 'screens/commissions/components/history';
import {NameRoutes} from '../components/history/propState';

const CommissionHistoryWithdraw = (props) => {
  const renderTable = {
    headers: ['Withdrawal (USDF)', 'From'],
    props: ['amount', 'type_commission'],
  };
  return (
    <HistoryTableComponent
      tabActive={NameRoutes.HISTORY_WITHDRAW}
      renderTable={renderTable}
      requestRefesh={props?.requestRefesh}
    />
  );
};

export default React.memo(CommissionHistoryWithdraw);
