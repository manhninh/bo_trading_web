import {yupResolver} from '@hookform/resolvers/yup';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import {User} from 'models/users';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation} from 'react-router';
import {toast} from 'react-toastify';
import {ROUTE_PATH} from 'routers/helpers';
import * as yup from 'yup';
import {fetchRegister} from './services';

interface IFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterComponent = () => {
  const {t} = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const params = new URLSearchParams(location.search);
  const sponsor = params.get('sponsor');

  const schema = yup.object().shape({
    username: yup.string().required(t('common:authen.requiredUsername')),
    email: yup.string().email(t('common:authen.formatEmail')).required(t('common:authen.validEmail')),
    password: yup
      .string()
      .min(6, t('common:authen.validPasswordMin'))
      .max(20, t('common:authen.validPasswordMax'))
      .required(t('common:authen.validPasswordRequired')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('common:authen.validConfirmPassMatch'))
      .required(t('common:authen.validConfirmPassRequired')),
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInputs>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    showLoading();
    try {
      const user: User = {
        email: data.email,
        username: data.username,
        password: data.password,
        referralUser: sponsor,
      };
      const res = await fetchRegister(user);
      if (res.data) history.push(ROUTE_PATH.WELLCOME);
      else toast.error('Register account failed! Please check your information.');
    } catch (error) {
      addError(error, 'Register account failed! Please check your information.');
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <form className="form-validate">
        <div className="form-group">
          <label>{t('common:authen.sponsor')}</label>{' '}
          <label className="text-primary text-bold">{sponsor || 'none'}</label>
        </div>
        <div className="form-group">
          <label>
            {t('common:authen.username')} <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.username?.message ? 'is-invalid' : ''}`}
            {...register('username')}
          />
          <div className="is-invalid invalid-feedback">{errors.username?.message}</div>
        </div>
        <div className="form-group">
          <label>
            {t('common:authen.email')} <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.email?.message ? 'is-invalid' : ''}`}
            {...register('email')}
          />
          <div className="is-invalid invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="form-group">
          <label>
            {t('common:authen.password')} <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            className={`form-control ${errors.password?.message ? 'is-invalid' : ''}`}
            {...register('password')}
          />
          <div className="is-invalid invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="form-group">
          <label>
            {t('common:authen.confirmPassword')} <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword?.message ? 'is-invalid' : ''}`}
            {...register('confirmPassword')}
          />
          <div className="is-invalid invalid-feedback">{errors.confirmPassword?.message}</div>
        </div>
        <div className="form-group terms-conditions text-center">
          <input
            id="register-agree"
            name="registerAgree"
            type="checkbox"
            className="checkbox-template"
            defaultChecked={true}
          />
          <label htmlFor="register-agree">{t('common:authen.term')}</label>
        </div>
        <button className="btn btn-lg btn-block btn-danger mb-3" onClick={handleSubmit(onSubmit)}>
          {t('common:authen.createAccount')}
        </button>
      </form>
    </>
  );
};

export default React.memo(RegisterComponent);
