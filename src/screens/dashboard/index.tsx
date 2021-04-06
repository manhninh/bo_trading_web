import HeaderLayout from 'containers/components/layout/Header';
import React from 'react';
import "./styled.css";

const DashboardComponent = () => {

  return (
    <>
      <div className="background-img" />
      <HeaderLayout noBackground={true} />
    </>
  );
};

export default React.memo(DashboardComponent);
