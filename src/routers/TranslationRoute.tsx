import React from 'react';
import {Translation} from 'react-i18next';
import {Route} from 'react-router-dom';

const TranslationRoute = ({comp: Component, ...rest}: any) => (
  <Route
    {...rest}
    render={(props) => <Translation>{(t, {i18n}) => <Component {...props} t={t} i18n={i18n} />}</Translation>}
  />
);

export default TranslationRoute;
