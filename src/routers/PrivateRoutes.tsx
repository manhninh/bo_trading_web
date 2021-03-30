import { useAppSelector } from 'boot/configureStore';
import { RESPONSE_STATUS } from 'constants/system';
import LoaderPage from 'containers/components/loader';
import React, { useEffect, useState } from 'react';
import { Translation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { ROUTE_PATH } from './helpers';
import { restoreToken, signOut } from './redux/slice';
import { AccountInfor } from './redux/state';
import { fetchUserInfor } from './services';

const PrivateRoute = ({ comp: Component, ...rest }: any) => {
  const [accepted, setAccepted] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const authState = useAppSelector((state) => state.authState);

  useEffect(() => {
    if (authState.userToken) {
      checkAuthenToken();
    } else {
      history.push(ROUTE_PATH.LOGIN);
    }
  }, []);

  const checkAuthenToken = async () => {
    try {
      const res = await fetchUserInfor(authState.accountInfor.username);
      if (res.status.code === RESPONSE_STATUS.SUCESS && res.data && res.data.length > 0) {
        const accountInfor: AccountInfor = { ...res.data[0], username: authState.accountInfor.username };
        await dispatch(restoreToken(accountInfor));
        setAccepted(true);
      } else {
        dispatch(signOut());
        history.push(ROUTE_PATH.LOGIN);
      }
    } catch (error) {
      dispatch(signOut());
      history.push(ROUTE_PATH.LOGIN);
    }
  };

  return accepted ? (
    <Route
      {...rest}
      render={(props) => <Translation>{(t, { i18n }) => <Component {...props} t={t} i18n={i18n} />}</Translation>}
    />
  ) : (
    <LoaderPage />
  );
};
export default PrivateRoute;
