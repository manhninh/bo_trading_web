import React from 'react';
import HistoryTableComponent from 'screens/wallet/components/history';
import './styled.css';

const HistoryComponent = () => {
  return <HistoryTableComponent tabActive={'WITHRAW'} />;
};
export default React.memo(HistoryComponent);
