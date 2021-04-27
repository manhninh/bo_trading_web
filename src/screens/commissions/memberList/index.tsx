import React from 'react';
import HistoryTableComponent from 'screens/commissions/components/history';
import {NameRoutes} from '../components/history/propState';

const CommissionMemberList = (props) => {
  const renderTable = {
    headers: ['User Name', 'F1 - F8', 'Sponsor', 'Agency'],
    props: ['username', 'level', 'sponsor', 'agency'],
  };
  return (
    <HistoryTableComponent
      tabActive={NameRoutes.MEMBER_LIST}
      renderTable={renderTable}
      requestRefesh={props?.requestRefesh}
    />
  );
};

export default React.memo(CommissionMemberList);
