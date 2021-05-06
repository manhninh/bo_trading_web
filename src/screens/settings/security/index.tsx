import {useAppSelector} from 'boot/configureStore';
import React from 'react';
import ChangePasswordComponent from './changePassword';
import EnableTFAComponent from './enableTFA';
import './styled.css';
import TwoAuthenComponent from './twoAuthen';

const SecurityComponent = () => {
  const enabledTFA = useAppSelector((state) => state.authState.accountInfor.isEnabledTFA);

  return (
    <div className="row">
      <div className="col-lg-3 col-sm-12">
        <ChangePasswordComponent />
      </div>
      <div className="col-lg-9 col-sm-12">{enabledTFA ? <EnableTFAComponent /> : <TwoAuthenComponent />}</div>
    </div>
  );
};

export default React.memo(SecurityComponent);
