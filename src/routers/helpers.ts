import {AuthState} from './redux/state';

export const stateConditionString = (state: AuthState) => {
  let navigateTo = '';
  if (state.isSignedIn && state.userToken) {
    navigateTo = 'GOTO_APP_SCREEN';
  }
  if (!state.isSignedIn && !state.userToken) {
    navigateTo = 'GOTO_GUEST_SCREEN';
  }
  return navigateTo;
};

export enum ROUTE_PATH {
  DASHBOARD = '/dashboard',
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOT_PASSWORD = '/forgot-password',
  TRADE = '/trade',
  AFFILIATE_LINK = '/affiliate-link',
  COMISSIONS = '/commissions',
  COPY_TRADE = '/copy-trade',
  WALLET = '/wallet',
}
