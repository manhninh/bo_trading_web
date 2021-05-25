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
  TRADE = '/trade',
  LOGIN = '/login',
  REGISTER = '/register',
  REGISTER_PARAM = '/register(?sponsor=:referralUser)',
  FORGOT_PASSWORD = '/forgot-password',
  VERIFY_EMAIL = '/verification/email/:uuid',
  TRADE_HISTORY = '/trade-hitory',
  SETTINGS = '/settings',
  AFFILIATE_LINK = '/affiliate-link',
  COMISSIONS = '/commissions',
  COPY_TRADE = '/copy-trade',
  WALLET = '/wallet',
  WELLCOME = '/wellcome',
  TERM_OF_USE = '/term_of_use',
  PRIVATE_POLICY = '/private_policy',
}
