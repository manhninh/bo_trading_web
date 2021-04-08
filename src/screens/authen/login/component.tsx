import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ROUTE_PATH } from 'routers/helpers';
import { fetchLogin } from 'routers/redux/thunks';
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

  useEffect(() => { }, []);

  const { control, handleSubmit } = useForm<IFormInputs>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      await dispatch(fetchLogin({ username: data.username, password: data.password }));
    } catch (error) {
    } finally {
    }
  };

  return <>
    <form className="form-validate">
      <div className="form-group">
        <label>Email or Username</label>
        <input id="login-username" type="text" name="loginUsername" className="form-control" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input id="login-password" type="password" name="loginPassword" className="form-control" />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
    <br />
    <a href="#" className="forgot-pass">Forgot Password?</a>
    <br />
    <br />
    <small>Do not have an account? </small>
    <a href={ROUTE_PATH.REGISTER} className="signup">Register</a>
  </>;
};

export default React.memo(LogInComponent);
