import {yupResolver} from '@hookform/resolvers/yup';
import ButtonComponent from 'containers/components/ButtonComponent';
import {InputComponent} from 'containers/components/InputComponent';
import {isLoading} from 'containers/redux/slice';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert, Image, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import {fetchLogin} from 'routers/redux/thunks';
import {s} from 'styles/scalingUtils';
import * as yup from 'yup';
import styles from './styles';

interface IFormInputs {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required('Tài khoản không được để trống!'),
  password: yup.string().required('Mật khẩu không được để trống!'),
});

const LogInComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const {control, handleSubmit, errors} = useForm<IFormInputs>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    dispatch(isLoading(true));
    try {
      await dispatch(fetchLogin({username: data.username, password: data.password}));
    } catch (error) {
      Alert.alert('Lỗi', error.message);
    } finally {
      dispatch(isLoading(false));
    }
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <View style={{paddingHorizontal: s(20)}}>
        <Image source={require('assets/images/LogoAsiaSoft.png')} style={styles.imgLogo} />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <InputComponent
              leftIcon="user"
              autoCapitalize="none"
              placeholder="Tên đăng nhập"
              maxLength={100}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.username?.message}
            />
          )}
          name="username"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <InputComponent
              leftIcon="lock"
              placeholder="Mật khẩu"
              secureTextEntry={true}
              maxLength={100}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
            />
          )}
          name="password"
        />
        <ButtonComponent onPress={handleSubmit(onSubmit)} text="Đăng nhập" />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default React.memo(LogInComponent);
