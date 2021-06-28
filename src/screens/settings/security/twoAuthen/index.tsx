import {yupResolver} from '@hookform/resolvers/yup';
import {useAppSelector} from 'boot/configureStore';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import QRCode from 'qrcode.react';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {changeStatusTFA} from 'routers/redux/slice';
import * as yup from 'yup';
import {fetchMfaQRCode, verifyOTPToken} from './services';
import './styled.css';
export interface IFormConfirmMFA {
  password: string;
  code: string;
  secret?: string;
}

const TwoAuthenComponent = () => {
  const {t} = useTranslation();
  const [qrcode, setQrcode] = useState<string>('');

  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const authState = useAppSelector((state) => state.authState);

  const schema = yup.object().shape({
    password: yup.string().required(t('common:setting.validPassword')),
    code: yup.string().when('password', {
      is: (password) => !!password,
      then: yup.string().required(t('common:setting.valid2fa')),
      otherwise: yup.string(),
    }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<IFormConfirmMFA>({
    defaultValues: {
      password: '',
      code: '',
      secret: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (!authState.accountInfor.isEnabledTFA) {
      (async () => {
        const data = await fetchMfaQRCode();
        if (data.data) {
          setQrcode(data.data.url);
          setValue('secret', data.data.secret);
        }
      })();
    }
  }, [authState.accountInfor.isEnabledTFA]);

  const onSubmit = async (data: IFormConfirmMFA) => {
    showLoading();
    try {
      const result = await verifyOTPToken(data);
      if (result) {
        dispatch(changeStatusTFA(true));
      }
    } catch (error) {
      addError(error, 'Verify authentication code failed! Please check your information.');
    } finally {
      hideLoading();
    }
  };
  console.log(qrcode, 'qrcode');
  return (
    <div className="row">
      <div className="col-12">
        <form className="card mb-2">
          <div className="card-header px-0">
            <h3 className="card-title text-danger">{t('common:setting.setup2fa')}</h3>
          </div>
          <div className="card-body px-0">
            <div className="row">
              <div className="col-lg-4 col-sm-12">
                <h4 className="text-warning">{t('common:setting.step1')}</h4>
                <span>{t('common:setting.title1')}</span>
                <p className="mt-3 text-bold">Google Authenticator</p>
                <img src={`${process.env.PUBLIC_URL}/img/google-authenticator.png`} className="w-60" />
                <p className="mt-3 text-bold">Authy 2-Factor Authentication</p>
                <img src={`${process.env.PUBLIC_URL}/img/authy.png`} className="w-60" />
              </div>
              <div className="col-lg-4 col-sm-12">
                <h4 className="text-warning">{t('common:setting.step2')}</h4>
                <span>{t('common:setting.title2')}</span>
                <div className="mt-3 text-center">
                  <QRCode value={qrcode} renderAs="svg" includeMargin={true} level="H" size={220} />
                  <input
                    type="text"
                    className="form-control form-control-sm text-center"
                    style={{background: 'transparent', padding: 0}}
                    readOnly={true}
                    disabled={true}
                    {...register('secret')}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <h3 className="text-warning">{t('common:setting.step3')}</h3>
                <span>{t('common:setting.title3')}</span>
                <form className="mt-3">
                  <div className="form-group">
                    <label className="form-control-label">{t('common:setting.enterPassword')}</label>
                    <input
                      type="password"
                      className={`form-control form-control-sm ${errors.password?.message ? 'is-invalid' : ''}`}
                      {...register('password')}
                    />
                    <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                      {errors.password?.message}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">{t('common:setting.enter2fa')}</label>
                    <input
                      type="text"
                      className={`form-control form-control-sm ${errors.code?.message ? 'is-invalid' : ''}`}
                      {...register('code')}
                    />
                    <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                      {errors.code?.message}
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-sm btn-danger" onClick={handleSubmit(onSubmit)}>
                      {t('common:setting.completeSetup')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(TwoAuthenComponent);
