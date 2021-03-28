import {yupResolver} from '@hookform/resolvers/yup';
import {isLoading} from 'containers/redux/slice';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {fetchLogin} from 'routers/redux/thunks';
import * as yup from 'yup';

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

  useEffect(() => {}, []);

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
    } finally {
      dispatch(isLoading(false));
    }
  };

  return <div>login</div>;
};

export default React.memo(LogInComponent);
