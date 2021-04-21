import React, {lazy} from 'react';
import {Route, Switch} from 'react-router';
import {ROUTE_PATH} from './helpers';
import PrivateRoute from './PrivateRoutes';
import './styled.css';
import TranslationRoute from './TranslationRoute';

const ForgotPassword = lazy(() => import('screens/authen/forgotPassword'));
const Wellcome = lazy(() => import('screens/authen/wellcome'));
const VerifyEmail = lazy(() => import('screens/authen/verifyEmail'));
const Trading = lazy(() => import('screens/trade'));
const TradeHistory = lazy(() => import('screens/tradeHistory'));
const AffiliateLink = lazy(() => import('screens/affiliateLink'));
const Commissions = lazy(() => import('screens/commissions'));
const CopyTrade = lazy(() => import('screens/copyTrade'));
const Wallet = lazy(() => import('screens/wallet'));
const NotFound = lazy(() => import('containers/components/exceptions/404'));
const Settings = lazy(() => import('screens/settings'));

const NavigationComponent = () => {
  return (
    <Switch>
      <TranslationRoute exact={true} path="/" component={Trading} />
      <TranslationRoute path={ROUTE_PATH.LOGIN} comp={Trading} />
      <TranslationRoute path={ROUTE_PATH.REGISTER_PARAM} comp={Trading} />
      <TranslationRoute path={ROUTE_PATH.FORGOT_PASSWORD} comp={ForgotPassword} />
      <TranslationRoute path={ROUTE_PATH.WELLCOME} comp={Wellcome} />
      <TranslationRoute path={ROUTE_PATH.VERIFY_EMAIL} comp={VerifyEmail} />
      <PrivateRoute path={ROUTE_PATH.TRADE} comp={Trading} />
      <PrivateRoute path={ROUTE_PATH.TRADE_HISTORY} comp={TradeHistory} />
      <PrivateRoute path={ROUTE_PATH.AFFILIATE_LINK} comp={AffiliateLink} />
      <PrivateRoute path={ROUTE_PATH.COMISSIONS} comp={Commissions} />
      <PrivateRoute path={ROUTE_PATH.COPY_TRADE} comp={CopyTrade} />
      <PrivateRoute path={ROUTE_PATH.WALLET} comp={Wallet} />
      <PrivateRoute path={ROUTE_PATH.SETTINGS} comp={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default React.memo(NavigationComponent);
