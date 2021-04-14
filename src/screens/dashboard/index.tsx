import { useAppSelector } from 'boot/configureStore';
import HeaderLayout from 'containers/components/layout/Header';
import { LoadingProvider } from 'containers/hooks/loadingProvider';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { ROUTE_PATH } from 'routers/helpers';
import './styled.css';

const DashboardComponent = () => {
  const history = useHistory();
  const authState = useAppSelector((state) => state.authState);

  useEffect(() => {
    if (authState.userToken) history.push(ROUTE_PATH.TRADE);
  }, [authState.userToken]);

  return (
    <LoadingProvider>
      <div className="background-img" />
      <HeaderLayout noBackground={true} />
    </LoadingProvider>
  );
};

export default React.memo(DashboardComponent);
