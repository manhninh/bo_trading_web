import { yupResolver } from '@hookform/resolvers/yup';
import useError from 'containers/hooks/errorProvider/useError';
import { useLoading } from 'containers/hooks/loadingProvider/userLoading';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ROUTE_PATH } from 'routers/helpers';
import { fetchLogin } from 'routers/redux/thunks';
import * as yup from 'yup';

interface IFormInputs {
  username: string;
  password: string;
  isTfa: boolean;
  tfa: string;
}

const LogInComponent = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoading();
  const { addError } = useError();
  const [showTFA, setShowTFA] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required(t('common:authen.validUsername')),
    password: yup.string().required(t('common:authen.validPassword')),
    tfa: yup.string().when('isEmail', {
      is: true,
      then: yup.string().required(t('common:authen.valid2fa')),
      otherwise: yup.string(),
    }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      username: '',
      password: '',
      isTfa: false,
      tfa: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    showLoading();
    try {
      await dispatch(fetchLogin({ username: data.username, password: data.password, tfa: data.tfa }));
      history.push(ROUTE_PATH.TRADE);
    } catch (err) {
      const error = await err.json();
      if (error.error_description === 'NOT_FOUND_TFA') {
        setValue('isTfa', true);
        setShowTFA(true);
      } else addError(null, error.error_description || 'Login fail');
    } finally {
      hideLoading();
    }
  };

  return (
    <form className="form-validate">
      <div className="form-group">
        <label>{t('common:authen.usernameOrEmail')}</label>
        <input
          type="text"
          className={`form-control ${errors.username?.message ? 'is-invalid' : ''}`}
          {...register('username')}
        />
        <div className="is-invalid invalid-feedback">{errors.username?.message}</div>
      </div>
      <div className="form-group">
        <div className="d-flex justify-content-between">
          <label className="d-inline-block">{t('common:authen.password')}</label>
          <a href={ROUTE_PATH.FORGOT_PASSWORD} className="small text-danger d-inline-block">
            {t('common:authen.forgotPassword')}
          </a>
        </div>
        <input
          type="password"
          className={`form-control ${errors.password?.message ? 'is-invalid' : ''}`}
          {...register('password')}
        />
        <div className="is-invalid invalid-feedback">{errors.password?.message}</div>
      </div>
      {showTFA ? (
        <div className="form-group">
          <label>{t('common:authen.2fa')}</label>
          <input
            type="text"
            className={`form-control ${errors.tfa?.message ? 'is-invalid' : ''}`}
            maxLength={6}
            {...register('tfa')}
          />
          <div className="is-invalid invalid-feedback">{errors.tfa?.message}</div>
        </div>
      ) : null}
      <button className="btn btn-block btn-danger mb-3" onClick={handleSubmit(onSubmit)}>
        {t('common:authen.login')}
      </button>
      <p className="text-center">
        <p className="text-muted text-center">
          {t('common:authen.donotAccount')} <a href={ROUTE_PATH.REGISTER}>{t('common:authen.register')}</a>.
        </p>
      </p>
    </form>
  );
};

export default React.memo(LogInComponent);
