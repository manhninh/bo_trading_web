import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { useAppSelector } from 'boot/configureStore';
import { ASYNC_STORE } from 'contants/asyncStorage';
import { RESPONSE_STATUS } from 'contants/config';
import { APP_NAVIGATION } from 'navigations/routes';
import DetailOrderScreen from 'screens/detailOrder';
import HomeScreen from 'screens/home';
import SearchScreen from 'screens/search';
import { Colors } from 'styles/colors';
import { s } from 'styles/scalingUtils';
import React, { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useDispatch } from 'react-redux';
import { restoreToken, signOut } from '../redux/slice';
import { AccountInfor } from '../redux/state';
import { fetchUserInfor } from '../services';

export type AppStackParam = {
  HOME: undefined;
  SEARCH: undefined;
  DETAIL_ORDER: {
    stt_rec: string;
    stt_rec0: string;
    banks: [];
    status: [];
    refreshList: () => void;
  };
};

const Stack = createStackNavigator<AppStackParam>();

const GuestNavigationComponent = () => {
  const authState = useAppSelector((state) => state.authState);
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    if (authState.userToken)
      AsyncStorage.setItem(ASYNC_STORE.TOKEN, authState.userToken || '')
        .then(() => checkAuthenToken())
        .catch(() => dispatch(signOut()));
    else dispatch(signOut());

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') checkAuthenToken();
    appState.current = nextAppState;
  };

  const checkAuthenToken = async () => {
    try {
      const res = await fetchUserInfor(authState.accountInfor.username);
      if (res.status.code === RESPONSE_STATUS.SUCESS && res.data && res.data.length > 0) {
        const accountInfor: AccountInfor = {...res.data[0], username: authState.accountInfor.username};
        dispatch(restoreToken(accountInfor));
      } else dispatch(signOut());
    } catch (error) {
      dispatch(signOut());
    }
  };

  const configHeader: StackHeaderOptions = {
    headerStyle: {backgroundColor: Colors.primaryColor},
    headerTitleStyle: {color: Colors.white},
    headerBackTitle: 'Quay lại',
    headerBackTitleStyle: {fontSize: s(14)},
    headerTintColor: Colors.white,
  };

  return (
    <Stack.Navigator initialRouteName={APP_NAVIGATION.HOME}>
      <Stack.Screen
        name={APP_NAVIGATION.HOME}
        component={HomeScreen}
        options={{...configHeader, title: 'Danh sách đơn hàng'}}
      />
      <Stack.Screen
        name={APP_NAVIGATION.SEARCH}
        component={SearchScreen}
        options={{...configHeader, title: 'Tìm kiếm đơn hàng'}}
      />
      <Stack.Screen
        name={APP_NAVIGATION.DETAIL_ORDER}
        component={DetailOrderScreen}
        options={{...configHeader, title: 'Chi tiết đơn hàng'}}
      />
    </Stack.Navigator>
  );
};

export default React.memo(GuestNavigationComponent);
