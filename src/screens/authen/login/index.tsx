import { yupResolver } from '@hookform/resolvers/yup';
import { ReactComponent as BackgroundSvg } from 'assets/images/back_login.svg';
import { isLoading } from 'containers/redux/slice';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
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

  const { control, handleSubmit, errors } = useForm<IFormInputs>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    dispatch(isLoading(true));
    try {
      await dispatch(fetchLogin({ username: data.username, password: data.password }));
    } catch (error) {
    } finally {
      dispatch(isLoading(false));
    }
  };

  return (
    <div className="container-fluid px-3">
      <div className="row min-vh-100 bg-gray-dark">
        <div className="col-md-5 col-lg-6 col-xl-4 px-lg-5 d-flex align-items-center">
          <div className="w-100 py-5">
            <div className="text-center">
              <h1 className="display-4 text-gray-light mb-3">Sign in</h1>
            </div>
            <form className="form-validate">
              <div className="form-group">
                <label>Email Address</label>
                <input name="loginUsername" type="email" placeholder="name@address.com" className="form-control" />
              </div>
              <div className="form-group mb-4">
                <div className="row">
                  <div className="col">
                    <label>Password</label>
                  </div>
                  <div className="col-auto"><a href="#" className="form-text small text-muted">Forgot password?</a></div>
                </div>
                <input name="loginPassword" placeholder="Password" type="password" className="form-control" />
              </div>

              <button className="btn btn-lg btn-block btn-primary mb-3">Sign in</button>

              <p className="text-center"><small className="text-muted text-center">Don't have an account yet? <a href="register-2.html">Register</a>.</small></p>
            </form>

          </div>
        </div>
        <div className="col-12 col-md-7 col-lg-6 col-xl-8 d-none d-lg-block">

          <BackgroundSvg height="800" className="bg-cover h-100 mr-n3" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(LogInComponent);
