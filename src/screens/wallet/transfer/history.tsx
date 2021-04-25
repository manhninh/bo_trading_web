import React from 'react';
import HistoryTableComponent from 'screens/wallet/components/history';
import './styled.css';

const HistoryComponent = (props) => {
  return <HistoryTableComponent tabActive={'TRANSFER'} requestRefesh={props?.requestRefesh} />;
};

export default React.memo(HistoryComponent);
