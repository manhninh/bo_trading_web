import {yupResolver} from '@hookform/resolvers/yup';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React from 'react';
import {useForm} from 'react-hook-form';
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
}

const schema = yup.object().shape(
  {
    currentPW: yup
      .string()
      .when(['newPW', 'newPWConfirm'], {
        is: (newPW: string, newPWConfirm: string) => !!newPW || !!newPWConfirm,
        then: yup.string().required('Current password cannot be empty!'),
        otherwise: yup.string(),
      })
      .required('Current Password cannot be empty!'),
    newPW: yup.string().when(['currentPW', 'newPWConfirm'], {
      is: (currentPW: string, newPWConfirm: string) => !!newPWConfirm || !!currentPW,
      then: yup
        .string()
        .required('New Password cannot be empty!')
        .min(6, 'New Password must be at least 6 characters!')
        .max(20, 'New Password must be at most 20 characters!'),
      otherwise: yup.string(),
    }),
    newPWConfirm: yup.string().when(['newPW', 'currentPW'], {
      is: (newPW: string, currentPW: string) => !!newPW,
      then: yup
        .string()
        .oneOf([yup.ref('newPW')], 'Password is not match')
        .required('Confirm password cannot be empty!'),
      otherwise: yup.string(),
    }),
  },
  [
    ['newPW', 'newPWConfirm'],
    ['currentPW', 'newPWConfirm'],
    ['newPW', 'currentPW'],
  ],
);

const ChangePasswordComponent = () => {
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const history = useHistory();

  const {register, handleSubmit, formState} = useForm<IFormChangePW>({
    defaultValues: {
      currentPW: '',
      newPW: '',
      newPWConfirm: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormChangePW) => {
    try {
      showLoading();
      const res = await changePassword({current_password: data.currentPW, new_password: data.newPW});
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
    <div className="row mt-3">
      <div className="col-12">
        <form className="card mb-2">
          <div className="card-header">
            <h3 className="card-title text-danger">Change password</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    className={formState.errors.currentPW?.message ? 'form-control is-invalid' : 'form-control'}
                    {...register('currentPW')}
                  />
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {formState.errors.currentPW?.message}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className={formState.errors.newPW?.message ? 'form-control is-invalid' : 'form-control'}
                    {...register('newPW')}
                  />
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {formState.errors.newPW?.message}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className={formState.errors.newPWConfirm?.message ? 'form-control is-invalid' : 'form-control'}
                    {...register('newPWConfirm')}
                  />
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {formState.errors.newPWConfirm?.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-right">
            <button type="submit" className="btn btn-danger" onClick={handleSubmit(onSubmit)}>
              Change password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(ChangePasswordComponent);
