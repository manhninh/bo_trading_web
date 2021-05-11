import {yupResolver} from '@hookform/resolvers/yup';
import {useAppSelector} from 'boot/configureStore';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {ROUTE_PATH} from 'routers/helpers';
import {signOut} from 'routers/redux/slice';
import * as yup from 'yup';
import {changePassword} from './services';
import './styled.css';
interface IFormChangePW {
  currentPW: string;
  newPW: string;
  newPWConfirm: string;
  tfa?: string;
}

const ChangePasswordComponent = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const history = useHistory();
  const enabledTFA = useAppSelector((state) => state.authState.accountInfor.isEnabledTFA);

  const schema = yup.object().shape(
    {
      currentPW: yup
        .string()
        .when(['newPW', 'newPWConfirm'], {
          is: (newPW: string, newPWConfirm: string) => !!newPW || !!newPWConfirm,
          then: yup.string().required(t('common:setting.validNewPass')),
          otherwise: yup.string(),
        })
        .required('Current Password cannot be empty!'),
      newPW: yup.string().when(['currentPW', 'newPWConfirm'], {
        is: (currentPW: string, newPWConfirm: string) => !!newPWConfirm || !!currentPW,
        then: yup
          .string()
          .required(t('common:setting.validConfirmNewPass'))
          .min(6, t('common:setting.validConfirmMin'))
          .max(20, t('common:setting.validConfirmMax')),
        otherwise: yup.string(),
      }),
      newPWConfirm: yup.string().when(['newPW', 'currentPW'], {
        is: (newPW: string, currentPW: string) => !!newPW,
        then: yup
          .string()
          .oneOf([yup.ref('newPW')], t('common:setting.validNewConfirm'))
          .required(t('common:setting.validNewConfirmRequired')),
        otherwise: yup.string(),
      }),
      tfa: yup.string().when('currentPW', {
        is: (_) => !!enabledTFA,
        then: yup.string().required(t('common:setting.valid2faPass')),
        otherwise: yup.string(),
      }),
    },
    [
      ['newPW', 'newPWConfirm'],
      ['currentPW', 'newPWConfirm'],
      ['newPW', 'currentPW'],
    ],
  );

  const {register, handleSubmit, formState} = useForm<IFormChangePW>({
    defaultValues: {
      currentPW: '',
      newPW: '',
      newPWConfirm: '',
      tfa: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormChangePW) => {
    showLoading();
    try {
      showLoading();
      const res = await changePassword({current_password: data.currentPW, new_password: data.newPW, tfa: data.tfa});
      if (res) {
        dispatch(signOut());
        history.push(ROUTE_PATH.LOGIN);
      }
    } catch (error) {
      addError(error, 'Account registration failed! Please check your information.');
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <form className="card mb-2">
          <div className="card-header px-0">
            <h3 className="card-title text-danger">{t('common:setting.changePassword')}</h3>
          </div>
          <div className="card-body px-0">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label">{t('common:setting.currentPassword')}</label>
                  <input
                    type="password"
                    className={`form-control form-control-sm ${
                      formState.errors.currentPW?.message ? 'is-invalid' : ''
                    }`}
                    {...register('currentPW')}
                  />
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {formState.errors.currentPW?.message}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label">{t('common:setting.newPassword')}</label>
                  <input
                    type="password"
                    className={`form-control form-control-sm ${formState.errors.newPW?.message ? 'is-invalid' : ''}`}
                    {...register('newPW')}
                  />
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {formState.errors.newPW?.message}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label">{t('common:setting.confirmNewPassword')}</label>
                  <input
                    type="password"
                    className={`form-control form-control-sm ${
                      formState.errors.newPWConfirm?.message ? 'is-invalid' : ''
                    }`}
                    {...register('newPWConfirm')}
                  />
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {formState.errors.newPWConfirm?.message}
                  </div>
                </div>
              </div>
              {enabledTFA && (
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label">{t('common:setting.2fa')}</label>
                    <input
                      maxLength={6}
                      type="text"
                      className={`form-control form-control-sm ${formState.errors.tfa?.message ? 'is-invalid' : ''}`}
                      {...register('tfa')}
                    />
                    <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                      {formState.errors.tfa?.message}
                    </div>
                  </div>
                </div>
              )}
              <div className="col-12">
                <div className="form-group">
                  <button type="submit" className="btn btn-sm btn-danger" onClick={handleSubmit(onSubmit)}>
                    {t('common:setting.changePassword')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(ChangePasswordComponent);
