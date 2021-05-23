import React from 'react';
import {useTranslation} from 'react-i18next';
import HistoryTableComponent from 'screens/commissions/components/history';
import {NameRoutes} from '../components/history/propState';

const CommissionTrading = (props) => {
  const {t} = useTranslation();

  const renderTable = {
    headers: [
      t('common:commission.username'),
      'Level',
      t('common:commission.volume'),
      t('common:commission.commission'),
      t('common:commission.withdraw'),
    ],
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
