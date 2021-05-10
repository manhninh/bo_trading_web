import React from 'react';
import {useTranslation} from 'react-i18next';
import HistoryTableComponent from 'screens/commissions/components/history';
import {NameRoutes} from '../components/history/propState';

const CommissionMemberList = (props) => {
  const {t} = useTranslation();

  const renderTable = {
    headers: [
      t('common:commission.username'),
      'F1 - F8',
      t('common:commission.sponsor'),
      t('common:commission.agency'),
    ],
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
