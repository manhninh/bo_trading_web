import { AuthState } from "./redux/state";

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