import { createStackNavigator } from '@react-navigation/stack';
import { GUEST_NAVIGATION } from 'navigations/routes';
import Login from 'screens/authen/login';
import React from 'react';

export type GuestStackParam = {
  LOGIN: {};
};

const Stack = createStackNavigator<GuestStackParam>();

const GuestNavigationComponent = () => {
  return (
    <Stack.Navigator initialRouteName={GUEST_NAVIGATION.LOGIN} screenOptions={{ headerShown: false }}>
      <Stack.Screen name={GUEST_NAVIGATION.LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

export default React.memo(GuestNavigationComponent);
