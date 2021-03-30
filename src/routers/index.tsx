import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { ROUTE_PATH } from './helpers';
import PrivateRoute from './PrivateRoutes';
import TranslationRoute from './TranslationRoute';

const Register = lazy(() => import('screens/authen/register'));
const Login = lazy(() => import('screens/authen/login'));
const ForgotPassword = lazy(() => import('screens/authen/forgotPassword'));
const VerifyEmail = lazy(() => import('screens/authen/verifyEmail'));
const Trading = lazy(() => import('screens/trade'));
const AffiliateLink = lazy(() => import('screens/affiliateLink'));
const Commissions = lazy(() => import('screens/commissions'));
const CopyTrade = lazy(() => import('screens/copyTrade'));
const Wallet = lazy(() => import('screens/wallet'));
const Dashboard = lazy(() => import('screens/dashboard'));
const NotFound = lazy(() => import('containers/components/exceptions/404'));

const NavigationComponent = () => {
  return (
    <Switch>
      <Redirect from={ROUTE_PATH.DASHBOARD} to="/" />
      <TranslationRoute exact={true} path="/" component={Dashboard} />
      <TranslationRoute path={ROUTE_PATH.LOGIN} comp={Login} />
      <TranslationRoute path={ROUTE_PATH.REGISTER} comp={Register} />
      <TranslationRoute path={ROUTE_PATH.FORGOT_PASSWORD} comp={ForgotPassword} />
      <TranslationRoute path={ROUTE_PATH.VERIFY_EMAIL} comp={VerifyEmail} />
      <PrivateRoute path={ROUTE_PATH.TRADE} comp={Trading} />
      <PrivateRoute path={ROUTE_PATH.AFFILIATE_LINK} comp={AffiliateLink} />
      <PrivateRoute path={ROUTE_PATH.COMISSIONS} comp={Commissions} />
      <PrivateRoute path={ROUTE_PATH.COPY_TRADE} comp={CopyTrade} />
      <PrivateRoute path={ROUTE_PATH.WALLET} comp={Wallet} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default React.memo(NavigationComponent);
