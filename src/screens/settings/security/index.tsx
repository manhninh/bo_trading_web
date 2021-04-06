import React from 'react';
import ChangePasswordComponent from "./changePassword";
import './styled.css';
import TwoAuthenComponent from "./twoAuthen";

const SecurityComponent = () => {
  return <div className="row mt-3">
    <div className="col-lg-3 col-sm-12">
      <ChangePasswordComponent />
    </div>
    <div className="col-lg-9 col-sm-12">
      <TwoAuthenComponent />
    </div>
  </div>;
};

export default React.memo(SecurityComponent);
