import { ReactComponent as BackgroundSvg } from 'assets/images/back_login.svg';
import HeaderLayout from 'containers/components/layout/Header';
import React from 'react';
import "./styled.css";

const DashboardComponent = () => {

  return (
    <>
      <div className="background-img">
        <BackgroundSvg />
      </div>
      <HeaderLayout noBackground={true} />
    </>
  );
};

export default React.memo(DashboardComponent);
