import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import HistoryTableComponent from 'screens/wallet/components/history';
import './styled.css';

const HistoryComponent = () => {
  return <HistoryTableComponent tabActive={'DEPOSIT'} />;
};

export default React.memo(HistoryComponent);
