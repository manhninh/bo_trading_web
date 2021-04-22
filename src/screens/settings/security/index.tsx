import {useAppSelector} from 'boot/configureStore';
import React, {useEffect, useState} from 'react';
import ChangePasswordComponent from './changePassword';
import EnableTFAComponent from './enableTFA';
import './styled.css';
import TwoAuthenComponent from './twoAuthen';

const SecurityComponent = () => {
  const [enabledTFA, setEnabledTFA] = useState<boolean>(false);
  const authState = useAppSelector((state) => state.authState);
  useEffect(() => {
    setEnabledTFA(authState.accountInfor.isEnabledTFA);
  }, [authState.accountInfor.isEnabledTFA]);

  console.log('SecurityComponent');
  return (
    <div className="row mt-3">
      <div className="col-lg-3 col-sm-12">
        <ChangePasswordComponent />
      </div>
      <div className="col-lg-9 col-sm-12">{enabledTFA ? <EnableTFAComponent /> : <TwoAuthenComponent />}</div>
    </div>
  );
};

export default React.memo(SecurityComponent);
