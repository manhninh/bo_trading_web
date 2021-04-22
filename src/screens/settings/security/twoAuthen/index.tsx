import {yupResolver} from '@hookform/resolvers/yup';
import {useAppSelector} from 'boot/configureStore';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import QRCode from 'qrcode.react';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
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

const schema = yup.object().shape({
  password: yup.string().required('Password cannot be empty!'),
  code: yup.string().when('password', {
    is: (password) => !!password,
    then: yup.string().required('2FA code cannot be empty!'),
    otherwise: yup.string(),
  }),
});

const TwoAuthenComponent = () => {
  const [qrcode, setQrcode] = useState<string>('');

  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const authState = useAppSelector((state) => state.authState);

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
  return (
    <div className="row">
      <div className="col-12">
        <form className="card mb-2">
          <div className="card-header px-0">
            <h3 className="card-title text-danger">Setup 2FA</h3>
          </div>
          <div className="card-body px-0">
            <div className="row">
              <div className="col-lg-4 col-sm-12">
                <h4 className="text-warning">Step 1</h4>
                <span>
                  <strong>Download an Authenticator App</strong> to your Smart phone or table that has a camera. We
                  recommends using one of the fllowing free apps, from either the Google Play Store or the Apple App
                  Store:
                </span>
                <p className="mt-3 text-bold">Google Authenticator</p>
                <img src={`${process.env.PUBLIC_URL}/img/google-authenticator.png`} className="w-60" />
                <p className="mt-3 text-bold">Authy 2-Factor Authentication</p>
                <img src={`${process.env.PUBLIC_URL}/img/authy.png`} className="w-60" />
              </div>
              <div className="col-lg-4 col-sm-12">
                <h4 className="text-warning">Step 2</h4>
                <span>
                  Open your app and <strong>scan the QR code</strong> below
                </span>
                <div className="mt-3">
                  <QRCode value={qrcode} renderAs="svg" includeMargin={true} level="H" size={220} />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <h3 className="text-warning">Step 3</h3>
                <span>
                  <strong>Enter the verification code</strong> from your Authenticator app in the field below:
                </span>
                <form className="mt-3">
                  <div className="form-group">
                    <label className="form-control-label">Enter login password</label>
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
                    <label className="form-control-label">Enter 2FA code from the app</label>
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
                      Complete Setup
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
