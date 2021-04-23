import {yupResolver} from '@hookform/resolvers/yup';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ROUTE_PATH} from 'routers/helpers';
import {fetchLogin} from 'routers/redux/thunks';
import * as yup from 'yup';

interface IFormInputs {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required('Username or Email cannot be empty!'),
  password: yup.string().required('Password cannot be empty!'),
});

const LogInComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInputs>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    showLoading();
    try {
      await dispatch(fetchLogin({username: data.username, password: data.password}));
      history.push(ROUTE_PATH.TRADE);
    } catch (error) {
      addError(error, 'Account registration failed! Please check your information.');
    } finally {
      hideLoading();
    }
  };

  return (
    <form className="form-validate">
      <div className="form-group">
        <label>Username or Email</label>
        <input
          type="text"
          className={errors.username?.message ? 'form-control is-invalid' : 'form-control'}
          {...register('username')}
        />
        <div className="is-invalid invalid-feedback">{errors.username?.message}</div>
      </div>
      <div className="form-group mb-4">
        <label>Password</label>
        <input
          type="password"
          className={errors.password?.message ? 'form-control is-invalid' : 'form-control'}
          {...register('password')}
        />
        <div className="is-invalid invalid-feedback">{errors.password?.message}</div>
      </div>
      <a href={ROUTE_PATH.FORGOT_PASSWORD} className="form-text small text-danger mb-4">
        Forgot password?
      </a>
      <button className="btn btn-lg btn-block btn-danger mb-3" onClick={handleSubmit(onSubmit)}>
        Login
      </button>
      <p className="text-center">
        <small className="text-muted text-center">
          Don't have an account yet? <a href={ROUTE_PATH.REGISTER}>Register</a>.
        </small>
      </p>
    </form>
  );
};

export default React.memo(LogInComponent);
