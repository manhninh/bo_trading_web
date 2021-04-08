import HeaderLayout from 'containers/components/layout/Header';
import { LoadingProvider } from 'containers/hooks/loadingProvider';
import React from 'react';
import "./styled.css";

const DashboardComponent = () => {
  return (
    <LoadingProvider>
      <div className="background-img" />
      <HeaderLayout noBackground={true} />
    </LoadingProvider>
  );
};

export default React.memo(DashboardComponent);
