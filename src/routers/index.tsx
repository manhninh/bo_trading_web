import { RootState } from 'boot/rootReducers';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import AppNavigationScreen from './AppNavigation';
import GuestNavigationScreen from './GuestNavigation/guestNavigation';
import { stateConditionString } from './helpers';

export type RootStackParamList = {
  GUEST_NAVIGATION: undefined;
  APP_NAVIGATION: undefined;
  LOADING_SCREEN: undefined;
};

const NavigationComponent = () => {
  const {authState} = useSelector((state: RootState) => ({
    authState: state.authState,
  }));

  const guestNavigation = () => [];

  const appNavigation = () => [];

  const chooseScreen = useMemo(() => {
    let arr = [];
    let navigateTo = stateConditionString(authState);
    switch (navigateTo) {
      case 'GOTO_GUEST_SCREEN':
        arr.push(<RootStack.Screen name={ROUTES.GUEST_NAVIGATION} component={GuestNavigationScreen} />);
        break;
      case 'GOTO_APP_SCREEN':
        arr.push(<RootStack.Screen name={ROUTES.APP_NAVIGATION} component={AppNavigationScreen} />);
        break;
      default:
        arr.push(<RootStack.Screen name={ROUTES.GUEST_NAVIGATION} component={GuestNavigationScreen} />);
        break;
    }
    return arr[0];
  }, [authState]);

  return chooseScreen;
  );
};

export default React.memo(NavigationComponent);
