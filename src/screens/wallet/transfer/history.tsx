import React from 'react';
import HistoryTableComponent from 'screens/wallet/components/history';
import './styled.css';

const HistoryComponent = () => {
  return <HistoryTableComponent tabActive={'TRANSFER'} />;
};

export default React.memo(HistoryComponent);
