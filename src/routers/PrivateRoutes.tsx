import { useAppSelector } from 'boot/configureStore';
import LoaderPage from 'containers/components/loader';
import React, { useEffect, useState } from 'react';
import { Translation } from 'react-i18next';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ comp: Component, ...rest }: any) => {
  const [accepted, setAccepted] = useState(true);
  const authState = useAppSelector((state) => state.authState);

  useEffect(() => {
    if (authState.userToken) setAccepted(true);
  }, [authState]);

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
