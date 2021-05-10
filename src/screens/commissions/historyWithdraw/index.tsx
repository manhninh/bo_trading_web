import React from 'react';
import {useTranslation} from 'react-i18next';
import HistoryTableComponent from 'screens/commissions/components/history';
import {NameRoutes} from '../components/history/propState';

const CommissionHistoryWithdraw = (props) => {
  const {t} = useTranslation();

  const renderTable = {
    headers: [t('common:commission.withdraw2'), t('common:commission.from')],
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
